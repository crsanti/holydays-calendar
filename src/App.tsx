import { FC, useCallback } from "react";
import { HOLYDAYS_TO_PICK } from "./constants";
import FullYearCalendar from "./FullYearCalendar";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { HolydaysByMonth, SelectedDaysByYear } from "./model";
import { countSelectedDays } from "./utils";

const SELECTED_DAYS_STORAGE_KEY = "holydays-calendar:selected-days";

// NOTE: Months starting with 1, days starting with 1
const PREV_YEAR_HOLYDAYS: HolydaysByMonth = {
  1: [
    { day: 1, type: "national" },
    { day: 6, type: "national" },
  ],
  2: [{ day: 28, type: "regional" }],
  4: [
    { day: 17, type: "regional" },
    { day: 18, type: "national" },
  ],
  5: [{ day: 1, type: "national" }],
  8: [
    { day: 15, type: "regional" },
    { day: 19, type: "local" },
  ],
  9: [{ day: 8, type: "local" }],
  10: [{ day: 13, type: "regional" }],
  11: [{ day: 1, type: "national" }],
  12: [
    { day: 6, type: "national" },
    { day: 8, type: "national" },
    { day: 25, type: "national" },
  ],
};

const NEXT_YEAR_HOLYDAYS: HolydaysByMonth = {
  1: [
    { day: 1, type: "national" },
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
  9: [{ day: 9, type: "local" }],
  10: [{ day: 12, type: "national" }],
  11: [{ day: 1, type: "national" }],
  12: [
    { day: 6, type: "national" },
    { day: 8, type: "national" },
    { day: 25, type: "regional" },
  ],
};

const App: FC = () => {
  const [selectedDays, setSelectedDays] = useLocalStorage<SelectedDaysByYear>(SELECTED_DAYS_STORAGE_KEY, {});
  const remainingHolyDays = HOLYDAYS_TO_PICK - countSelectedDays(selectedDays);

  const toggleDay = useCallback(
    (year: number, month: number, day: number) => {
      setSelectedDays((prev) => {
        const daysInMonth = prev[year]?.[month] ?? [];
        const isSelected = daysInMonth.includes(day);
        const canTakeMoreDays = HOLYDAYS_TO_PICK - countSelectedDays(prev) > 0;
        if (!isSelected && !canTakeMoreDays) return prev;

        const nextDays = isSelected ? daysInMonth.filter((d) => d !== day) : [...daysInMonth, day];
        return { ...prev, [year]: { ...prev[year], [month]: nextDays } };
      });
    },
    [setSelectedDays]
  );

  return (
    <>
      <FullYearCalendar
        remainingHolyDays={remainingHolyDays}
        selectedDays={selectedDays[2025] ?? {}}
        onToggleDay={toggleDay}
        year={2025}
        holydaysMap={PREV_YEAR_HOLYDAYS}
      />
      <FullYearCalendar
        remainingHolyDays={remainingHolyDays}
        selectedDays={selectedDays[2026] ?? {}}
        onToggleDay={toggleDay}
        year={2026}
        holydaysMap={NEXT_YEAR_HOLYDAYS}
      />
    </>
  );
};

export default App;
