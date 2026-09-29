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
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity() || form.elements.namedItem("bot-field").value) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    if(submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
    
    const data = new FormData(form);
    
    try {
      await fetch("https://script.google.com/macros/s/AKfycbyzuAM0Ru6S-W-wwn1M3KuXyAGsV03cSuE6BgxXYVL8r2G3_WdGxDkQZxc3XHugrcBB/exec", {
        method: "POST",
        body: new URLSearchParams(data).toString(),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        mode: "no-cors"
      });
      
      const message = document.createElement("p");
      message.textContent = "Your request has been received securely. We will review your requirements and email you shortly.";
      status.replaceChildren(message);
      status.focus({ preventScroll: true });
      form.reset();
      
    } catch (e) {
      console.error(e);
      const message = document.createElement("p");
      message.textContent = "Something went wrong. Please try again or email us directly.";
      status.replaceChildren(message);
    }
    
    if(submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Request Sent <span aria-hidden="true">✓</span>';
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