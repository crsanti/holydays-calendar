import { FC, useCallback } from "react";
import { HOLYDAYS_TO_PICK } from "./constants";
import FullYearCalendar from "./FullYearCalendar";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { HolydaysByMonth, SelectedDaysByYear } from "./model";
import { countSelectedDays } from "./utils";

const SELECTED_DAYS_STORAGE_KEY = "holydays-calendar:selected-days";
const NO_SELECTED_DAYS: SelectedDaysByYear = {};

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

// NOTE: Only these years are shown, and only their selected days consume the budget
const CALENDARS = [
  { year: 2025, holydaysMap: PREV_YEAR_HOLYDAYS },
  { year: 2026, holydaysMap: NEXT_YEAR_HOLYDAYS },
];
const DISPLAYED_YEARS = CALENDARS.map(({ year }) => year);

const App: FC = () => {
  const [selectedDays, setSelectedDays, removeSelectedDays] = useLocalStorage(
    SELECTED_DAYS_STORAGE_KEY,
    NO_SELECTED_DAYS
  );
  const remainingHolyDays = HOLYDAYS_TO_PICK - countSelectedDays(selectedDays, DISPLAYED_YEARS);

  const toggleDay = useCallback(
    (year: number, month: number, day: number) => {
      setSelectedDays((prev) => {
        const daysInMonth = prev[year]?.[month] ?? [];
        const isSelected = daysInMonth.includes(day);
        const canTakeMoreDays = HOLYDAYS_TO_PICK - countSelectedDays(prev, DISPLAYED_YEARS) > 0;
        if (!isSelected && !canTakeMoreDays) return prev;

        const nextDays = isSelected ? daysInMonth.filter((d) => d !== day) : [...daysInMonth, day];
        return { ...prev, [year]: { ...prev[year], [month]: nextDays } };
      });
    },
    [setSelectedDays]
  );

  const resetDays = useCallback(() => {
    if (window.confirm("Remove the selected vacation days of every year? This cannot be undone.")) {
      removeSelectedDays();
    }
  }, [removeSelectedDays]);

  return (
    <>
      {CALENDARS.map(({ year, holydaysMap }) => (
        <FullYearCalendar
          key={year}
          remainingHolyDays={remainingHolyDays}
          selectedDays={selectedDays[year] ?? {}}
          onToggleDay={toggleDay}
          onResetDays={resetDays}
          year={year}
          holydaysMap={holydaysMap}
        />
      ))}
    </>
  );
};

export default App;
