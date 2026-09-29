/**
 * Clean Rows lead webhook (Google Apps Script web app).
 *
 * Receives the website request form as application/x-www-form-urlencoded,
 * appends a row to the "Leads" sheet, emails a notification and returns
 * JSON: {"status":"success"} or {"status":"error","message":"..."}.
 *
 * Deploy: Deploy → Manage deployments → edit the existing web app →
 * Version: New version → Deploy. Keep "Execute as: Me" and
 * "Who has access: Anyone". Editing the existing deployment keeps the
 * same /exec URL that the website already uses.
 */

var SHEET_NAME = "Leads";
var NOTIFY_EMAIL = "dalsaniam3@gmail.com";

// Column order in the sheet. New fields can be appended at the end.
var FIELDS = [
  ["timestamp", "Timestamp"],
  ["name", "Name"],
  ["email", "Email"],
  ["company", "Company"],
  ["type", "Team"],
  ["icp", "ICP"],
  ["volume", "Volume"],
  ["timeline", "Timeline"],
  ["notes", "Notes"],
  ["cta", "Button clicked"],
  ["landing_page", "Landing page"],
  ["referrer", "Referrer"],
  ["utm_source", "UTM source"],
  ["utm_medium", "UTM medium"],
  ["utm_campaign", "UTM campaign"],
  ["utm_term", "UTM term"],
  ["utm_content", "UTM content"],
  ["click_id", "Click ID"],
  ["first_touch", "First touch"],
  ["request_id", "Request ID"],
];

// Maximum lengths for fields the visitor types (same as the form's maxlength).
var LIMITS = { name: 200, email: 200, company: 200, icp: 5000, notes: 5000 };

// True when a row with this request id already exists. The script cache answers
// quickly; the Request ID column is the durable record if the cache was cleared.
function isSaved(sheet, requestId) {
  if (CacheService.getScriptCache().get("req_" + requestId)) return true;
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  var column = FIELDS.map(function (field) { return field[0]; }).indexOf("request_id") + 1;
  return !!sheet.getRange(2, column, lastRow - 1, 1)
    .createTextFinder(requestId).matchEntireCell(true).findNext();
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var data = (e && e.parameter) || {};

    // Honeypot: bots fill the hidden field. Answer "success" so they learn nothing.
    if (data["bot-field"]) return json({ status: "success" });

    // Reject fields the visitor typed that are too long, rather than silently
    // cutting off requirements such as exclusions. Limits match the form's maxlength.
    for (var key in LIMITS) {
      if (String(data[key] == null ? "" : data[key]).length > LIMITS[key]) {
        return json({ status: "error", message: "A field exceeds its maximum length" });
      }
    }

    var name = clean(data.name, 200);
    var email = clean(data.email, 200);
    var icp = clean(data.icp, 5000);
    if (!name || !icp || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ status: "error", message: "Missing or invalid fields" });
    }

    // The website resends the same request_id when a retry follows a slow or lost
    // reply. Older cached pages send none, so give those requests their own id.
    var requestId = /^[A-Za-z0-9-]{8,100}$/.test(data.request_id || "") ? data.request_id : Utilities.getUuid();

    lock.waitLock(10000);
    var sheet = getSheet();
    if (isSaved(sheet, requestId)) {
      return json({ status: "success", requestId: requestId, duplicate: true });
    }
    var row = FIELDS.map(function (field) {
      if (field[0] === "timestamp") return new Date();
      if (field[0] === "request_id") return requestId;
      return safeCell(clean(data[field[0]], 5000));
    });
    sheet.appendRow(row);
    SpreadsheetApp.flush();
    CacheService.getScriptCache().put("req_" + requestId, "1", 21600);
    lock.releaseLock();

    // The lead is saved. A notification failure must not turn this into an error,
    // or the visitor would retry a request that already succeeded.
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: email,
        subject: "New lead: " + name + " (" + (data.volume === "100" ? "free sample" : clean(data.volume, 20) || "request") + ")",
        body: FIELDS.slice(1)
          .map(function (field) { return field[1] + ": " + (clean(data[field[0]], 5000) || "-"); })
          .join("\n"),
      });
    } catch (mailError) {
      console.error("Lead saved but notification failed", requestId, mailError);
    }

    return json({ status: "success", requestId: requestId });
  } catch (err) {
    console.error(err);
    return json({ status: "error", message: "Server error" });
  } finally {
    try { lock.releaseLock(); } catch (ignored) {}
  }
}

// A GET to the /exec URL confirms the deployment is live without writing anything.
function doGet() {
  return json({ status: "ok" });
}

function getSheet() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
  var headers = FIELDS.map(function (field) { return field[1]; });
  var current = sheet.getLastRow() === 0 ? [] : sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  if (current.join("|") !== headers.join("|")) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function clean(value, max) {
  return String(value == null ? "" : value).trim().slice(0, max);
}

// Stop values such as "=HYPERLINK(...)" from running as spreadsheet formulas.
function safeCell(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
