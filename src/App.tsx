import { useCallback, useState, VFC } from "react";
import styled from "styled-components";
import Calendar from "./components/Calendar";
import Card from "./components/Card";
import DaysIndicator from "./components/DaysIndicator/DaysIndicator";
import Legend from "./components/Legend";
import GlobalStyles from "./GlobalStyles";
import { HolydaysByMonth } from "./model";

// Theme https://mycolor.space/?hex=%237047EB&sub=1

// Months starting with 1, days starting with 1
export const HOLYDAYS: HolydaysByMonth = {
  1: [
    { day: 1, type: "national" },
    { day: 6, type: "national" },
  ],
  // TODO: Move to next day if holyday is Sunday
  // 2: [{ day: 28, type: "regional" }],
  3: [{ day: 1, type: "regional" }],
  4: [
    { day: 1, type: "regional" },
    { day: 2, type: "national" },
  ],
  5: [{ day: 1, type: "regional" }],
  8: [
    { day: 16, type: "regional" },
    { day: 19, type: "local" },
  ],
  9: [{ day: 8, type: "local" }],
  10: [{ day: 12, type: "national" }],
  11: [{ day: 1, type: "national" }],
  12: [
    { day: 6, type: "national" },
    { day: 8, type: "national" },
    { day: 25, type: "national" },
  ],
};

const Main = styled(Card)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

interface State {
  total: number;
  selectedDays: Record<number, number[]>;
}

const EMPTY_HOLYDAYS: HolydaysByMonth[number] = [];
const EMPTY_SELECTED_DAYS: number[] = [];

const TOTAL_HOLYDAYS_TO_PICK = 23;
const App: VFC = () => {
  const [{ total, selectedDays }, setSelectedDays] = useState<State>({ selectedDays: {}, total: 0 });
  const onClickDay = useCallback(
    (month: number, day: number) => {
      setSelectedDays((state) => {
        const reachedLimit = state.total + 1 > TOTAL_HOLYDAYS_TO_PICK;
        if (!(month in state.selectedDays)) {
          return reachedLimit
            ? state
            : { selectedDays: { ...state.selectedDays, [month]: [day] }, total: state.total + 1 };
        } else if (state.selectedDays[month].includes(day)) {
          return {
            selectedDays: { ...state.selectedDays, [month]: state.selectedDays[month].filter((d) => d !== day) },
            total: state.total - 1,
          };
        } else {
          return reachedLimit
            ? state
            : {
                selectedDays: { ...state.selectedDays, [month]: [...state.selectedDays[month], day] },
                total: state.total + 1,
              };
        }
      });
    },
    [setSelectedDays],
  );
  const year = new Date().getFullYear();
  return (
    <>
      <Legend>
        <DaysIndicator totalDays={TOTAL_HOLYDAYS_TO_PICK} remainingDays={TOTAL_HOLYDAYS_TO_PICK - total} />
      </Legend>
      <Main>
        <GlobalStyles />
        {Array.from({ length: 12 }, (_, month) => {
          return (
            <Calendar
              key={month}
              month={month}
              year={year}
              onClickDay={onClickDay}
              holydays={HOLYDAYS[month + 1] ?? EMPTY_HOLYDAYS}
              selectedDays={selectedDays[month] ?? EMPTY_SELECTED_DAYS}
            />
          );
        })}
      </Main>
    </>
  );
};

export default App;
