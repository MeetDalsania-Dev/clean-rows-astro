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
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var data = (e && e.parameter) || {};

    // Honeypot: bots fill the hidden field. Answer "success" so they learn nothing.
    if (data["bot-field"]) return json({ status: "success" });

    var name = clean(data.name, 200);
    var email = clean(data.email, 200);
    var icp = clean(data.icp, 5000);
    if (!name || !icp || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ status: "error", message: "Missing or invalid fields" });
    }

    lock.waitLock(10000);
    var sheet = getSheet();
    var row = FIELDS.map(function (field) {
      if (field[0] === "timestamp") return new Date();
      return safeCell(clean(data[field[0]], 5000));
    });
    sheet.appendRow(row);
    lock.releaseLock();

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: "New lead: " + name + " (" + (data.volume === "100" ? "free sample" : clean(data.volume, 20) || "request") + ")",
      body: FIELDS.slice(1)
        .map(function (field) { return field[1] + ": " + (clean(data[field[0]], 5000) || "-"); })
        .join("\n"),
    });

    return json({ status: "success" });
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
