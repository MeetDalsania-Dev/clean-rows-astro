// Cold Email Spam Checker — runs fully in the browser, no backend required.
(function () {
  'use strict';

  // ===== Spam Pattern Rules =====
  const WARNINGS = [
    {
      id: 'spam-word', label: 'Spam trigger words detected', severity: 3,
      patterns: [/\bfree\b/i, /\blimited time\b/i, /\bact now\b/i, /\bdo not miss\b/i, /\bguaranteed\b/i, /\bno risk\b/i, /\bclick here\b/i, /\bexclusive offer\b/i, /\bonce in a lifetime\b/i, /\bbig savings\b/i, /\bhot deal\b/i, /\bbuy now\b/i, /\bfree trial\b/i, /\b100% free\b/i, /\bwin now\b/i, /\bearn money\b/i, /\bmake money\b/i, /\bget rich\b/i, /\bpotential partner\b/i, /\brevolutionary\b/i, /\bgroundbreaking\b/i, /\bunbelievable\b/i, /\bexclusive\b/i, /\bhighly recommended\b/i, /\bpowerful\b/i],
      fix: 'Remove promotional language. Specific, factual claims outperform hype.'
    },
    {
      id: 'all-caps', label: 'Excessive capitalisation', severity: 3,
      patterns: [/[A-Z]{10,}/, /^[A-Z\s.!?]{20,}$/m],
      fix: 'Avoid runs of 10+ capital letters (excluding proper nouns or acronyms).'
    },
    {
      id: 'many-links', label: 'More than one URL', severity: 2,
      fn: (text) => (text.match(/https?:\/\//g) || []).length > 1,
      fix: 'Keep links to one. Multiple URLs look like a directory listing or a phishing attempt.'
    },
    {
      id: 'excl', label: 'Multiple exclamation marks', severity: 2,
      patterns: [/[!]{2,}/],
      fix: 'Use at most one exclamation mark. Professional outreach reads calmer.'
    },
    {
      id: 'generic-opener', label: 'Generic or weak opening line', severity: 2,
      patterns: [/\bhey there\b/i, /\bhi there\b/i, /\bdear (customer|friend|valued|prospective)\b/i, /\bhoping you\'re well\b/i, /\bhope this finds you\b/i, /\bhow\'s it going\b/i, /\bgood morning\b/i, /\bjust reaching out\b/i, /\bjust checking in\b/i, /\bfollowing up\b/i, /\bhow are you\b/i],
      fix: 'Open with something specific about them, or skip the greeting and lead with value.'
    },
    {
      id: 'no-cta', label: 'No clear call to action', severity: 3,
      fn: (text) => {
        const ctaWords = /\b(let\'s|shall we|could you|can you|would you|reply|respond|book|schedule|quick call|15 min|interested|think about|would love|curious|open to|worth|sounds|yep|sure)\b/i;
        return !ctaWords.test(text);
      },
      fix: 'End with one specific, low-friction CTA. "Worth a quick look?" beats "Let me know your thoughts."'
    },
    {
      id: 'too-long', label: 'Email is too long', severity: 2,
      fn: (text) => text.split(/\s+/).length > 180,
      fix: 'Cut to under 150 words. Focused asks get more replies.'
    },
    {
      id: 'very-short', label: 'Email is too thin', severity: 1,
      fn: (text) => text.trim().split(/\s+/).length < 25 && !/https?:\/\//.test(text),
      fix: 'Add one specific detail about them (recent news, product, team) to show you did the research.'
    },
    {
      id: 'generic-benefit', label: 'Vague value proposition', severity: 2,
      patterns: [/\bimprove (your |the )?(sales|revenue|growth|performance|results)\b/i, /\bboost (your )?(leads|pipeline|revenue|growth)\b/i, /\bhelp (you|your team|companies) (with |improve|grow|scale|succeed)\b/i, /\bunlock\b/i, /\btransform\b/i, /\belevate\b/i, /\bstreamline\b/i, /\brevolutionis/i, /\bdigital (transformation|strategy)\b/i, /\bnext (gen|generation|level|step)\b/i, /\bgame changer\b/i, /\bbest in class\b/i, /\bworld class\b/i, /\bworld-class\b/i, /\baward winning\b/i, /\blead (provider|the |our |your )?(solutions|platform|team|expertise)\b/i, /\bpassionate about\b/i, /\bobsessed with\b/i, /\bwe believe\b/i, /\bwe are (proud|excited|thrilled)\b/i, /\bour (team|company|solution|platform|approach) (is|helps|enables)\b/i, /\bseamless\b/i, /\bfrictionless\b/i, /\bunparalleled\b/i, /\bbest-in-class\b/i],
      fix: 'Replace vague claims with specific numbers or outcomes. "Cut reply time by 40%" beats "improve your results."'
    },
    {
      id: 'subject-spam', label: 'Subject line has spam signals', severity: 3,
      fn: (text, subject) => {
        if (!subject || !subject.trim()) return false;
        const spamWords = ['free','no reply','no-reply','discount','deal','act now','act fast','exclusive','important','urgent','congratulations','action required','subscription','invoice','password','security','alert','final call','last chance','verify','confirm'];
        const s = subject.toLowerCase();
        if (spamWords.some(w => s.includes(w))) return true;
        if (/^["“]/.test(subject)) return true;
        return false;
      },
      fix: 'Keep subject lines short (under 45 chars), specific and quiet. "Quick question about X" works better than "EXCITING NEWS!!!"'
    },
    {
      id: 'subject-long', label: 'Subject line too long', severity: 1,
      fn: (text, subject) => subject && subject.trim().length > 60,
      fix: 'Keep subject under 45 characters. Long subjects get truncated and look spammy in inboxes.'
    },
    {
      id: 'images', label: 'HTML / image content detected', severity: 2,
      patterns: [/<img[\s>]/i, /<html/i, /style="[^"]*background/i, /width="100%"/i],
      fix: 'Plain-text emails have the highest reply rates for cold outreach. Drop HTML templates.'
    },
    {
      id: 'attachment', label: 'Mentions an attachment', severity: 1,
      patterns: [/\battached\b/i, /\battachment\b/i, /\battached is\b/i, /\bsee attached\b/i],
      fix: 'Avoid attachments in first-touch cold email — it raises spam scores. Share a link instead.'
    },
    {
      id: 'self-promo', label: 'Marketing / corporate language', severity: 2,
      fn: (text) => {
        const phrases = [
          /our (company|team|platform|product|solution|service|expertise)/i,
          /we (help|offer|provide|deliver|create|build) (you|our clients|our customers|businesses)/i,
          /we (are|'re) (the|a|an|proud|passionate|dedicated|focused|obsessed|committed)/i,
          /we (believe|think|feel) (that|you|you're)/i,
          /looking forward to (hearing|working|connecting|partnering)/i,
          /don't (hesitate|be shy)/i, /feel free to (reach|contact|reply)/i,
          /get in touch/i, /connect with us/i,
          /let's (work|partner|collaborate|chat|schedule|connect|talk|grab)/i,
          /I'd love to (connect|chat|talk|show|walk)/i,
          /would love to (connect|chat|talk|show)/i,
          /worth (a|our|the|exploring)/i,
          /no (strings|obligation|pressure)/i, /zero (obligation|pressure|risk)/i,
          /win win/i, /perfect fit/i, /ideal (fit|partner|candidate)/i,
          /high value/i, /highly (relevant|valuable|impactful)/i,
          /value (add|proposition|prop)/i,
          /key (benefits|value|features)/i, /top (reason|benefit|feature|reasons)/i,
          /what makes us/i, /what sets us/i, /the (difference|secret|key) to/i,
          /secret (to|of)/i, /unlock(ing)? (the|your|new)/i,
          /transform(ing)? (your|the)/i, /elevate (your|the)/i,
          /streamline (your|the)/i, /accelerate (your|the|growth|results)/i,
          /breakthrough/i, /innovative/i, /state[- ]of[- ]the[- ]art/i,
          /best[- ]in[- ]class/i, /world[- ]class/i, /award[- ]winning/i,
          /leading (provider|expert|player|edge|authority)/i,
          /proven (track record|results|success|solution)/i,
          /results[- ](driven|oriented|focused|guaranteed)/i,
          /risk[- ]free/i, /free (consultation|audit|quote|sample|demo|evaluation)/i,
          /complimentary/i, /exceed(ing)? (expectations|your)/i,
          /first[- ]class/i, /top[- ]notch/i, /top[- ]tier/i, /top[- ]rated/i,
          /high[- ](quality|performance|speed|value|impact)/i,
          /untapped (potential|market|opportunity)/i,
          /hidden (gem|treasure|potential|value)/i,
          /newly (launched|designed|created|developed)/i,
          /next[- ](level|gen|generation)/i, /beyond (compare|excellent|expectations)/i,
          /second[- ]to[- ]none/i, /unmatched/i, /unparalleled/i, /unrivaled/i,
          /unbeatable/i, /don't (miss|lose|waste|wait|delay)/i,
          /miss(out)? opportunity/i, /lose out/i,
          /limited (time|opportunity|spots|availability)/i,
          /last (chance|call|week|opportunity|day)/i,
          /final (chance|call|opportunity|notice|reminder)/i,
          /now is the time/i, /time is (of the essence|running out|limited)/i,
          /act (now|fast|today)/i, /get started now/i, /start now/i,
          /do it today/i, /seize the (day|opportunity|moment)/i,
          /grab (yours|your|the|a)/i, /claim (yours|your|the|it|a)/i,
          /reserve (your|the|a|your)/i, /join (us|now|today|our|the|in)/i,
          /click (here|below|through|on|this|the)/i,
          /see for yourself/i, /find out (more|how|what|why)/i,
          /learn (more|about|how|why|the)/i, /discover (the|our|your|how|why)/i,
          /explore (our|the|your|how|what)/i,
          /congratulations/i, /prize/i, /giveaway/i, /sweepstakes/i,
          /bargain/i, /buy now/i, /get it now/i,
          /free (to|your|account|trial|demo|consultation|audit|quote)/i,
          /try (it|for) free/i, /100% (free|guaranteed)/i,
          /no (cost|charge|fee|payment|risk|catch|obligation)/i,
          /zero (cost|fee|risk|obligation)/i,
          /exclusively for you/i, /just for you/i,
          /quick (question|update|note|heads up|reminder)/i,
          /just (checking in|following up|wanted to|announcing|introducing)/i,
          /hoping you (are|'re|'ve)/i, /hope you (are|'re|'ve|this)/i,
          /how (are|is|'s) (you|it|things|going)/i,
          /how's (it|everything|business|your day)/i,
          /thoughts? (on|about|regarding)/i,
          /want(ed)? to (know|chat|connect|share|learn)/i,
          /can't (wait|believe)/i, /excited (to|about|for)/i,
          /thrilled (to|about|for)/i, /proud (to|about|of)/i,
          /passionate (about|to)/i, /obsessed (with|about)/i,
          /seamless/i, /frictionless/i, /revolutionary/i, /groundbreaking/i,
          /game[- ]changer/i,
          /mission[- ]driven/i, /values[- ]driven/i,
          /data[- ]driven/i, /evidence[- ]based/i, /research[- ]based/i,
          /performance[- ]based/i, /results[- ]based/i,
          /growth[- ](mindset|hacker|hacking|marketing|strategy|focused|oriented)/i,
          /success[- ]oriented/i, /action[- ]oriented/i, /goal[- ]oriented/i,
        ];
        return phrases.some(p => p.test(text));
      },
      fix: 'Write like a real person would. "We built X and it helped Y achieve Z" beats "Our revolutionary platform will transform your business."'
    },
    {
      id: 'tone-formal', label: 'Overly formal / robotic tone', severity: 1,
      fn: (text) => {
        const phrases = [
          /please find attached/i,
          /I (write|am writing) to/i,
          /I am in (the|a) (position|capacity)/i,
          /kindly (advise|inform|confirm|find|attach|do)/i,
          /do not (hesitate|doubt|delay|forget|miss|be shy)/i,
          /please (do not|find|attach|kindly|advise|confirm|inform|let|feel)/i,
          /please feel (free|comfortable)/i,
          /I (hope|am hoping|wish) (this|you|the)/i,
          /I (look|am looking) forward to/i,
        ];
        return phrases.some(p => p.test(text));
      },
      fix: 'Write naturally. "I\'m Alex — saw your team is scaling fast" beats "I am writing to you in my capacity as…"'
    },
    {
      id: 'subject-emoji', label: 'Emoji in subject line', severity: 1,
      fn: (text, subject) => /[\u{1F300}-\u{1F9FF}]/u.test(subject || ''),
      fix: 'Emoji in subject lines can raise spam scores and reduce credibility with professional recipients.'
    },
    {
      id: 'long-body', label: 'Very long body', severity: 1,
      fn: (text) => text.split(/\s+/).length > 300,
      fix: 'Cut significantly. 100–150 words is the sweet spot for cold outreach.'
    },
    {
      id: 'multiple-questions', label: 'Multiple questions in one email', severity: 1,
      fn: (text) => (text.match(/\?/g) || []).length > 2,
      fix: 'One clear ask. Multiple questions dilute the CTA and reduce reply rates.'
    },
    {
      id: 'no-personalised', label: 'No recipient-specific language', severity: 1,
      fn: (text) => !/\b(you|your)\b/i.test(text) || text.split(/\s+/).length < 15,
      fix: 'Always personalise. Use {{first_name}} or reference a specific detail about them.'
    }
  ];

  const POSITIVES = [
    { fn: (t, s) => s && s.trim().length > 5 && s.trim().length <= 45, msg: 'Subject line is a good length' },
    { fn: (t) => !WARNINGS[0].patterns.some(p => p.test(t)), msg: 'No obvious spam trigger words' },
    { fn: (t) => /\b(your|their|his|her|they)\b/i.test(t), msg: 'Uses recipient-specific language' },
    { fn: (t) => /\b(worth|open to|could you|can you|would you|reply|book|schedule|quick call|15 min)\b/i.test(t), msg: 'Clear, low-friction call to action' },
    { fn: (t) => t.split(/\s+/).length >= 30 && t.split(/\s+/).length <= 150, msg: 'Body length is in the sweet spot (30–150 words)' },
    { fn: (t) => !/<img/i.test(t), msg: 'No embedded images — good for deliverability' }
  ];

  function checkEmail(subject, body) {
    const text = (body || '').trim();
    if (!text && !subject) return null;

    const fired = [];
    WARNINGS.forEach(w => {
      if (w.fn) {
        if (w.fn(text, subject)) fired.push(w);
      } else if (w.patterns) {
        const target = w.id === 'subject-spam' ? subject : text + ' ' + (subject || '');
        const found = w.patterns.filter(p => p.test(target));
        if (found.length > 0) fired.push({ ...w, matched: found.length });
      }
    });

    const positives = POSITIVES.filter(p => p.fn(text, subject));

    let score = 100;
    fired.forEach(w => { score -= w.severity * 8; });
    score = Math.max(0, Math.min(100, score));

    let verb, color;
    if (score >= 75) { verb = 'Looks clean'; color = '#007f5b'; }
    else if (score >= 50) { verb = 'Needs work'; color = '#c8820e'; }
    else { verb = 'High spam risk'; color = '#b5302d'; }

    return { score, verb, color, fired, positives };
  }

  // ===== UI =====
  const byId = (id) => document.getElementById(id);

  const EXAMPLES = {
    bad: {
      subject: 'FREE EXCLUSIVE OFFER — Act Now!!',
      body: 'Hey there!\n\nI hope you\'re doing well. I came across your company and I think we could help you improve your sales performance. Our platform is a revolutionary, world-class solution that will transform your business and unlock your full potential.\n\nWe are passionate about delivering results and we are committed to helping you grow. Don\'t miss this exclusive opportunity! Click here to claim your free trial now. This is a limited time offer and once it\'s gone it\'s gone.\n\nAct now before it\'s too late!\n\nBest regards,\nSales Team'
    },
    good: {
      subject: 'Quick question about your EU expansion',
      body: 'Hi Jordan,\n\nSaw your team just opened a hub in Berlin — congrats. We work with SaaS companies expanding into the EU, and we typically help them cut time-to-first-meeting by about 40%.\n\nWorth a quick look? I put together a short breakdown of what changed for three teams your size last quarter.\n\n— Alex'
    }
  };

  function runCheck() {
    const subject = byId('email-subject').value || '';
    const body = byId('email-body').value || '';
    const result = checkEmail(subject, body);
    if (!result) return;

    byId('empty-state').hidden = true;
    byId('results').hidden = false;

    byId('score-num').textContent = result.score;
    const circle = byId('score-circle');
    circle.style.setProperty('--score-color', result.color);
    circle.style.setProperty('--score-pct', result.score + '%');

    byId('score-verb').textContent = result.verb;
    byId('score-summary').textContent =
      result.score >= 75 ? 'Your email is ready to send. Fix any remaining warnings for better reply rates.' :
      result.score >= 50 ? 'You\'re in the middle range. Address the top fixes below before sending to a large list.' :
      'This will likely land in spam folders for many recipients. Rewrite it using the fixes below.';

    const wList = byId('warning-list');
    if (result.fired.length === 0) {
      wList.innerHTML = '<p class="tool-no-warnings">No issues detected — looks clean.</p>';
    } else {
      wList.innerHTML = result.fired.map(w =>
        '<div class="tool-warning-item severity-' + w.severity + '">' +
        '<div class="tool-warning-header">' +
        '<span class="tool-warning-label">' + w.label + '</span>' +
        (w.severity >= 3 ? '<span class="tool-sev-tag high">High</span>' : w.severity === 2 ? '<span class="tool-sev-tag med">Med</span>' : '<span class="tool-sev-tag low">Low</span>') +
        '</div>' +
        '<p class="tool-warning-fix">' + w.fix + '</p>' +
        '</div>'
      ).join('');
    }

    const pList = byId('positive-list');
    if (result.positives.length === 0) {
      pList.innerHTML = '<p class="tool-no-warnings">Keep writing — more positive signals will appear as you refine the email.</p>';
    } else {
      pList.innerHTML = result.positives.map(p =>
        '<div class="tool-positive-item"><span class="tool-positive-icon">✓</span><span>' + p.msg + '</span></div>'
      ).join('');
    }
  }

  byId('check-btn').addEventListener('click', runCheck);

  document.querySelectorAll('.tool-example-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ex = EXAMPLES[btn.dataset.example];
      byId('email-subject').value = ex.subject;
      byId('email-body').value = ex.body;
      runCheck();
    });
  });

  byId('email-body').addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCheck();
    }
  });
})();
