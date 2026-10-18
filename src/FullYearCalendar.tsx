import { FC, useCallback } from "react";
import styled from "styled-components";
import Calendar from "./components/Calendar";
import Card from "./components/Card";
import DaysIndicator from "./components/DaysIndicator";
import Legend from "./components/Legend";
import { HOLYDAYS_TO_PICK, MONTHS_OF_YEAR } from "./constants";
import GlobalStyles from "./GlobalStyles";
import { HolydaysByMonth, HolydaysState, SelectedDaysByMonth } from "./model";
import { daysOf, isFixedHolyday } from "./utils";

// Theme https://mycolor.space/?hex=%237047EB&sub=1

const Main = styled(Card)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

const Notice = styled.div({
  padding: "0 15px 10px",
  fontSize: 13,
  lineHeight: "20px",
});

const NO_HOLYDAYS: HolydaysByMonth = {};
const EMPTY_HOLYDAYS: HolydaysByMonth[number] = [];
const EMPTY_SELECTED_DAYS: SelectedDaysByMonth[number] = [];

// NOTE: A notice gets its own line in the legend, a warning a ⚠️ next to the year.
// With neither, the year shows all its fixed holydays.
const getMessages = (holydays: HolydaysState, year: number): { notice?: string; warning?: string } => {
  switch (holydays.status) {
    case "loading":
      return { notice: `Loading the ${year} holydays…` };
    case "failed":
      return { warning: `Could not get the ${year} holydays from festivos.io. Reload the page to try again.` };
    case "not-published":
      return { warning: `festivos.io has not published the ${year} holydays yet.` };
    case "loaded":
      return holydays.localPending ? { warning: `festivos.io has not published the ${year} local holydays yet.` } : {};
  }
};

interface Props {
  remainingHolyDays: number;
  year: number;
  holydays: HolydaysState;
  selectedDays: SelectedDaysByMonth;
  onToggleDay(year: number, month: number, day: number): void;
  onResetDays(): void;
}

const FullYearCalendar: FC<Props> = ({ holydays, selectedDays, year, remainingHolyDays, onToggleDay, onResetDays }) => {
  const onClickDay = useCallback((month: number, day: number) => onToggleDay(year, month, day), [year, onToggleDay]);
  const holydaysMap = holydays.status === "loaded" ? holydays.holydaysMap : NO_HOLYDAYS;
  const { notice, warning } = getMessages(holydays, year);

  const isHolyday = (month: number, day: number) => isFixedHolyday(holydaysMap, month, day) || !!selectedDays[month]?.includes(day);

  return (
    <>
      <Legend>
        <DaysIndicator
          totalDays={HOLYDAYS_TO_PICK}
          remainingDays={remainingHolyDays}
          year={year}
          warning={warning}
          onReset={onResetDays}
        />
        {notice && <Notice>{notice}</Notice>}
      </Legend>
      <Main>
        <GlobalStyles />
        {/* NOTE: The days stay hidden while the holydays load, so none can be selected over a holyday */}
        {holydays.status !== "loading" &&
          Array.from({ length: MONTHS_OF_YEAR }, (_, index) => {
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
