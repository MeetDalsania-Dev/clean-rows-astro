const fs = require('fs');

function patchFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  
  // Find the submit event listener
  if (filepath.includes('editorial.js')) {
    // editorial.js logic
    const replacement = `
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
`;
    // Replace everything from form.addEventListener("submit" ... to the end of the IIFE
    content = content.replace(/form\.addEventListener\("submit"[\s\S]*\}\)\(\);\s*$/, replacement + "\n  document.querySelector('#copy-slack-email')?.addEventListener('click', async () => {\n    const email = document.querySelector('#slack-email').textContent.trim();\n    const message = document.querySelector('#slack-copy-status');\n    try {\n      await navigator.clipboard.writeText(email);\n      message.textContent = 'Email copied. Paste it into your Slack workspace invitation.';\n    } catch {\n      message.textContent = 'Select and copy the email above to invite us.';\n    }\n  });\n})();");
  } else if (filepath.includes('app.js')) {
    // app.js logic
    const replacement = `
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity() || form.elements.namedItem("bot-field").value) return;
    
    fillAttribution();
    const data = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    if(submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
    
    try {
      await fetch("https://script.google.com/macros/s/AKfycbyzuAM0Ru6S-W-wwn1M3KuXyAGsV03cSuE6BgxXYVL8r2G3_WdGxDkQZxc3XHugrcBB/exec", {
        method: "POST",
        body: new URLSearchParams(data).toString(),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        mode: "no-cors"
      });
      
      statusMessage('Your request is received. We will review your requirements and email you shortly.');
      form.reset();
      updateRequest();
    } catch (e) {
      console.error(e);
      statusMessage('Your request didn’t send. Try again or email us directly.', 'mailto:hello@cleanrows.com', 'Email Clean Rows ↗︎');
    }
    
    if(submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Request Sent <span aria-hidden="true">✓</span>';
    }
  });
`;
    content = content.replace(/form\.addEventListener\('submit'[\s\S]*\}\);\s*\}\);\s*\}\);/g, ""); // strip old
    content = content.replace(/form\.addEventListener\("submit"[\s\S]*\}\);\s*\}\);\s*\n/g, ""); // strip old if modified
    
    // It's safer to just regex replace the whole block
    const blockStart = content.indexOf("form.addEventListener('submit'");
    if (blockStart === -1) {
       const blockStart2 = content.indexOf('form.addEventListener("submit"');
       if(blockStart2 !== -1) {
          const blockEnd = content.indexOf("$('#copy-slack-email').addEventListener('click'");
          content = content.substring(0, blockStart2) + replacement + "\n  " + content.substring(blockEnd);
       }
    } else {
       const blockEnd = content.indexOf("$('#copy-slack-email').addEventListener('click'");
       content = content.substring(0, blockStart) + replacement + "\n  " + content.substring(blockEnd);
    }
  }
  
  fs.writeFileSync(filepath, content);
  console.log("Patched " + filepath);
}

patchFile('public/app.js');
patchFile('public/editorial.js');
