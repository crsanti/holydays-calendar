import { isDate } from "lodash-es";

type DateArg = NonNullable<Parameters<Intl.DateTimeFormat["format"]>[0]>;
export const formatDate = (date: DateArg, options: Intl.DateTimeFormatOptions) => {
  const { format } = new Intl.DateTimeFormat(navigator.language, options);
  return format(isDate(date) ? date : new Date(date));
};

export const daysOf = (month: number, year: number): number => {
  return new Date(Date.UTC(year, month + 1, 0)).getDate();
};

export const getWeekDay = (year: number, month: number, day: number): number => {
  const weekday = new Date(Date.UTC(year, month, day)).getUTCDay() - 1;
  return weekday < 0 ? 6 : weekday;
};

export const isWeekend = (year: number, month: number, day: number) => {
  return getWeekDay(year, month, day) > 4;
};
