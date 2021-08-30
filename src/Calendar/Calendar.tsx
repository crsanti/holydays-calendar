import { VFC, memo } from "react";
import styled from "styled-components";
import DateGrid from "./DateGrid";
import DaysOfWeek from "./DaysOfWeek";
import { HolydaysByMonth } from "../model";
import MonthIndicator from "./MonthIndicator";

interface Props {
  month: number;
  year: number;
  holydays: HolydaysByMonth[number];
  selectedDays: number[];
  onClickDay(month: number, day: number): void;
}

const Container = styled.div({
  maxWidth: "max-content",
  padding: 20,
});

const Calendar: VFC<Props> = ({ month, year, onClickDay, selectedDays, holydays }) => {
  return (
    <Container>
      <MonthIndicator month={month} />
      <DaysOfWeek />
      <DateGrid selectedDays={selectedDays} holydays={holydays} month={month} year={year} onClickDay={onClickDay} />
    </Container>
  );
};

export default memo(Calendar);
