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
  if (!match) return undefined;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
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

// AbortSignal.timeout is missing on iOS 15 and older; fall back to a controller.
function timeoutSignal(ms: number): AbortSignal | undefined {
  if (typeof AbortSignal !== "undefined" && "timeout" in AbortSignal) return AbortSignal.timeout(ms);
  if (typeof AbortController === "undefined") return undefined;
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
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
    signal: timeoutSignal(15000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`HubSpot submission failed: ${res.status} ${detail.slice(0, 300)}`);
  }
}
