import { HolydaysByMonth, HolydayType, YearHolydays } from "../model";

const FESTIVOS_URL = "https://festivos.io/v1";
// NOTE: Only Málaga (capital) is supported; 29067 is its INE municipality code
const MALAGA_INE_CODE = "29067";

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

  const { holidays, local_status: localStatus }: FestivosMunicipality = await response.json();
  return { holydaysMap: toHolydaysByMonth(holidays), localPending: localStatus === "pending" };
};
