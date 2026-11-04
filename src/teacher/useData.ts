import { useCallback, useEffect, useState } from "react";
import type { Result } from "./types.ts";

export interface DataState<T> {
  data: T | null;     // last good data of the SAME entity: kept while reloading, so the frame doesn't jump
  error: string | null;
  loading: boolean;
  retry: () => void;
}

interface Good<T> { entity: string; data: T }

// Data is only shown under the entity it was loaded for.
export function visibleData<T>(good: Good<T> | null, entity: string): T | null {
  return good !== null && good.entity === entity ? good.data : null;
}

/**
 * useData(load, key, entityKey?)
 *  - `key`: every input of `load` (entity + filters). Any change reloads; responses for an older key are ignored.
 *  - `entityKey`: WHICH thing is shown (e.g. `student:${id}`, `topic:${topicKey}`). Omit it for pages without
 *    an entity (overview, roster). While it stays the same (filter/period change) the previous data stays
 *    visible during the reload; when it changes the data is cleared, so entity B never shows entity A's numbers
 *    (not while loading, not next to B's error).
 */
export function useData<T>(load: () => Promise<Result<T>>, key: string, entityKey = ""): DataState<T> {
  const [good, setGood] = useState<Good<T> | null>(null);
  const [failure, setFailure] = useState<{ key: string; message: string } | null>(null);
  const [settledKey, setSettledKey] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    let current = true;
    setReloading(true);
    setFailure(null);
    load().then((r) => {
      if (!current) return;
      if (r.error === null) setGood({ entity: entityKey, data: r.data });
      else setFailure({ key, message: r.error });
      setSettledKey(key);
      setReloading(false);
    });
    return () => {
      current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` captures every input of `load`
  }, [key, nonce]);

  const retry = useCallback(() => setNonce((n) => n + 1), []);
  // Derived from `key`, so there is no render where the old key's error/loading state is shown for the new key.
  const error = failure !== null && failure.key === key ? failure.message : null;
  const loading = reloading || settledKey !== key;
  return { data: visibleData(good, entityKey), error, loading, retry };
}
