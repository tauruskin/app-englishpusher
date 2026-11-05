// Supabase Edge Function entry (Deno). Deploy with verify_jwt OFF: the page has no Supabase session;
// handler.ts authenticates the caller by Telegram's initData signature instead.
// Secrets: QUIZ_BOT_TOKEN (set by hand in Supabase → Edge Functions → Secrets).
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase.
import { createClient } from "npm:@supabase/supabase-js@2";
import { ALLOWED_ORIGINS, handle } from "./handler.ts";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function rpc(fn: string, args: Record<string, unknown>): Promise<unknown> {
  const { data, error } = await supabase.rpc(fn, args);
  if (error) throw new Error(`${fn}: ${error.code ?? ""} ${error.message}`);
  return data;
}

Deno.serve((req) =>
  handle(req, {
    botToken: Deno.env.get("QUIZ_BOT_TOKEN"),
    nowSeconds: () => Math.floor(Date.now() / 1000),
    allowedOrigins: ALLOWED_ORIGINS,
    personFor: async (telegramId, name) =>
      String(await rpc("analytics_telegram_person", { p_telegram_id: telegramId, p_name: name })),
    student: (personId) => rpc("analytics_student", { p_person: personId }),
    topic: (personId, topicKey) => rpc("analytics_student_topic", { p_topic_key: topicKey, p_person: personId }),
    log: (message) => console.error(message),
  }),
);
