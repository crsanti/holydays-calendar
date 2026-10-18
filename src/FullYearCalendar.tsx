import { FC, useMemo } from "react";
import styled from "styled-components";
import Calendar from "./components/Calendar";
import Card from "./components/Card";
import DaysIndicator from "./components/DaysIndicator";
import Legend from "./components/Legend";
import { HOLYDAYS_TO_PICK, MONTHS_OF_YEAR } from "./constants";
import GlobalStyles from "./GlobalStyles";
import { HolydaysByMonth, SelectedDaysByMonth } from "./model";
import { daysOf, mergeHolydays } from "./utils";

// Theme https://mycolor.space/?hex=%237047EB&sub=1

const Main = styled(Card)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

const EMPTY_HOLYDAYS: HolydaysByMonth[number] = [];

interface Props {
  remainingHolyDays: number;
  year: number;
  holydaysMap: HolydaysByMonth;
  selectedDays: SelectedDaysByMonth;
  onToggleDay(year: number, month: number, day: number): void;
}

const FullYearCalendar: FC<Props> = ({ holydaysMap, selectedDays, year, remainingHolyDays, onToggleDay }) => {
  const holydays = useMemo(() => mergeHolydays(holydaysMap, selectedDays), [holydaysMap, selectedDays]);

  const onClickDay = (month: number, day: number) => {
    const isFixedHolyday = holydaysMap[month]?.some((holyday) => holyday.day === day);
    if (isFixedHolyday) return;
    onToggleDay(year, month, day);
  };

  return (
    <>
      <Legend>
        <DaysIndicator totalDays={HOLYDAYS_TO_PICK} remainingDays={remainingHolyDays} year={year} />
      </Legend>
      <Main>
        <GlobalStyles />
        {Array.from({ length: MONTHS_OF_YEAR }, (_, index) => {
          const month = index + 1;
          const prevMonthHolydays = holydays[month - 1];
          const daysOfPrevMonth = daysOf(index, year);
          const nextMonthHolydays = holydays[month + 1];
          return (
            <Calendar
              key={month}
              month={month}
              year={year}
              onClickDay={onClickDay}
              holydays={holydays[month] ?? EMPTY_HOLYDAYS}
              isLastDayOfPrevMonthHolyday={!!prevMonthHolydays?.find(({ day }) => day === daysOfPrevMonth)}
              isFirstDayOfNextMonthHolyday={!!nextMonthHolydays?.find(({ day }) => day === 1)}
            />
          );
        })}
      </Main>
    </>
  );
};

export default FullYearCalendar;
