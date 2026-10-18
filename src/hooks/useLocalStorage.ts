import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

interface StoredState<T> {
  value: T;
  // `false` once the value was removed: the key is deleted instead of written.
  persisted: boolean;
}

const readStoredState = <T>(key: string, fallback: T): StoredState<T> => {
  try {
    const raw = window.localStorage.getItem(key);
    // Nothing stored: do not write the fallback until the first change.
    return raw === null ? { value: fallback, persisted: false } : { value: JSON.parse(raw) as T, persisted: true };
  } catch {
    // Corrupted JSON or storage unavailable (private mode, disabled): start from the fallback.
    return { value: fallback, persisted: false };
  }
};

/**
 * `useState` backed by `localStorage`. Reads once on mount and writes on every change (not on mount).
 * The third element removes the key and resets the value to `initialValue`; the next change writes it again.
 * Values must be JSON-serializable. Pass a stable `initialValue` so `remove` keeps its identity.
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, () => void] => {
  const [state, setState] = useState<StoredState<T>>(() => readStoredState(key, initialValue));

  useEffect(() => {
    try {
      if (state.persisted) {
        window.localStorage.setItem(key, JSON.stringify(state.value));
      } else {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Quota exceeded or storage unavailable: keep the in-memory state and continue.
    }
  }, [key, state]);

  const setValue: Dispatch<SetStateAction<T>> = useCallback((action) => {
    setState((prev) => {
      const value = typeof action === "function" ? (action as (prevValue: T) => T)(prev.value) : action;
      // Same value and already persisted: keep the same state so React skips the render.
      return value === prev.value && prev.persisted ? prev : { value, persisted: true };
    });
  }, []);

  const remove = useCallback(() => setState({ value: initialValue, persisted: false }), [initialValue]);

  return [state.value, setValue, remove];
};
