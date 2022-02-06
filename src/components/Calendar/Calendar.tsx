import { memo, VFC } from "react";
import styled from "styled-components";
import { HolyDay } from "../../model";
import DateGrid from "./DateGrid";
import DaysOfWeek from "./DaysOfWeek";
import MonthIndicator from "./MonthIndicator";

interface Props {
  month: number;
  year: number;
  thisMonthHolydays: HolyDay[];
  prevMonthHolydays: HolyDay[];
  nextMonthHolydays: HolyDay[];
  onClickDay(month: number, day: number): void;
}

const Container = styled.div({
  maxWidth: "max-content",
  padding: 20,
});

const Calendar: VFC<Props> = ({ month, year, onClickDay, thisMonthHolydays, prevMonthHolydays, nextMonthHolydays }) => {
  return (
    <Container>
      <MonthIndicator month={month} />
      <DaysOfWeek />
      <DateGrid
        thisMonthHolydays={thisMonthHolydays}
        prevMonthHolydays={prevMonthHolydays}
        nextMonthHolydays={nextMonthHolydays}
        month={month}
        year={year}
        onClickDay={onClickDay}
      />
    </Container>
  );
};

export default memo(Calendar);
