/* Shared editorial pages: plan selection and request submission. */
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
  // After a successful request, a plan or sample button reopens the form first.
  function reopenRequest() {
    if (form.classList.contains("is-sent")) window.CleanRowsSuccess?.reset(form);
  }
  document.querySelectorAll("[data-plan]").forEach((link) => {
    link.addEventListener("click", () => {
      reopenRequest();
      volume.value = link.dataset.plan;
      window.CleanRowsFormSteps?.show(1, false);
      updateSelection();
    });
  });
  document
    .querySelectorAll('[data-sample], .ed-actions a[href="#contact"]')
    .forEach((link) => {
      link.addEventListener("click", () => {
        reopenRequest();
        volume.value = "100";
        window.CleanRowsFormSteps?.show(1, false);
        updateSelection();
      });
    });
  volume.addEventListener("change", updateSelection);
  updateSelection();
  
  // Copy campaign attribution into the hidden fields, as app.js does on Home.
  function fillAttribution() {
    const tracking = window.CleanRowsTracking;
    if (!tracking) return;
    for (const [key, value] of Object.entries(tracking.data())) {
      const input = form.querySelector('input[type=hidden][name="' + key + '"]');
      if (input) input.value = value;
    }
  }

  form.addEventListener("reset", () => setTimeout(updateSelection));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity() || form.elements.namedItem("bot-field").value) return;

    fillAttribution();
    const submitBtn = form.querySelector('button[type="submit"]');
    const label = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    status.replaceChildren();

    const data = new FormData(form);
    const isSample = data.get("volume") === "100";

    try {
      await window.CleanRowsSubmit(form, data);
      if (window.CleanRowsSuccess) {
        window.CleanRowsSuccess.show(form, { sample: isSample });
      } else {
        const message = document.createElement("p");
        message.textContent = "Your request has been received. We will review your requirements and email you shortly.";
        status.replaceChildren(message);
        status.focus({ preventScroll: true });
      }
      form.reset();
    } catch (e) {
      console.error(e);
      // Keep what the visitor typed so they can retry.
      const message = document.createElement("p");
      message.textContent = window.CleanRowsSubmitError
        ? window.CleanRowsSubmitError(e)
        : "Your request didn’t send. Please try again or email hello@cleanrowsdata.com.";
      const link = document.createElement("a");
      link.href = "mailto:hello@cleanrowsdata.com";
      link.className = "ed-inline";
      link.textContent = "Email Clean Rows ↗";
      status.replaceChildren(message, link);
      status.focus({ preventScroll: true });
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = label;
    }
  });

  document.querySelector('#copy-slack-email')?.addEventListener('click', async () => {
    const email = document.querySelector('#slack-email').textContent.trim();
    const message = document.querySelector('#slack-copy-status');
    try {
      await navigator.clipboard.writeText(email);
      message.textContent = 'Email copied. Paste it into your Slack workspace invitation.';
    } catch {
      message.textContent = 'Select and copy the email above to invite us.';
    }
  });
})();
