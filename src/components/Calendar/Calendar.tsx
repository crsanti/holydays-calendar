import { memo, VFC } from "react";
import styled from "styled-components";
import { HolyDay } from "../../model";
import DateGrid from "./DateGrid";
import DaysOfWeek from "./DaysOfWeek";
import MonthIndicator from "./MonthIndicator";

interface Props {
  holydays: HolyDay[];
  isFirstDayOfNextMonthHolyday: boolean;
  isLastDayOfPrevMonthHolyday: boolean;
  month: number;
  year: number;
  onClickDay(month: number, day: number): void;
}

const Container = styled.div({
  maxWidth: "max-content",
  padding: 20,
});

const Calendar: VFC<Props> = ({
  holydays,
  isFirstDayOfNextMonthHolyday,
  isLastDayOfPrevMonthHolyday,
  month,
  onClickDay,
  year,
}) => {
  return (
    <Container>
      <MonthIndicator month={month} />
      <DaysOfWeek />
      <DateGrid
        holydays={holydays}
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
