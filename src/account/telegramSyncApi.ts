import { rpc } from "../teacher/rpc.ts";
import { linkError, parseLinkCode, type LinkCode } from "./telegramSync.ts";

// Asks the database for a one-time Quiz Bot link (valid 15 minutes) for the signed-in student.
export async function createLinkCode(): Promise<LinkCode> {
  const r = await rpc<unknown>("analytics_create_link_code", {}, null, linkError);
  return r.error !== null ? { kind: "error", message: r.error } : parseLinkCode(r.data);
}
