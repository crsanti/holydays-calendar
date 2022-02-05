export type HolydaysByMonth = Record<number, Day[]>;
export type Day = { type: HolydayType; day: number };
export type HolydayType = "national" | "regional" | "local" | "selected";
