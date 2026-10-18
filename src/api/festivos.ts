import { HolydaysByMonth, HolydayType, YearHolydays } from "../model";

const FESTIVOS_URL = "https://festivos.io/v1";
// NOTE: Only Málaga (capital) is supported; 29067 is its INE municipality code
const MALAGA_INE_CODE = "29067";
const LEVELS = new Set<unknown>(["national", "regional", "local"]);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// NOTE: Only the fields the app reads. Full contract: https://festivos.io/v1/schema/municipio.json
interface FestivosHolyday {
  date: string; // YYYY-MM-DD
  level: Exclude<HolydayType, "selected">;
}

interface FestivosMunicipality {
  holidays: FestivosHolyday[];
  // Only present while the local holydays of the year are not published yet: `holidays` lacks them
  local_status?: "pending";
}

// NOTE: A YYYY-MM-DD date of the given year that exists: 2026-02-31 does not survive the round trip
const isDateOf = (date: string, year: number): boolean => {
  const time = Date.parse(`${date}T00:00:00Z`);
  return ISO_DATE.test(date) && date.startsWith(`${year}-`) && !Number.isNaN(time) && new Date(time).toISOString().startsWith(date);
};

const isFestivosHolyday = (value: unknown, year: number): value is FestivosHolyday => {
  const { date, level } = (value ?? {}) as Record<string, unknown>;
  return typeof date === "string" && isDateOf(date, year) && LEVELS.has(level);
};

// NOTE: A response the app cannot map is a failure, so it never shows wrong holydays
const isFestivosMunicipality = (value: unknown, year: number): value is FestivosMunicipality => {
  const { holidays } = (value ?? {}) as Record<string, unknown>;
  return Array.isArray(holidays) && holidays.every((holiday) => isFestivosHolyday(holiday, year));
};

// NOTE: Months and days start with 1, as in the ISO date
const toHolydaysByMonth = (holidays: FestivosHolyday[]): HolydaysByMonth =>
  holidays.reduce<HolydaysByMonth>((byMonth, { date, level }) => {
    const month = Number(date.slice(5, 7));
    const day = Number(date.slice(8, 10));
    byMonth[month] = (byMonth[month] ?? []).concat({ day, type: level });
    return byMonth;
  }, {});

/**
 * Fetches the fixed holydays of Málaga in the given year from festivos.io.
 * Resolves `null` when the year is not published yet (404) and rejects on any other failure.
 */
export const fetchHolydays = async (year: number, signal?: AbortSignal): Promise<YearHolydays | null> => {
  const response = await fetch(`${FESTIVOS_URL}/${year}/municipio/${MALAGA_INE_CODE}.json`, { signal });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`festivos.io answered ${response.status} to the ${year} holydays`);

  const body: unknown = await response.json();
  if (!isFestivosMunicipality(body, year)) throw new Error(`festivos.io sent the ${year} holydays in an unexpected format`);

  return { holydaysMap: toHolydaysByMonth(body.holidays), localPending: body.local_status === "pending" };
};
