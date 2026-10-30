# Page 09 — /tools/cold-email-checker (help content below the tool)

The tool itself is unchanged. Help content is appended below the "How the score works" section and above the CTA strip: how to use it, what the score means, what each of the 18 checks looks for, how to fix the common issues, and an FAQ with FAQPage schema.

Word target for the added help block: 500 to 700 words.

## How to use it

The checker runs in your browser, so nothing you paste is stored. Two minutes, and it tells you what to fix, not just what is wrong.

Four steps, start to finish:
1. Type your subject line. Under 45 characters and quiet; the checker flags spam words, emoji and length.
2. Set your from name. A real person, not "Marketing Team". The rules read body and subject together.
3. Paste the body you would actually send. The two built in examples show the gap between a weak and a strong email.
4. Read the fixes. Each warning comes with a specific fix, such as cutting to under 150 words.

No account needed. Clear the fields to reset; Control or Command and Return also runs the check.

## What the score means

One number, three honest bands. The score starts at 100 and loses points for every pattern it finds. It is a pattern check, not a prediction from Gmail or Outlook, so treat it as a rewrite guide.

- 75 to 100: Looks clean. Fix any remaining warnings for better reply rates, then send.
- 50 to 74: Needs work. Fine for a small test list, not for a full campaign.
- Below 50: High spam risk. Rewrite using the fixes before you send anywhere.

Points are weighted. A missing call to action or a subject full of spam words costs more than a short body, because the first two are what separates a reply from a report.

## What each check looks for (the 18 checks, with weight)

1. Spam trigger words: "guaranteed", "act now", "free trial" (High)
2. Excessive capitalisation: 10 or more capitals in a run (High)
3. More than one URL: two or more links in one email (Medium)
4. Multiple exclamation marks: two in a row (Medium)
5. Generic opening: "just reaching out", "hope this finds you" (Medium)
6. No clear call to action: no ask, no reply, no book, no yes no answer (High)
7. Email too long: over 180 words (Medium)
8. Email too thin: under 25 words with no link (Low)
9. Vague value proposition: "boost your revenue", no number behind it (Medium)
10. Subject spam signals: "free", "urgent", "invoice", leading quotes (High)
11. Subject too long: over 60 characters (Low)
12. HTML or images: embedded images or HTML tags (Medium)
13. Mentions an attachment: "attached" in first touch copy (Low)
14. Corporate language: "value proposition", "we are passionate about" (Medium)
15. Robotic tone: "kindly advise", "in my capacity as" (Low)
16. Emoji in subject: any emoji in the subject (Low)
17. Very long body: over 300 words (Low)
18. No recipient language: no "you" or "your" (Low)

## How to fix the common issues

The four warnings that move a score most. If you only fix one thing, fix the call to action first.

- One specific, low friction ask: "Worth a quick look?" or "Reply yes" beats "Let me know your thoughts". One question, one line, answerable from a phone. If the checker finds no call to action, end with that instead of a signature.
- Open with something only true for them: the generic opener check fires on "just reaching out" and "hope you are well". Open with a fact about their company: a launch, a hire, a market they entered.
- Cut to under 150 words: cold email is read once, on a phone. The sweet spot is 30 to 150 words: keep the ask, keep one specific detail, cut the company pitch.
- Keep the subject under 45 characters: long subjects get cut off in the inbox; the ones full of "free", "urgent" or "deal" get cut off in the spam folder. The built in good example, "Quick question about your EU expansion", is the template: short, specific, no hype.

## FAQ (with FAQPage schema)

1. Is this a real spam filter score?
   No. The score is a pattern check: it starts at 100 and subtracts weighted points for the 18 rule groups in the table above. It is not a prediction from Gmail or Outlook.
2. What score should I aim for?
   75 or above, the "Looks clean" band. 50 to 74 is "Needs work", fine for a small test list but not a full campaign. Below 50 is high spam risk; the rewrite is worth doing first.
3. Does it check the subject line?
   Yes, on its own, for spam words such as "free" and "urgent", for emoji, and for length over 60 characters. The built in good example keeps the subject quiet and under 45 characters.
4. Why did my short email score low?
   The checker flags bodies under 25 words with no link as too thin. Short is fine, but one specific detail about the reader keeps it from reading like a notice.
5. Does a high score guarantee inbox placement?
   No. A clean email sent to a bounced address still reaches nobody, which is why a list of verified business emails matters.

## Schema

SoftwareApplication (existing, unchanged) plus FAQPage for the five questions above.

## Design note

Uses the tools-page design tokens only (.tool-section, .tool-kicker, .tool-how-item style cards, .tool-cta-strip, Inter + Manrope). New scoped classes: .tool-help-inner, .tool-help-sub, .tool-help-steps, .tool-help-scores, .tool-help-table (with a swipe sideways scroll hint), .tool-faq accordion (details/summary, matching .tool-examples). No new JS and no new images.
