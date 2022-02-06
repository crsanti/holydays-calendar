import { useCallback, useState, VFC } from "react";
import styled from "styled-components";
import Calendar from "./components/Calendar";
import Card from "./components/Card";
import DaysIndicator from "./components/DaysIndicator";
import Legend from "./components/Legend";
import { HOLYDAYS_TO_PICK, MONTHS_OF_YEAR } from "./constants";
import GlobalStyles from "./GlobalStyles";
import { HolydaysByMonth } from "./model";
import { daysOf } from "./utils";

// Theme https://mycolor.space/?hex=%237047EB&sub=1

// NOTE: Months starting with 1, days starting with 1
const HOLYDAYS: HolydaysByMonth = {
  1: [
    { day: 1, type: "national" },
    { day: 6, type: "national" },
  ],
  2: [{ day: 28, type: "regional" }],
  4: [
    { day: 14, type: "regional" },
    { day: 15, type: "national" },
  ],
  5: [{ day: 2, type: "regional" }],
  8: [
    { day: 15, type: "regional" },
    { day: 19, type: "local" },
  ],
  9: [{ day: 8, type: "local" }],
  10: [{ day: 12, type: "national" }],
  11: [{ day: 1, type: "national" }],
  12: [
    { day: 6, type: "national" },
    { day: 8, type: "national" },
    { day: 26, type: "national" },
  ],
};

const Main = styled(Card)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

interface State {
  total: number;
  holydays: HolydaysByMonth;
}

const EMPTY_HOLYDAYS: HolydaysByMonth[number] = [];

const App: VFC = () => {
  const [{ total, holydays }, setSelectedDays] = useState<State>({ holydays: HOLYDAYS, total: 0 });
  const onClickDay = useCallback(
    (month: number, day: number) => {
      setSelectedDays((state) => {
        const reachedLimit = state.total + 1 > HOLYDAYS_TO_PICK;
        const holydaysMonth = state.holydays[month];

        if (!holydaysMonth) {
          return reachedLimit
            ? state
            : { holydays: { ...state.holydays, [month]: [{ type: "selected", day }] }, total: state.total + 1 };
        } else if (holydaysMonth.find((holyday) => holyday.day === day)) {
          return {
            holydays: { ...state.holydays, [month]: holydaysMonth.filter((h) => h.day !== day) },
            total: state.total - 1,
          };
        } else {
          return reachedLimit
            ? state
            : {
                holydays: { ...state.holydays, [month]: [...holydaysMonth, { type: "selected", day }] },
                total: state.total + 1,
              };
        }
      });
    },
    [setSelectedDays],
  );
  const year = new Date().getUTCFullYear();
  return (
    <>
      <Legend>
        <DaysIndicator totalDays={HOLYDAYS_TO_PICK} remainingDays={HOLYDAYS_TO_PICK - total} />
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

export default App;
