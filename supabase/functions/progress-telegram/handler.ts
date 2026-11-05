// progress-telegram: the /progress/ page inside Telegram (plan 4). Pure request handling; index.ts wires
// Deno + Supabase. The initData check IS the authentication (deployed with verify_jwt off).
import { verifyInitData } from "./verify.ts";

export interface Deps {
  botToken: string | undefined;
  nowSeconds: () => number;
  allowedOrigins: readonly string[];
  personFor: (telegramId: string, name: string) => Promise<string>; // public.analytics_telegram_person
  student: (personId: string) => Promise<unknown>;                  // public.analytics_student
  topic: (personId: string, topicKey: string) => Promise<unknown>;  // public.analytics_student_topic
  log?: (message: string) => void;
}

export const ALLOWED_ORIGINS = [
  "https://app.englishpusher.in.ua",
  "http://localhost:5180", // dev server (see the app's resume notes)
  "http://localhost:5173",
] as const;

const MAX_INIT_DATA = 4096;
const MAX_TOPIC_KEY = 200;

function corsHeaders(origin: string | null, allowed: readonly string[]): Record<string, string> {
  const h: Record<string, string> = { Vary: "Origin" };
  if (origin && allowed.includes(origin)) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    h["Access-Control-Allow-Headers"] = "authorization, x-client-info, apikey, content-type";
    h["Access-Control-Max-Age"] = "86400";
  }
  return h;
}

function json(status: number, body: unknown, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export async function handle(req: Request, deps: Deps): Promise<Response> {
  const headers = corsHeaders(req.headers.get("Origin"), deps.allowedOrigins);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" }, headers);
  if (!deps.botToken) {
    deps.log?.("progress-telegram: QUIZ_BOT_TOKEN is not set");
    return json(500, { error: "not_configured" }, headers);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "bad_request" }, headers);
  }
  const { init_data: initData, topic_key: topicKey } =
    body !== null && typeof body === "object" ? (body as Record<string, unknown>) : {};
  if (typeof initData !== "string" || initData.length === 0 || initData.length > MAX_INIT_DATA) {
    return json(400, { error: "bad_request" }, headers);
  }
  if (topicKey !== undefined && (typeof topicKey !== "string" || topicKey.length === 0 || topicKey.length > MAX_TOPIC_KEY)) {
    return json(400, { error: "bad_request" }, headers);
  }

  const v = await verifyInitData(initData, deps.botToken, deps.nowSeconds());
  if (!v.ok) return json(401, { error: v.reason === "expired" ? "expired" : "invalid" }, headers);

  try {
    const person = await deps.personFor(String(v.user.id), v.user.first_name);
    const data = topicKey === undefined ? await deps.student(person) : await deps.topic(person, topicKey);
    return json(200, { data }, headers);
  } catch (e) {
    deps.log?.(`progress-telegram: ${e instanceof Error ? e.message : "rpc failed"}`);
    return json(500, { error: "server_error" }, headers);
  }
}
