export type HolydaysByMonth = Record<number, HolyDay[]>;
export type HolyDay = { type: HolydayType; day: number };
export type HolydayType = "national" | "regional" | "local" | "selected";

/** Days picked by the user, keyed by month (1-based). Persisted in localStorage. */
export type SelectedDaysByMonth = Record<number, number[]>;
/** Selected days keyed by year, then by month. */
export type SelectedDaysByYear = Record<number, SelectedDaysByMonth>;
