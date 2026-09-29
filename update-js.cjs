const fs = require('fs');

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyzuAM0Ru6S-W-wwn1M3KuXyAGsV03cSuE6BgxXYVL8r2G3_WdGxDkQZxc3XHugrcBB/exec';

function patchFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  
  if (content.includes('AKfycbyzuAM0Ru6S')) {
    console.log(filepath + " already patched.");
    return;
  }
  
  // We need to inject the fetch block right after checking bot-field
  // `const data = new FormData(form);`
  const searchStr = `const data = new FormData(form);`;
  
  const inject = `
    const submitBtn = form.querySelector('button[type="submit"]');
    if(submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
    try {
      await fetch("${WEBHOOK_URL}", {
        method: "POST",
        body: new URLSearchParams(data).toString(),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        mode: "no-cors"
      });
    } catch (e) {
      console.error(e);
    }
    if(submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Continue to WhatsApp <span aria-hidden="true">↗︎</span>';
    }
  `;
  
  // Make the submit event listener async if it isn't
  content = content.replace(/form\.addEventListener\(['"]submit['"],\s*\(\s*event\s*\)\s*=>\s*\{/, 'form.addEventListener("submit", async (event) => {');
  
  // Also for app.js which has `form.addEventListener('submit',async event=>{`
  // so let's be careful. Let's just find the `const data = new FormData(form);` and replace it.
  
  content = content.replace(/const data\s*=\s*new FormData\(form\);/g, `const data = new FormData(form);${inject}`);
  
  fs.writeFileSync(filepath, content);
  console.log("Patched " + filepath);
}

patchFile('public/app.js');
patchFile('public/editorial.js');
