import { FC, useCallback, useState } from "react";
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

const Main = styled(Card)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

const EMPTY_HOLYDAYS: HolydaysByMonth[number] = [];

interface Props {
  remainingHolyDays: number;
  spendHolyDay(): void;
  freeHolyDay(): void;
  year: number;
  holydaysMap: HolydaysByMonth;
}

const FullYearCalendar: FC<Props> = ({ holydaysMap, year, remainingHolyDays, spendHolyDay, freeHolyDay }) => {
  const [holydays, setSelectedDays] = useState<HolydaysByMonth>(holydaysMap);

  const onClickDay = (month: number, day: number) => {
    const canTakeMoreDays = remainingHolyDays - 1 >= 0;
    const holydaysInMonth = holydays[month] ?? [];
    if (holydaysInMonth.find((holyday) => holyday.day === day)) {
      freeHolyDay();
      setSelectedDays({ ...holydays, [month]: holydaysInMonth.filter((h) => h.day !== day) });
    } else if (canTakeMoreDays) {
      spendHolyDay();
      setSelectedDays({
        ...holydays,
        [month]: [...holydaysInMonth, { type: "selected", day }],
      });
    }
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
