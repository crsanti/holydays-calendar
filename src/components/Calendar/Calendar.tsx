import { memo, FC } from "react";
import styled from "styled-components";
import { HolyDay } from "../../model";
import { mergeHolydays } from "../../utils";
import DateGrid from "./DateGrid";
import DaysOfWeek from "./DaysOfWeek";
import MonthIndicator from "./MonthIndicator";

interface Props {
  holydays: HolyDay[];
  isFirstDayOfNextMonthHolyday: boolean;
  isLastDayOfPrevMonthHolyday: boolean;
  month: number;
  selectedDays: number[];
  year: number;
  onClickDay(month: number, day: number): void;
}

const Container = styled.div({
  maxWidth: "max-content",
  padding: 20,
});

const Calendar: FC<Props> = ({
  holydays,
  isFirstDayOfNextMonthHolyday,
  isLastDayOfPrevMonthHolyday,
  month,
  onClickDay,
  selectedDays,
  year,
}) => {
  return (
    <Container>
      <MonthIndicator month={month} />
      <DaysOfWeek />
      <DateGrid
        holydays={mergeHolydays(holydays, selectedDays)}
        isLastDayOfPrevMonthHolyday={isLastDayOfPrevMonthHolyday}
        isFirstDayOfNextMonthHolyday={isFirstDayOfNextMonthHolyday}
        month={month}
        onClickDay={onClickDay}
        year={year}
      />
    </Container>
  );
};

export default memo(Calendar);
