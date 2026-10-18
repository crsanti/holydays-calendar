import { useEffect, useState } from "react";
import { fetchHolydays } from "../api/festivos";
import { HolydaysState } from "../model";

const NOT_PUBLISHED: HolydaysState = { status: "not-published" };
const FAILED: HolydaysState = { status: "failed" };

/**
 * Fetches the fixed holydays of every given year from festivos.io; each year settles on its own.
 * A year is missing from the result until its request settles.
 * Pass a stable `years` array: a new one fetches every year again.
 */
export const useHolydays = (years: number[]): Record<number, HolydaysState> => {
  const [holydaysByYear, setHolydaysByYear] = useState<Record<number, HolydaysState>>({});

  useEffect(() => {
    const controller = new AbortController();
    // NOTE: Requests are aborted on unmount and on the StrictMode remount in development; their outcome is dropped
    const settle = (year: number, holydays: HolydaysState) => {
      if (!controller.signal.aborted) setHolydaysByYear((prev) => ({ ...prev, [year]: holydays }));
    };

    years.forEach(async (year) => {
      try {
        const holydays = await fetchHolydays(year, controller.signal);
        settle(year, holydays ? { status: "loaded", ...holydays } : NOT_PUBLISHED);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        settle(year, FAILED);
      }
    });

    return () => controller.abort();
  }, [years]);

  return holydaysByYear;
};
