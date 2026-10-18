import { Dispatch, SetStateAction, useEffect, useState } from "react";

const readStoredValue = <T>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    // Corrupted JSON or storage unavailable (private mode, disabled): start from the fallback.
    return fallback;
  }
};

/**
 * `useState` backed by `localStorage`. Reads once on mount and writes on every change.
 * Values must be JSON-serializable.
 */
export const useLocalStorage = <T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => readStoredValue(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Quota exceeded or storage unavailable: keep the in-memory state and continue.
    }
  }, [key, value]);

  return [value, setValue];
};
