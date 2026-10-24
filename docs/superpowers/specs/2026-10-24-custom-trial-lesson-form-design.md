# Custom trial lesson form — design

Date: 2026-10-24 · Status: approved in chat, waiting for spec review

## Goal

Replace the plain HubSpot iframe form behind the "Book a trial lesson" button with our own
branded form: the teacher avatar, brand colours and fonts, clickable level pills and goal chips.
Every submission must still land in HubSpot as a "Trial lesson request" with the visitor's
original source, and GA4 must still record `generate_lead`.

Out of scope: other languages (the form is English only), the main website
englishpusher.in.ua, changes to the Leads Bot.

## What the student sees

**Button (unchanged):** orange "Book a trial lesson" pill on the home page (`src/Index.tsx`).
The `#trial-lesson` deep link still opens the form, and opening it still pushes
`trial_form_open` to the dataLayer.

**Modal card:** white, rounded, about 520 px wide, scrolls inside on small screens, closes with
✕, Esc or a click on the backdrop. A half-filled form survives closing and reopening.

1. **Header:** the waving teacher avatar (`teacher-trial.png`, about 112 px, slightly overlapping
   the top edge of the card), title **"Book a trial lesson with Tetiana"** (Space Grotesk),
   subtitle *"Tell me a little about yourself and I'll get back to you soon."*
2. **Fields**, in this order:

   | Field | Control | Required |
   |---|---|---|
   | First name | text input | yes |
   | Email | email input | yes |
   | Your English level | single-choice pills `A1` `A2` `B1` `B2` `C1` `Not sure` | no |
   | What's your goal? | multi-select chips (list below) | no |
   | Telegram, Viber or phone | text input, placeholder `@username or +380…` | no |
   | Message | small textarea, placeholder *"Anything I should know? Preferred time, topics…"* | no |

   First name and Email sit side by side on desktop and stack on phones.

   Goal chips: `🗣 Speaking confidence` · `💼 Work / Business` · `🎓 Exams (IELTS, NMT…)` ·
   `✈️ Travel` · `🏠 Everyday life` · `✨ Other`.
3. **Submit button:** full width, orange, label **"Book a trial lesson"**, spinner while sending.
   The copy never says "free".

**Style:** brand orange `#f07c1a` (Tailwind `brand`) for selected pills and chips, focus rings and
the button; neutral grey borders; Inter for body text; soft shadow. Matches the rest of the app.

**Success screen:** the card content switches to `teacher-celebrate.png`, *"Thank you, {name}! 🎉
I'll contact you soon."*, a short confetti burst (`canvas-confetti`, already a dependency) and a
"Close" button. Reopening the modal after success shows a fresh, empty form.

**Errors:**
- Inline validation under the field: missing name, missing or invalid email.
- If sending fails (network error or HubSpot rejects it), a message above the button:
  *"Something went wrong. Please try again or write to me on Instagram."*, linking to
  `https://www.instagram.com/teti_push_english`. The typed answers stay in the form.

## How it works

### Files (app-englishpusher)

- `src/shared/TrialLessonForm.tsx` — keeps the button, modal, Esc/backdrop close, deep link and
  `trial_form_open`. The HubSpot embed script, the `hs-form-frame` div and the
  `hs-form-event:on-submission:success` listener are removed. Renders `<TrialForm />`.
- `src/shared/trialForm/TrialForm.tsx` — fields, pills, chips, validation, sending state, success
  screen. Fires `generate_lead` on success.
- `src/shared/trialForm/hubspot.ts` — `submitTrialForm(values): Promise<void>`. Builds the payload,
  posts it, throws on any non-2xx response. No React in this file.
- `src/shared/trialForm/options.ts` — the level and goal lists (label shown + value sent).
- `src/assets/teacher-trial.png` — the avatar from
  `D:\brain\raw\assets\2026-10-24-Personal-TrialFormAvatar.png`, resized to 256 px wide with
  `sharp` (the original is 1024×962, 1.1 MB).

### Submission

POST `https://api.hsforms.com/submissions/v3/integration/submit/149535757/2226dfee-47d4-406f-ae1a-2e8c0952dec2`
with `Content-Type: application/json`. This public endpoint needs no key. The portal is in eu1:
the first implementation step sends one test submission to confirm the endpoint accepts it; if it
does not, use the `api-eu1.hsforms.com` host instead and record that here.

Body:

```json
{
  "fields": [
    { "objectTypeId": "0-1", "name": "firstname", "value": "…" },
    { "objectTypeId": "0-1", "name": "email", "value": "…" },
    { "objectTypeId": "0-1", "name": "english_level", "value": "B1 – Intermediate" },
    { "objectTypeId": "0-1", "name": "learning_goals", "value": "speaking;travel" },
    { "objectTypeId": "0-1", "name": "messenger_contact", "value": "…" },
    { "objectTypeId": "0-1", "name": "message", "value": "…" }
  ],
  "context": {
    "hutk": "<value of the hubspotutk cookie, omitted if absent>",
    "pageUri": "<location.href>",
    "pageName": "<document.title>"
  }
}
```

- Optional fields left empty are not sent.
- `english_level` sends the existing HubSpot option text exactly (en dash): `A1 – Beginner`,
  `A2 – Elementary`, `B1 – Intermediate`, `B2 – Upper-Intermediate`, `C1 – Advanced`, `Not sure`.
  The pills show only `A1`…`C1` / `Not sure`.
- `learning_goals` sends internal values joined with `;`: `speaking`, `work_business`, `exams`,
  `travel`, `everyday_life`, `other`.
- The `hubspotutk` cookie is set by the HubSpot tracking code that GTM (`GTM-KJVX8GRG`) loads; it
  links the submission to the visitor's history (UTM, referrer).

### Spam

A hidden `website` text input (off-screen, `tabIndex={-1}`, `autoComplete="off"`,
`aria-hidden`). If it has a value, show the success screen and send nothing.

### Analytics

- `trial_form_open` — unchanged, pushed when the modal opens.
- `generate_lead` with `form_name: "trial_lesson"` — pushed after HubSpot returns 2xx, so GA4
  conversions continue without GTM changes.
- Microsoft Clarity now sees the form (it could not see inside the iframe).

### HubSpot setup (manual, before going live)

Done in portal 149535757 by Oleksandr; the service key cannot create properties.

1. Settings → Data Management → Properties → Contact properties → Create property:
   - `learning_goals` — label "Learning goals", type **Multiple checkboxes**, options with the
     internal values above and labels `Speaking confidence`, `Work / Business`,
     `Exams (IELTS, NMT…)`, `Travel`, `Everyday life`, `Other`.
   - `messenger_contact` — label "Telegram, Viber or phone", type **Single-line text**.
2. Marketing → Forms → "Trial lesson request" → add both properties to the form → Publish.
   The HubSpot form stays the source of truth for the form ID; its own layout no longer matters.

### n8n alert (workflow `IiHBsWcPJhpBK32V`)

Request `english_level`, `learning_goals` and `messenger_contact` in the HubSpot node and add three
lines to the Telegram message: level, goals and messenger contact (shown as `—` when empty).

## Testing

The app has no automated test runner; checks are manual.

1. `npm run build` passes (TypeScript + Vite).
2. Dev server: open the form, check desktop and phone widths, required-field errors, pill and chip
   selection, Esc/backdrop close and reopen keeps the answers.
3. One real submission (test name and email):
   - HubSpot: the contact exists with all fields, the "Trial lesson request" submission is on its
     timeline, and the original source is filled.
   - Telegram: the n8n alert arrives with level, goals and messenger (within 5 minutes once the
     workflow is published).
   - GA4 DebugView (or GTM preview): `generate_lead` fired once.
4. Failure path: block the request (DevTools offline) and check the error message, the Instagram
   link and that the answers stay.
5. Delete the test contact in HubSpot.

## Rollout

Branch `custom-trial-form` → PR → merge to `main`; GitHub Actions (`.github/workflows/deploy.yml`)
builds and publishes to gh-pages. The HubSpot properties must exist before the merge, otherwise
HubSpot rejects submissions with unknown fields.
