import { FC, useCallback } from "react";
import styled from "styled-components";
import Calendar from "./components/Calendar";
import Card from "./components/Card";
import DaysIndicator from "./components/DaysIndicator";
import Legend from "./components/Legend";
import { HOLYDAYS_TO_PICK, MONTHS_OF_YEAR } from "./constants";
import GlobalStyles from "./GlobalStyles";
import { HolydaysByMonth, SelectedDaysByMonth } from "./model";
import { daysOf } from "./utils";

// Theme https://mycolor.space/?hex=%237047EB&sub=1

const Main = styled(Card)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

const EMPTY_HOLYDAYS: HolydaysByMonth[number] = [];
const EMPTY_SELECTED_DAYS: SelectedDaysByMonth[number] = [];

interface Props {
  remainingHolyDays: number;
  year: number;
  holydaysMap: HolydaysByMonth;
  selectedDays: SelectedDaysByMonth;
  onToggleDay(year: number, month: number, day: number): void;
  onResetDays(): void;
}

const FullYearCalendar: FC<Props> = ({ holydaysMap, selectedDays, year, remainingHolyDays, onToggleDay, onResetDays }) => {
  const onClickDay = useCallback((month: number, day: number) => onToggleDay(year, month, day), [year, onToggleDay]);

  const isHolyday = (month: number, day: number) =>
    !!holydaysMap[month]?.some((holyday) => holyday.day === day) || !!selectedDays[month]?.includes(day);

  return (
    <>
      <Legend>
        <DaysIndicator totalDays={HOLYDAYS_TO_PICK} remainingDays={remainingHolyDays} year={year} onReset={onResetDays} />
      </Legend>
      <Main>
        <GlobalStyles />
        {Array.from({ length: MONTHS_OF_YEAR }, (_, index) => {
          const month = index + 1;
          const daysOfPrevMonth = daysOf(index, year);
          return (
            <Calendar
              key={month}
              month={month}
              year={year}
              onClickDay={onClickDay}
              holydays={holydaysMap[month] ?? EMPTY_HOLYDAYS}
              selectedDays={selectedDays[month] ?? EMPTY_SELECTED_DAYS}
              isLastDayOfPrevMonthHolyday={isHolyday(month - 1, daysOfPrevMonth)}
              isFirstDayOfNextMonthHolyday={isHolyday(month + 1, 1)}
            />
          );
        })}
      </Main>
    </>
  );
};

export default FullYearCalendar;
