/* Shared editorial pages: plan selection and explicit WhatsApp handoff. */
(() => {
  "use strict";
  const pagePath = location.pathname.replace(/\/$/, "") || "/";
  const pageName = pagePath.slice(1).replaceAll("/", "-") || "home";
  document.querySelectorAll("[data-cta]").forEach((link) => {
    link.dataset.cta = link.dataset.cta.replace(/^home-/, pageName + "-");
  });
  const form = document.querySelector("#lead-form");
  if (!form) return;
  const volume = form.querySelector('[name="volume"]');
  const heading = form.querySelector("#request-heading");
  const status = form.querySelector("#form-status");
  const selection = document.createElement("p");
  selection.className = "ed-selection";
  selection.setAttribute("role", "status");
  selection.setAttribute("aria-live", "polite");
  form.querySelector(".form-title").after(selection);
  const plans = {
    100: "100 free sample leads",
    1000: "Starter: 1,000 leads for $25 USD",
    10000: "Growth: 10,000 leads for $199 USD",
    50000: "Scale: 50,000 leads for $799 USD",
    "100000+": "Enterprise: 100,000+ leads, custom quote",
    "Recurring monthly": "Recurring monthly delivery, scope to be agreed",
  };
  function updateSelection() {
    heading.textContent =
      volume.value === "100"
        ? "Your first 100 are on us."
        : "Let’s scope your order.";
    selection.textContent =
      "Selected: " + (plans[volume.value] || volume.value);
    status.replaceChildren();
  }
  document.querySelectorAll("[data-plan]").forEach((link) => {
    link.addEventListener("click", () => {
      volume.value = link.dataset.plan;
      form.querySelector(".form-options").open = true;
      updateSelection();
    });
  });
  document
    .querySelectorAll('[data-sample], .ed-actions a[href="#contact"]')
    .forEach((link) => {
      link.addEventListener("click", () => {
        volume.value = "100";
        updateSelection();
      });
    });
  volume.addEventListener("change", updateSelection);
  updateSelection();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity() || form.elements.namedItem("bot-field").value)
      return;
    const data = new FormData(form);
    const lines = [
      "Hi Clean Rows, I’d like to discuss " +
        (plans[data.get("volume")] || "a prospect list") +
        ".",
    ];
    const labels = {
      name: "Name",
      email: "Work email",
      icp: "Ideal customer",
      company: "Company",
      type: "Team",
      timeline: "Timeline",
      notes: "Notes",
    };
    for (const [key, label] of Object.entries(labels)) {
      const value = String(data.get(key) || "").trim();
      if (value) lines.push(label + ": " + value);
    }
    lines.push("", "Page: " + pagePath);
    if (window.CleanRowsTracking)
      lines.push("Ref: " + window.CleanRowsTracking.summary());
    const link = document.createElement("a");
    link.href =
      "https://wa.me/918469847308?text=" + encodeURIComponent(lines.join("\n"));
    link.target = "_blank";
    link.rel = "noopener";
    link.className = "ed-text-link";
    link.textContent = "Open my request in WhatsApp ↗";
    const message = document.createElement("p");
    message.textContent =
      "Your request is prepared, not sent. Open WhatsApp, review it, then press Send.";
    status.replaceChildren(message, link);
    status.focus({ preventScroll: true });
    window.open(link.href, "_blank", "noopener");
  });
  document
    .querySelector("#copy-slack-email")
    ?.addEventListener("click", async () => {
      const email = document.querySelector("#slack-email").textContent.trim();
      const message = document.querySelector("#slack-copy-status");
      try {
        await navigator.clipboard.writeText(email);
        message.textContent =
          "Email copied. Paste it into your Slack workspace invitation.";
      } catch {
        message.textContent = "Select and copy the email above to invite us.";
      }
    });
})();
