import { friendlyError } from "../teacher/format.ts";
import type { RpcError } from "../teacher/rpc.ts";

// Same as the teacher wording, except the two cases a student can actually hit.
export function progressError(e: RpcError): string {
  if (e.code === "42501") return "Please sign in to see your progress.";
  if (e.code === "22023" || e.code === "22P02") return "That topic doesn't exist.";
  return friendlyError(e);
}
