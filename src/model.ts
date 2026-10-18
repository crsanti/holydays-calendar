export type HolydaysByMonth = Record<number, HolyDay[]>;
export type HolyDay = { type: HolydayType; day: number };
export type HolydayType = "national" | "regional" | "local" | "selected";

/** Fixed holydays of a year. `localPending`: its local holydays are not published yet, so `holydaysMap` lacks them. */
export type YearHolydays = { holydaysMap: HolydaysByMonth; localPending: boolean };
/** Fixed holydays of a year while they load from festivos.io. */
export type HolydaysState =
  | { status: "loading" }
  | ({ status: "loaded" } & YearHolydays)
  | { status: "not-published" }
  | { status: "failed" };
/** Fixed holydays keyed by year. */
export type HolydaysByYear = Record<number, HolydaysState>;

/** Days picked by the user, keyed by month (1-based). Persisted in localStorage. */
export type SelectedDaysByMonth = Record<number, number[]>;
/** Selected days keyed by year, then by month. */
export type SelectedDaysByYear = Record<number, SelectedDaysByMonth>;
