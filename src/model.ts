export type HolydaysByMonth = Record<number, HolyDay[]>;
export type HolyDay = { type: HolydayType; day: number };
export type HolydayType = "national" | "regional" | "local" | "selected";
