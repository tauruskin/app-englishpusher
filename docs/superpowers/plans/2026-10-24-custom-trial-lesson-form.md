# Custom Trial Lesson Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the HubSpot iframe form behind "Book a trial lesson" with our own branded React form that posts to the same HubSpot form through HubSpot's public submission API.

**Architecture:** Pure, unit-tested logic (option lists, validation, payload building) lives in small `.ts` files under `src/shared/trialForm/`; `TrialForm.tsx` is the UI; `TrialLessonForm.tsx` keeps the button + modal and renders `TrialForm`. No server: the browser posts JSON to `api.hsforms.com` with the `hubspotutk` cookie for attribution.

**Tech Stack:** React 18, TypeScript (strict), Tailwind 3 (`brand` = `#f07c1a`, fonts `font-display` / `font-body`), lucide-react, canvas-confetti, Vite 6. Unit tests use Node's built-in `node --test` (Node 22.20 runs `.ts` files directly — type stripping is on by default).

**Spec:** `docs/superpowers/specs/2026-10-24-custom-trial-lesson-form-design.md`

**Repo:** `D:\VIBE CODING\app-englishpusher`, branch `custom-trial-form` (already created and checked out). Run every command from the repo root.

**Who does what:** Tasks 1, 7 and 8 are done by the controller (main session) with Oleksandr — they touch HubSpot, n8n and live data. Tasks 2–6 are code tasks for subagents.

---

## File structure

| File | Responsibility |
|---|---|
| `src/shared/trialForm/options.ts` (create) | Level and goal lists (label shown + value HubSpot expects), form value type, empty values, Instagram link |
| `src/shared/trialForm/validate.ts` (create) | `validateTrialForm(values)` → field errors for name and email |
| `src/shared/trialForm/validate.test.ts` (create) | Unit tests for validation |
| `src/shared/trialForm/hubspot.ts` (create) | `readHutk`, `buildSubmission` (pure) and `submitTrialForm` (fetch) |
| `src/shared/trialForm/hubspot.test.ts` (create) | Unit tests for `readHutk` and `buildSubmission` |
| `src/shared/trialForm/TrialForm.tsx` (create) | The form UI, sending state, error message, success screen, `generate_lead` |
| `src/shared/TrialLessonForm.tsx` (modify, full rewrite) | Button, modal, deep link, `trial_form_open`; renders `TrialForm` |
| `src/assets/teacher-trial.png` (create) | Waving-teacher avatar, 256 px wide |
| `package.json` (modify) | Add `"test"` script |

---

### Task 1 (controller): Confirm the HubSpot submission endpoint

Not for a subagent — it sends a real submission.

- [ ] **Step 1: Send one submission with only existing fields**

Uses the existing test contact `pushkar.promo@gmail.com` ("Test Oleksandr", already seen by the n8n dedupe), so no new contact or Telegram alert is created.

```bash
curl -s -o /dev/stderr -w "%{http_code}\n" -X POST \
  "https://api.hsforms.com/submissions/v3/integration/submit/149535757/2226dfee-47d4-406f-ae1a-2e8c0952dec2" \
  -H "Content-Type: application/json" \
  -d '{"fields":[{"objectTypeId":"0-1","name":"firstname","value":"Test Oleksandr"},{"objectTypeId":"0-1","name":"email","value":"pushkar.promo@gmail.com"}],"context":{"pageUri":"https://app.englishpusher.in.ua/","pageName":"Endpoint check"}}'
```

Expected: `200` and a body with `"inlineMessage"`.

- [ ] **Step 2: If it is not 200, try the EU host**

Repeat Step 1 with `https://api-eu1.hsforms.com/...` (same path). Whichever host returns 200 is the one Task 3 uses in `SUBMIT_URL`. If it is the EU host, edit the "Submission" section of the spec to say so and tell the Task 3 subagent.

---

### Task 2: Test script, option lists and validation

**Files:**
- Modify: `package.json` (scripts)
- Create: `src/shared/trialForm/options.ts`
- Create: `src/shared/trialForm/validate.ts`
- Test: `src/shared/trialForm/validate.test.ts`

- [ ] **Step 1: Add the test script to `package.json`**

In `"scripts"`, add after `"preview"`:

```json
    "test": "node --test \"src/**/*.test.ts\"",
```

- [ ] **Step 2: Create `src/shared/trialForm/options.ts`**

The level values must match the HubSpot dropdown options exactly — the dash is an EN DASH (`–`, U+2013), not a hyphen.

```ts
// ---------------------------------------------------------------------------
// Choices in the trial lesson form and the values HubSpot expects for them.
// english_level is an existing HubSpot dropdown: values must match its option
// text exactly (EN DASH). learning_goals is a HubSpot checkbox property with
// these internal values.
// ---------------------------------------------------------------------------

export const LEVELS = [
  { short: "A1", value: "A1 – Beginner" },
  { short: "A2", value: "A2 – Elementary" },
  { short: "B1", value: "B1 – Intermediate" },
  { short: "B2", value: "B2 – Upper-Intermediate" },
  { short: "C1", value: "C1 – Advanced" },
  { short: "Not sure", value: "Not sure" },
] as const;

export const GOALS = [
  { emoji: "🗣", label: "Speaking confidence", value: "speaking" },
  { emoji: "💼", label: "Work / Business", value: "work_business" },
  { emoji: "🎓", label: "Exams (IELTS, NMT…)", value: "exams" },
  { emoji: "✈️", label: "Travel", value: "travel" },
  { emoji: "🏠", label: "Everyday life", value: "everyday_life" },
  { emoji: "✨", label: "Other", value: "other" },
] as const;

export const INSTAGRAM_URL = "https://www.instagram.com/teti_push_english";

export type TrialFormValues = {
  firstname: string;
  email: string;
  level: string; // a LEVELS value, or "" when not chosen
  goals: string[]; // GOALS values
  messenger: string;
  message: string;
};

export const EMPTY_VALUES: TrialFormValues = {
  firstname: "",
  email: "",
  level: "",
  goals: [],
  messenger: "",
  message: "",
};
```

- [ ] **Step 3: Write the failing test `src/shared/trialForm/validate.test.ts`**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { EMPTY_VALUES } from "./options.ts";
import { validateTrialForm } from "./validate.ts";

test("an empty form needs a name and an email", () => {
  assert.deepEqual(validateTrialForm(EMPTY_VALUES), {
    firstname: "Please enter your name",
    email: "Please enter your email",
  });
});

test("a name made of spaces counts as empty", () => {
  const errors = validateTrialForm({ ...EMPTY_VALUES, firstname: "   ", email: "a@b.co" });
  assert.deepEqual(errors, { firstname: "Please enter your name" });
});

test("an email without a domain is invalid", () => {
  const errors = validateTrialForm({ ...EMPTY_VALUES, firstname: "Anna", email: "anna@gmail" });
  assert.deepEqual(errors, { email: "Please enter a valid email" });
});

test("a filled form has no errors, even with spaces around the email", () => {
  const errors = validateTrialForm({ ...EMPTY_VALUES, firstname: "Anna", email: "  anna@gmail.com " });
  assert.deepEqual(errors, {});
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '.../validate.ts'` (ERR_MODULE_NOT_FOUND).

- [ ] **Step 5: Create `src/shared/trialForm/validate.ts`**

```ts
import type { TrialFormValues } from "./options.ts";

export type TrialFormErrors = Partial<Record<"firstname" | "email", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Only name and email are required; everything else is optional.
export function validateTrialForm(values: TrialFormValues): TrialFormErrors {
  const errors: TrialFormErrors = {};
  if (!values.firstname.trim()) errors.firstname = "Please enter your name";
  const email = values.email.trim();
  if (!email) errors.email = "Please enter your email";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email";
  return errors;
}
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test`
Expected: `# pass 4`, `# fail 0` (an `ExperimentalWarning` about type stripping is fine).

- [ ] **Step 7: Type-check**

Run: `npx tsc -p tsconfig.app.json --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 8: Commit**

```bash
git add package.json src/shared/trialForm/options.ts src/shared/trialForm/validate.ts src/shared/trialForm/validate.test.ts
git commit -m "Trial form: option lists, validation and a node test script"
```

---

### Task 3: HubSpot payload and submission

**Files:**
- Create: `src/shared/trialForm/hubspot.ts`
- Test: `src/shared/trialForm/hubspot.test.ts`

If Task 1 found that only the EU host works, use `https://api-eu1.hsforms.com` in `SUBMIT_URL` below instead of `https://api.hsforms.com`.

- [ ] **Step 1: Write the failing test `src/shared/trialForm/hubspot.test.ts`**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { EMPTY_VALUES } from "./options.ts";
import { buildSubmission, readHutk } from "./hubspot.ts";

const page = { pageUri: "https://app.englishpusher.in.ua/#trial-lesson", pageName: "Englishpusher App" };

test("readHutk finds the hubspotutk cookie among others", () => {
  assert.equal(readHutk("_ga=GA1.1.5; hubspotutk=abc123; __hssc=1"), "abc123");
  assert.equal(readHutk("hubspotutk=first"), "first");
});

test("readHutk returns undefined when the cookie is missing", () => {
  assert.equal(readHutk("_ga=GA1.1.5; xhubspotutk=nope"), undefined);
  assert.equal(readHutk(""), undefined);
});

test("buildSubmission sends every filled field, trimmed, goals joined with ;", () => {
  const body = buildSubmission(
    {
      firstname: " Anna ",
      email: "anna@gmail.com ",
      level: "B1 – Intermediate",
      goals: ["speaking", "travel"],
      messenger: " @anna ",
      message: "Evenings, please",
    },
    { ...page, hutk: "abc123" },
  );
  assert.deepEqual(body, {
    fields: [
      { objectTypeId: "0-1", name: "firstname", value: "Anna" },
      { objectTypeId: "0-1", name: "email", value: "anna@gmail.com" },
      { objectTypeId: "0-1", name: "english_level", value: "B1 – Intermediate" },
      { objectTypeId: "0-1", name: "learning_goals", value: "speaking;travel" },
      { objectTypeId: "0-1", name: "messenger_contact", value: "@anna" },
      { objectTypeId: "0-1", name: "message", value: "Evenings, please" },
    ],
    context: { ...page, hutk: "abc123" },
  });
});

test("buildSubmission leaves out empty optional fields and a missing hutk", () => {
  const body = buildSubmission({ ...EMPTY_VALUES, firstname: "Anna", email: "anna@gmail.com", message: "  " }, page);
  assert.deepEqual(body, {
    fields: [
      { objectTypeId: "0-1", name: "firstname", value: "Anna" },
      { objectTypeId: "0-1", name: "email", value: "anna@gmail.com" },
    ],
    context: page,
  });
  assert.equal("hutk" in body.context, false);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '.../hubspot.ts'`.

- [ ] **Step 3: Create `src/shared/trialForm/hubspot.ts`**

```ts
import type { TrialFormValues } from "./options.ts";

// ---------------------------------------------------------------------------
// Sends the trial form to the HubSpot "Trial lesson request" form through
// HubSpot's public submission API (no key needed). The hubspotutk cookie,
// set by the HubSpot tracking code that GTM loads, links the submission to
// the visitor's history (UTM, referrer).
// ---------------------------------------------------------------------------

const PORTAL_ID = "149535757";
const FORM_ID = "2226dfee-47d4-406f-ae1a-2e8c0952dec2";
export const SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

export type SubmitContext = { hutk?: string; pageUri: string; pageName: string };

type Field = { objectTypeId: "0-1"; name: string; value: string };

export function readHutk(cookie: string): string | undefined {
  const match = cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

// HubSpot property name -> value. Empty optional fields are not sent.
export function buildSubmission(values: TrialFormValues, context: SubmitContext) {
  const pairs: [string, string][] = [
    ["firstname", values.firstname.trim()],
    ["email", values.email.trim()],
    ["english_level", values.level],
    ["learning_goals", values.goals.join(";")],
    ["messenger_contact", values.messenger.trim()],
    ["message", values.message.trim()],
  ];
  const fields: Field[] = pairs
    .filter(([, value]) => value !== "")
    .map(([name, value]) => ({ objectTypeId: "0-1", name, value }));
  const ctx: SubmitContext = { pageUri: context.pageUri, pageName: context.pageName };
  if (context.hutk) ctx.hutk = context.hutk;
  return { fields, context: ctx };
}

export async function submitTrialForm(values: TrialFormValues): Promise<void> {
  const body = buildSubmission(values, {
    hutk: readHutk(document.cookie),
    pageUri: window.location.href,
    pageName: document.title,
  });
  const res = await fetch(SUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HubSpot submission failed: ${res.status}`);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: `# pass 8`, `# fail 0`.

- [ ] **Step 5: Type-check**

Run: `npx tsc -p tsconfig.app.json --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 6: Commit**

```bash
git add src/shared/trialForm/hubspot.ts src/shared/trialForm/hubspot.test.ts
git commit -m "Trial form: HubSpot submission payload and sender"
```

---

### Task 4: Avatar image

**Files:**
- Create: `src/assets/teacher-trial.png`

- [ ] **Step 1: Resize the avatar to 256 px wide (keeps transparency)**

`sharp` is already a dev dependency.

```bash
node -e "require('sharp')('D:/brain/raw/assets/2026-10-24-Personal-TrialFormAvatar.png').resize({ width: 256 }).png({ compressionLevel: 9 }).toFile('src/assets/teacher-trial.png').then(i => console.log(i.width, i.height, i.size))"
```

Expected: prints `256 241 <size>` with size well under 150000 bytes.

- [ ] **Step 2: Commit**

```bash
git add src/assets/teacher-trial.png
git commit -m "Trial form: waving teacher avatar"
```

---

### Task 5: The form UI

**Files:**
- Create: `src/shared/trialForm/TrialForm.tsx`

- [ ] **Step 1: Create `src/shared/trialForm/TrialForm.tsx`**

Layout notes: the avatar is absolutely positioned against the modal card (the card has `relative`, Task 6), so it sticks out above the card's top edge. The honeypot field sits off-screen; real people never see or tab into it.

```tsx
import { useState, type FormEvent, type ReactNode } from "react";
import confetti from "canvas-confetti";
import { Loader2 } from "lucide-react";
import teacherTrial from "../../assets/teacher-trial.png";
import teacherCelebrate from "../../assets/teacher-celebrate.png";
import { EMPTY_VALUES, GOALS, INSTAGRAM_URL, LEVELS, type TrialFormValues } from "./options.ts";
import { validateTrialForm, type TrialFormErrors } from "./validate.ts";
import { submitTrialForm } from "./hubspot.ts";

// ---------------------------------------------------------------------------
// TrialForm — the "Book a trial lesson" form inside the TrialLessonForm modal.
// Name and email are required; level, goals, messenger and message are
// optional. On success it fires the GA4 `generate_lead` event via GTM.
// ---------------------------------------------------------------------------

type Status = "idle" | "sending" | "error" | "done";

const labelClass = "text-sm font-semibold text-neutral-800";

const inputClass = [
  "w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-[15px] text-neutral-900",
  "placeholder:text-neutral-400 transition-colors",
  "focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20",
].join(" ");

const pillClass = (active: boolean) =>
  [
    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
    active
      ? "border-brand bg-brand text-white shadow-sm"
      : "border-neutral-200 bg-white text-neutral-600 hover:border-brand/50 hover:text-brand",
  ].join(" ");

function pushEvent(data: Record<string, unknown>) {
  (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push(data);
}

function Field({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {required && <span className="text-brand"> *</span>}
        {hint && <span className="font-normal text-neutral-400"> {hint}</span>}
      </label>
      {children}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

export default function TrialForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [values, setValues] = useState<TrialFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<TrialFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  const set = <K extends keyof TrialFormValues>(key: K, value: TrialFormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleGoal = (goal: string) =>
    set("goals", values.goals.includes(goal) ? values.goals.filter((g) => g !== goal) : [...values.goals, goal]);

  const finish = () => {
    setStatus("done");
    onSuccess();
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 }, colors: ["#f07c1a", "#fbbf24", "#60a5fa"] });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const found = validateTrialForm(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (honeypot) {
      finish(); // a bot filled the hidden field: pretend it worked, send nothing
      return;
    }
    setStatus("sending");
    try {
      await submitTrialForm(values);
      pushEvent({ event: "generate_lead", form_name: "trial_lesson" });
      finish();
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <img src={teacherCelebrate} alt="" className="h-40 w-auto select-none" draggable={false} />
        <h2 className="font-display text-2xl font-bold text-neutral-900">
          Thank you, {values.firstname.trim()}! 🎉
        </h2>
        <p className="text-[15px] text-neutral-600">I'll contact you soon.</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand/90"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 font-body">
      {/* Header: avatar sticks out above the card's top edge */}
      <div className="flex flex-col items-center pt-12 text-center">
        <img
          src={teacherTrial}
          alt="Tutor Tetiana waving"
          className="pointer-events-none absolute -top-14 left-1/2 h-28 w-auto -translate-x-1/2 select-none drop-shadow-md"
          draggable={false}
        />
        <h2 className="font-display text-2xl font-bold leading-tight text-neutral-900">
          Book a trial lesson with Tetiana
        </h2>
        <p className="mt-1.5 text-[15px] text-neutral-600">
          Tell me a little about yourself and I'll get back to you soon.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" htmlFor="tf-firstname" required error={errors.firstname}>
          <input
            id="tf-firstname"
            name="firstname"
            autoComplete="given-name"
            value={values.firstname}
            onChange={(e) => set("firstname", e.target.value)}
            aria-invalid={!!errors.firstname}
            className={inputClass}
          />
        </Field>
        <Field label="Email" htmlFor="tf-email" required error={errors.email}>
          <input
            id="tf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            className={inputClass}
          />
        </Field>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className={labelClass}>Your English level</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {LEVELS.map((level) => {
            const active = values.level === level.value;
            return (
              <button
                key={level.value}
                type="button"
                aria-pressed={active}
                onClick={() => set("level", active ? "" : level.value)}
                className={pillClass(active)}
              >
                {level.short}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className={labelClass}>
          What's your goal? <span className="font-normal text-neutral-400">(choose any)</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {GOALS.map((goal) => {
            const active = values.goals.includes(goal.value);
            return (
              <button
                key={goal.value}
                type="button"
                aria-pressed={active}
                onClick={() => toggleGoal(goal.value)}
                className={pillClass(active)}
              >
                <span aria-hidden="true">{goal.emoji}</span> {goal.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field label="Telegram, Viber or phone" htmlFor="tf-messenger" hint="(optional)">
        <input
          id="tf-messenger"
          name="messenger"
          autoComplete="tel"
          placeholder="@username or +380…"
          value={values.messenger}
          onChange={(e) => set("messenger", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Message" htmlFor="tf-message" hint="(optional)">
        <textarea
          id="tf-message"
          name="message"
          rows={3}
          placeholder="Anything I should know? Preferred time, topics…"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </Field>

      {/* Honeypot: hidden from people, bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong. Please try again or write to me on{" "}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
            Instagram
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={[
          "flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3",
          "text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-brand/90 disabled:opacity-70",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        ].join(" ")}
      >
        {status === "sending" && <Loader2 size={18} className="animate-spin" />}
        Book a trial lesson
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc -p tsconfig.app.json --noEmit`
Expected: no output, exit code 0. (`TrialForm` is not imported anywhere yet; that is fine — Task 6 wires it in.)

- [ ] **Step 3: Commit**

```bash
git add src/shared/trialForm/TrialForm.tsx
git commit -m "Trial form: branded form UI with success and error states"
```

---

### Task 6: Wire the form into the modal

**Files:**
- Modify: `src/shared/TrialLessonForm.tsx` (replace the whole file)

What changes: the HubSpot embed script, the `hs-form-frame` div and the `hs-form-event:on-submission:success` listener go away. The backdrop now scrolls (not the card), so the avatar can stick out above the card without being clipped. After a successful send, closing the modal remounts the form empty.

- [ ] **Step 1: Replace `src/shared/TrialLessonForm.tsx` with:**

```tsx
import { useEffect, useState } from "react";
import { CalendarCheck, X } from "lucide-react";
import TrialForm from "./trialForm/TrialForm.tsx";

// ---------------------------------------------------------------------------
// TrialLessonForm — button that opens our own "Book a trial lesson" form in a
// modal. Submissions go to the HubSpot "Trial lesson request" form through
// HubSpot's public submission API (trialForm/hubspot.ts), so leads keep their
// original source (UTM / referrer) and the Leads Bot and n8n alert see them.
// A link ending in #trial-lesson opens the modal directly (for posts / bios).
// ---------------------------------------------------------------------------

const HASH = "#trial-lesson";

export default function TrialLessonForm({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  // The form is mounted on first open and then kept (only hidden), so a
  // half-filled form survives closing. After a successful send, closing
  // remounts it empty (new key).
  const [mounted, setMounted] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [sent, setSent] = useState(false);

  const openModal = () => {
    setMounted(true);
    setOpen(true);
    (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: "trial_form_open" });
  };

  const closeModal = () => {
    setOpen(false);
    if (sent) {
      setSent(false);
      setFormKey((k) => k + 1);
    }
  };

  // Deep link: app.englishpusher.in.ua/#trial-lesson opens the form
  useEffect(() => {
    if (window.location.hash === HASH) openModal();
  }, []);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, sent]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={[
          "inline-flex w-fit items-center gap-2 rounded-full bg-brand px-5 py-2.5",
          "text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand/90",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
          className,
        ].join(" ")}
      >
        <CalendarCheck size={16} />
        Book a trial lesson
      </button>

      {mounted && (
        <div
          className={`fixed inset-0 z-50 overflow-y-auto bg-black/50 ${open ? "block" : "hidden"}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Book a trial lesson"
        >
          <div className="flex min-h-full items-center justify-center px-4 pb-6 pt-20">
            <div
              className="relative w-full max-w-[520px] rounded-3xl bg-white px-5 pb-6 pt-4 shadow-xl sm:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="absolute right-3 top-3 rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
              >
                <X size={20} />
              </button>
              <TrialForm key={formKey} onClose={closeModal} onSuccess={() => setSent(true)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Confirm nothing else references the old embed**

Run: `git grep -n "hsforms.net\|hs-form-frame\|hs-form-event" -- src`
Expected: no output.

- [ ] **Step 3: Full build and tests**

Run: `npm test && npm run build`
Expected: tests `# pass 8`, `# fail 0`; build ends with `✓ built in …` and no TypeScript errors.

- [ ] **Step 4: Visual check in the dev server**

Run: `npm run dev` (background), open `http://localhost:5173/#trial-lesson`. Check at desktop width and at 375 px wide (DevTools device toolbar):
- the avatar overlaps the top edge of the card and is not clipped;
- First name and Email are side by side on desktop, stacked on phone;
- pills: clicking a level selects it, clicking it again clears it; goal chips toggle independently;
- pressing "Book a trial lesson" with an empty form shows "Please enter your name" and "Please enter your email" and sends nothing (DevTools Network: no request to `hsforms.com`);
- typing in a field clears its error;
- Esc, ✕ and a click on the dark backdrop close the modal; reopening shows the typed answers.

Do NOT submit a valid form here — the real submission happens in Task 8, after the HubSpot properties exist. Stop the dev server afterwards.

- [ ] **Step 5: Commit**

```bash
git add src/shared/TrialLessonForm.tsx
git commit -m "Trial form: replace the HubSpot iframe with the custom form"
```

---

### Task 7 (controller + Oleksandr): HubSpot properties and the n8n alert

Not for a subagent — it changes HubSpot and the live n8n workflow.

- [ ] **Step 1: Oleksandr creates the two contact properties (portal 149535757)**

Settings (gear) → Data Management → Properties → object "Contact" → **Create property**:

1. Label `Learning goals` · internal name `learning_goals` · group "Contact information" · field type **Multiple checkboxes** · options (label → internal value):
   `Speaking confidence` → `speaking`, `Work / Business` → `work_business`,
   `Exams (IELTS, NMT…)` → `exams`, `Travel` → `travel`, `Everyday life` → `everyday_life`,
   `Other` → `other`.
2. Label `Telegram, Viber or phone` · internal name `messenger_contact` · field type **Single-line text**.

Then Marketing → Forms → "Trial lesson request" → drag both properties into the form → **Update/Publish**.

- [ ] **Step 2: Controller verifies the form now lists the fields**

```bash
cd "/d/VIBE CODING/moodle-task-builder" && python - <<'EOF'
import json, urllib.request
from dotenv import dotenv_values
tok = dotenv_values(".env").get("HUBSPOT_LEADS_TOKEN")
req = urllib.request.Request("https://api.hubapi.com/marketing/v3/forms/2226dfee-47d4-406f-ae1a-2e8c0952dec2", headers={"Authorization": "Bearer " + tok})
f = json.load(urllib.request.urlopen(req))
print([fld["name"] for g in f["fieldGroups"] for fld in g["fields"]])
EOF
```

Expected: the list contains `firstname`, `english_level`, `email`, `message`, `learning_goals`, `messenger_contact`.

- [ ] **Step 3: Controller updates the n8n workflow `IiHBsWcPJhpBK32V` via the n8n MCP `update_workflow`**

Operations:
1. `setNodeParameter` on node `Get recently created/updated contacts`, path `/additionalFields/propertiesCollection/propertiesValues/properties`, value
   `["firstname","lastname","email","phone","createdate","english_level","learning_goals","messenger_contact"]`.
2. `setNodeParameter` on node `Send a text message`, path `/text`, value:

```
=🆕 <b>New trial lesson request</b>: {{ $json.properties.firstname?.value ?? '' }} {{ $json.properties.lastname?.value ?? '' }}
📧 {{ $json.properties.email?.value || $json['identity-profiles']?.[0]?.identities?.find(i => i.type === 'EMAIL')?.value || '—' }}
💬 {{ $json.properties.messenger_contact?.value || $json.properties.phone?.value || '—' }}
📊 Level: {{ $json.properties.english_level?.value || '—' }}
🎯 Goals: {{ ($json.properties.learning_goals?.value || '—').split(';').join(', ') }}
📍 {{ ($json['form-submissions'] || []).find(s => s['form-id'] === '2226dfee-47d4-406f-ae1a-2e8c0952dec2')?.['page-url'] || '—' }}
🔗 <a href="https://app-eu1.hubspot.com/contacts/149535757/record/0-1/{{ $json.vid }}">Open in HubSpot</a>
```

Expected: `appliedOperations: 2`, no validation warnings. (Goals show as internal values, e.g. `speaking, travel` — readable enough; no mapping needed.)

---

### Task 8 (controller + Oleksandr): End-to-end check, PR and release

- [ ] **Step 1: One real submission from the dev server**

`npm run dev`, open `http://localhost:5173/?utm_source=e2e-test#trial-lesson`, fill in: name `E2E Test`, a test email Oleksandr owns that is NOT already a HubSpot contact, level B1, goals Speaking + Travel, messenger `@e2e_test`, message `e2e check`. Submit.

Expected in the browser: confetti, "Thank you, E2E Test! 🎉"; DevTools Network shows the `hsforms.com` request with status 200; DevTools console `dataLayer.filter(e => e.event === "generate_lead")` has one entry with `form_name: "trial_lesson"`.

- [ ] **Step 2: Check HubSpot**

Open the new contact in HubSpot: First name, Email, English level `B1 – Intermediate`, Learning goals Speaking confidence + Travel, `Telegram, Viber or phone` = `@e2e_test`, Message; the "Trial lesson request" submission is on the timeline.

- [ ] **Step 3: Check the Telegram alert**

Run the n8n workflow once (MCP `execute_workflow`, manual) or wait for the 5-minute schedule if it is published. Expected: one Telegram message in @Englishpusher_leads_bot with level, goals and `@e2e_test`.

- [ ] **Step 4: Failure path**

In DevTools set Network to "Offline", reopen the form, fill name + email, submit. Expected: the red message with the Instagram link; answers still in the fields. Set Network back to "No throttling".

- [ ] **Step 5: Clean up**

Oleksandr deletes the `E2E Test` contact in HubSpot (the service key cannot delete contacts).

- [ ] **Step 6: Push and open the PR**

```bash
git push -u origin custom-trial-form
gh pr create --title "Custom branded trial lesson form" --body "Replaces the HubSpot iframe form with our own form (avatar, level pills, goal chips, messenger field). Posts to the same HubSpot form via the public submission API; generate_lead still fires. Spec: docs/superpowers/specs/2026-10-24-custom-trial-lesson-form-design.md"
```

Oleksandr merges the PR; GitHub Actions deploys. After the deploy, open `https://app.englishpusher.in.ua/#trial-lesson` and check that the form opens with the avatar (no submission needed).
