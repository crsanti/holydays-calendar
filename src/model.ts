export type Holyday = "national" | "regional" | "local";
export type HolydaysByMonth = Record<number, { type: Holyday; day: number }[]>;
