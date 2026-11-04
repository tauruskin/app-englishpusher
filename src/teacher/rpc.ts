import { supabase, isSupabaseConfigured } from "../shared/supabase.ts";
import { friendlyError } from "./format.ts";
import type { Result } from "./types.ts";

// Dev server only: ?demo serves fixtures so a layout can be checked without signing in.
export const isDemo: boolean = import.meta.env.DEV && new URLSearchParams(window.location.search).has("demo");

export type RpcError = { code?: string; message?: string; status?: number };

// One Supabase RPC call. `demo` returns fixture data; callers pass null in production builds
// (see loadDemo in api.ts), so fixtures never reach the bundle. `errorText` turns an error into
// the sentence shown on the page.
export async function rpc<T>(
  fn: string,
  args: Record<string, unknown>,
  demo: (() => Promise<T>) | null,
  errorText: (e: RpcError) => string = friendlyError,
): Promise<Result<T>> {
  if (isDemo && demo) return { data: await demo(), error: null };
  if (!isSupabaseConfigured) return { data: null, error: "Analytics are not available right now." };
  // .rpc() sends POST: these functions may create the caller's person row on first use.
  try {
    const { data, error, status } = await supabase.rpc(fn, args);
    if (error) return { data: null, error: errorText({ code: error.code, message: error.message, status }) };
    if (data === null || data === undefined) return { data: null, error: errorText({}) };
    return { data: data as T, error: null };
  } catch (e) {
    return { data: null, error: errorText({ message: e instanceof Error ? e.message : undefined }) };
  }
}
