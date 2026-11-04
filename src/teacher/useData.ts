import { useCallback, useEffect, useState } from "react";
import type { Result } from "./types.ts";

export interface DataState<T> {
  data: T | null;     // last good data: kept while reloading, so the frame doesn't jump
  error: string | null;
  loading: boolean;
  retry: () => void;
}

// `key` changes → reload. Responses for an older key are ignored.
export function useData<T>(load: () => Promise<Result<T>>, key: string): DataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let current = true;
    setLoading(true);
    setError(null);
    load().then((r) => {
      if (!current) return;
      if (r.error === null) setData(r.data);
      else setError(r.error);
      setLoading(false);
    });
    return () => {
      current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` captures every input of `load`
  }, [key, nonce]);

  const retry = useCallback(() => setNonce((n) => n + 1), []);
  return { data, error, loading, retry };
}
