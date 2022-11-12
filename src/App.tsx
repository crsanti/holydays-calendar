import { FC, useCallback, useState } from "react";
import { HOLYDAYS_TO_PICK } from "./constants";
import FullYearCalendar from "./FullYearCalendar";
import { HolydaysByMonth } from "./model";

// NOTE: Months starting with 1, days starting with 1
const PREV_YEAR_HOLYDAYS: HolydaysByMonth = {
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

const NEXT_YEAR_HOLYDAYS: HolydaysByMonth = {
  1: [
    { day: 2, type: "national" },
    { day: 6, type: "national" },
  ],
  2: [{ day: 28, type: "regional" }],
  4: [
    { day: 6, type: "regional" },
    { day: 7, type: "national" },
  ],
  5: [{ day: 1, type: "regional" }],
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
    { day: 25, type: "national" },
  ],
};

const App: FC = () => {
  const [remainingHolyDays, setRemainingHolydays] = useState(HOLYDAYS_TO_PICK);

  const spendHolyDay = useCallback(() => {
    setRemainingHolydays((prev) => prev - 1);
  }, []);

  const freeHolyDay = useCallback(() => {
    setRemainingHolydays((prev) => prev + 1);
  }, []);

  return (
    <>
      <FullYearCalendar
        remainingHolyDays={remainingHolyDays}
        spendHolyDay={spendHolyDay}
        freeHolyDay={freeHolyDay}
        year={2022}
        holydaysMap={PREV_YEAR_HOLYDAYS}
      />
      <FullYearCalendar
        remainingHolyDays={remainingHolyDays}
        spendHolyDay={spendHolyDay}
        freeHolyDay={freeHolyDay}
        year={2023}
        holydaysMap={NEXT_YEAR_HOLYDAYS}
      />
    </>
  );
};

export default App;
