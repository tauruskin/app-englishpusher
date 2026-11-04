export type Route =
  | { page: "home" }
  | { page: "topics" }
  | { page: "activity" }
  | { page: "topic"; topicKey: string };

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

// "#/" → Overview; "#/topics" → Topics tab; "#/activity" → Activity tab;
// "#/topic/<encoded key>" → one topic. Anything else → home.
export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#/, "").split("?")[0];
  const m = /^\/topic\/(.*?)\/*$/.exec(path); // a trailing "/" is not part of the key
  if (m) {
    const topicKey = safeDecode(m[1]);
    if (topicKey) return { page: "topic", topicKey };
  }
  if (/^\/topics\/*$/.test(path)) return { page: "topics" };
  if (/^\/activity\/*$/.test(path)) return { page: "activity" };
  return { page: "home" };
}

export function routeHash(r: Route): string {
  switch (r.page) {
    case "topic":
      return `#/topic/${encodeURIComponent(r.topicKey)}`;
    case "topics":
      return "#/topics";
    case "activity":
      return "#/activity";
    default:
      return "#/";
  }
}
