import { FC, useCallback, useEffect, useRef, useState } from "react";
import Attribution from "./components/Attribution";
import Toast from "./components/Toast";
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
  const [closedToastYears, setClosedToastYears] = useState<number[]>([]);
  // NOTE: Never below 0: while a year's holydays are unknown, its selected holydays count again and can overdraw the budget
  const remainingHolyDays = Math.max(0, HOLYDAYS_TO_PICK - countSelectedDays(selectedDays, DISPLAYED_YEARS, holydaysByYear));
  const failedYears = DISPLAYED_YEARS.filter(
    (year) => holydaysByYear[year]?.status === "failed" && !closedToastYears.includes(year),
  );

  // NOTE: `toggleDay` reads the holydays through a ref to keep its identity, so memo(Calendar) still skips renders
  const holydaysByYearRef = useRef(holydaysByYear);
  useEffect(() => {
    holydaysByYearRef.current = holydaysByYear;
  }, [holydaysByYear]);

  const toggleDay = useCallback(
    (year: number, month: number, day: number) => {
      setSelectedDays((prev) => {
        const daysInMonth = prev[year]?.[month] ?? [];
        const isSelected = daysInMonth.includes(day);
        const canTakeMoreDays = HOLYDAYS_TO_PICK - countSelectedDays(prev, DISPLAYED_YEARS, holydaysByYearRef.current) > 0;
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
      {failedYears.length > 0 && (
        <Toast onClose={() => setClosedToastYears((prev) => prev.concat(failedYears))}>
          Could not get the {failedYears.join(" and ")} holydays from festivos.io.
        </Toast>
      )}
    </>
  );
};

export default App;
