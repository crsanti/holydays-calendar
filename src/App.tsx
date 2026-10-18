import { FC, useCallback } from "react";
import Attribution from "./components/Attribution";
import { HOLYDAYS_TO_PICK } from "./constants";
import FullYearCalendar from "./FullYearCalendar";
import { useHolydays } from "./hooks/useHolydays";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { HolydaysState, SelectedDaysByYear } from "./model";
import { countSelectedDays } from "./utils";

const SELECTED_DAYS_STORAGE_KEY = "holydays-calendar:selected-days";
const NO_SELECTED_DAYS: SelectedDaysByYear = {};
const LOADING_HOLYDAYS: HolydaysState = { status: "loading" };

// NOTE: Only the current year and the next one are shown, and only their selected days consume the budget
const CURRENT_YEAR = new Date().getFullYear();
const DISPLAYED_YEARS = [CURRENT_YEAR, CURRENT_YEAR + 1];

const App: FC = () => {
  const [selectedDays, setSelectedDays, removeSelectedDays] = useLocalStorage(
    SELECTED_DAYS_STORAGE_KEY,
    NO_SELECTED_DAYS
  );
  const holydaysByYear = useHolydays(DISPLAYED_YEARS);
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
      {DISPLAYED_YEARS.map((year) => (
        <FullYearCalendar
          key={year}
          remainingHolyDays={remainingHolyDays}
          selectedDays={selectedDays[year] ?? {}}
          onToggleDay={toggleDay}
          onResetDays={resetDays}
          year={year}
          holydays={holydaysByYear[year] ?? LOADING_HOLYDAYS}
        />
      ))}
      <Attribution />
    </>
  );
};

export default App;
