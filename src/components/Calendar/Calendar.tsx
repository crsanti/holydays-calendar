import { memo, VFC } from "react";
import styled from "styled-components";
import { HolydaysByMonth } from "../../model";
import DateGrid from "./DateGrid";
import DaysOfWeek from "./DaysOfWeek";
import MonthIndicator from "./MonthIndicator";

interface Props {
  month: number;
  year: number;
  holydays: HolydaysByMonth[number];
  onClickDay(month: number, day: number): void;
}

const Container = styled.div({
  maxWidth: "max-content",
  padding: 20,
});

const Calendar: VFC<Props> = ({ month, year, onClickDay, holydays }) => {
  return (
    <Container>
      <MonthIndicator month={month} />
      <DaysOfWeek />
      <DateGrid holydays={holydays} month={month} year={year} onClickDay={onClickDay} />
    </Container>
  );
};

export default memo(Calendar);
