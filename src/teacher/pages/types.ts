import type { Filters, Route } from "../route.ts";

export interface PageProps {
  filters: Filters;
  setFilters: (f: Filters) => void;
  go: (route: Route) => void;
  href: (route: Route) => string;
}
