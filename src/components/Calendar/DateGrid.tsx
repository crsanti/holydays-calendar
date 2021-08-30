import { groupBy } from "lodash-es";
import { VFC } from "react";
import styled from "styled-components";
import { HolydaysByMonth } from "../../model";
import { daysOf, getWeekDay, isWeekend } from "../../utils";
import Day from "./Day";
import Grid from "./Grid";

interface ContainerProps {
  startColumn: number;
}

const Container = styled(Grid)<ContainerProps>(({ startColumn: gridColumn }) => ({
  "> :first-child": {
    gridColumn,
  },
}));

interface Props {
  month: number;
  year: number;
  selectedDays: number[];
  holydays: HolydaysByMonth[number];
  onClickDay(month: number, day: number): void;
}

const DateGrid: VFC<Props> = ({ month, year, holydays, selectedDays, onClickDay }) => {
  const holydaysMap = groupBy(holydays, "day");
  return (
    <Container startColumn={getWeekDay(year, month, 1) + 1}>
      {Array.from({ length: daysOf(month, year) }, (_, index) => {
        const day = index + 1;
        const holyday = holydaysMap[day]?.[0];
        const disabled = !!holyday || isWeekend(year, month, day);
        const isSelected = selectedDays.includes(day);

        return (
          <Day
            as="button"
            variant={isSelected ? "selected" : holyday?.type}
            onClick={() => onClickDay(month, day)}
            key={day}
            disabled={disabled}
          >
            {day}
          </Day>
        );
      })}
    </Container>
  );
};

export default DateGrid;
