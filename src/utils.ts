import { DAYS_OF_WEEK } from "./constants";

type DateArg = NonNullable<Parameters<Intl.DateTimeFormat["format"]>>[0];

export const formatDate = (date: DateArg, options: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat(navigator.language, options).format(date);
};

export const daysOf = (month: number, year: number): number => {
  // NOTE: The key for this to work is to get the `0` day (the last day of previous month)
  // If month is zero index based then we need to use `month + 1`
  return new Date(Date.UTC(year, month, 0)).getDate();
};

export const getWeekDay = (year: number, month: number, day: number): number => {
  // Note: months are zero index based for date constructors
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return (weekday + DAYS_OF_WEEK - 1) % DAYS_OF_WEEK;
};

export const isWeekend = (year: number, month: number, day: number) => {
  return getWeekDay(year, month, day) > 4;
};

export const getDaysOfWeek = (weekday: Intl.DateTimeFormatOptions["weekday"]): string[] => {
  const { format } = new Intl.DateTimeFormat(navigator.language, { weekday });
  return Array.from({ length: DAYS_OF_WEEK }, (_, index) => {
    // NOTE: Days are non zero based index
    const day = index + 1;
    // NOTE: 2021 February first week starts with `Monday`
    return format(Date.UTC(2021, 1, day));
  });
};
