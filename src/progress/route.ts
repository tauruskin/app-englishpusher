export type Route = { page: "home" } | { page: "topic"; topicKey: string };

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

// "#/" → home; "#/topic/<encoded key>" → one topic. Anything else → home.
export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#/, "").split("?")[0];
  const m = /^\/topic\/(.+)$/.exec(path);
  if (m) {
    const topicKey = safeDecode(m[1]);
    if (topicKey) return { page: "topic", topicKey };
  }
  return { page: "home" };
}

export function routeHash(r: Route): string {
  return r.page === "topic" ? `#/topic/${encodeURIComponent(r.topicKey)}` : "#/";
}
