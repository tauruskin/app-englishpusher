// Hash routes for the teacher dashboard: #/<page>[/<id>][?days=7|30|90|all&source=bot]

export type Tab = "overview" | "students" | "topics";
export type Route =
  | { page: Tab }
  | { page: "student"; personId: string }
  | { page: "topic"; topicKey: string };

export interface Filters {
  days: number | null; // null = all time
  source: string | null; // null = every source
}

export const DEFAULT_FILTERS: Filters = { days: 30, source: null };
export const DAY_OPTIONS: (number | null)[] = [7, 30, 90, null];
const TABS: Tab[] = ["overview", "students", "topics"];

function parseFilters(params: URLSearchParams): Filters {
  const d = params.get("days");
  let days = DEFAULT_FILTERS.days;
  if (d === "all") days = null;
  else if (d !== null && DAY_OPTIONS.includes(Number(d))) days = Number(d);
  const s = params.get("source");
  const source = s !== null && /^[a-z]{1,20}$/.test(s) ? s : null;
  return { days, source };
}

export function parseHash(hash: string): { route: Route; filters: Filters } {
  const raw = hash.replace(/^#\/?/, "");
  const [path, query = ""] = raw.split("?");
  const parts = path.split("/").filter(Boolean);
  const filters = parseFilters(new URLSearchParams(query));
  let route: Route = { page: "overview" };
  if (TABS.includes(parts[0] as Tab)) route = { page: parts[0] as Tab };
  else if (parts[0] === "student" && parts[1]) route = { page: "student", personId: decodeURIComponent(parts[1]) };
  else if (parts[0] === "topic" && parts[1]) route = { page: "topic", topicKey: decodeURIComponent(parts[1]) };
  return { route, filters };
}

export function toHash(route: Route, filters: Filters): string {
  let path: string;
  if (route.page === "student") path = `student/${encodeURIComponent(route.personId)}`;
  else if (route.page === "topic") path = `topic/${encodeURIComponent(route.topicKey)}`;
  else path = route.page;
  const q = new URLSearchParams();
  if (filters.days !== DEFAULT_FILTERS.days) q.set("days", filters.days === null ? "all" : String(filters.days));
  if (filters.source) q.set("source", filters.source);
  const qs = q.toString();
  return `#/${path}${qs ? `?${qs}` : ""}`;
}
