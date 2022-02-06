import { groupBy } from "lodash-es";
import { VFC } from "react";
import styled from "styled-components";
import { DAYS_OF_WEEK } from "../../../constants";
import { HolyDay } from "../../../model";
import { daysOf, getWeekDay, isWeekend } from "../../../utils";
import Grid from "../Grid";
import { getPositionVariant } from "./DateGrid.utils";
import Day from "./Day";

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
  holydays: HolyDay[];
  isLastDayOfPrevMonthHolyday: boolean;
  isFirstDayOfNextMonthHolyday: boolean;
  onClickDay(month: number, day: number): void;
}

const DateGrid: VFC<Props> = ({
  month,
  year,
  holydays,
  isLastDayOfPrevMonthHolyday,
  isFirstDayOfNextMonthHolyday,
  onClickDay,
}) => {
  const thisMonthHolydaysMap = groupBy(holydays, "day");

  const daysOfMonth = daysOf(month, year);

  return (
    <Container startColumn={getWeekDay(year, month, 1) + 1}>
      {Array.from({ length: daysOfMonth }, (_, index) => {
        const day = index + 1;
        const holyday = thisMonthHolydaysMap[day]?.[0];
        const isPrevDayHolyday = !!(day === 1 ? isLastDayOfPrevMonthHolyday : thisMonthHolydaysMap[day - 1]?.[0]);
        const isNextDayHolyday = !!(day === daysOfMonth ? isFirstDayOfNextMonthHolyday : thisMonthHolydaysMap[day + 1]?.[0]);
        const isPrevWeekDayHolyday = !!thisMonthHolydaysMap[day - DAYS_OF_WEEK]?.[0];
        const isNextWeekDayHolyday = !!thisMonthHolydaysMap[day + DAYS_OF_WEEK]?.[0];
        const positionVariant =
          holyday && getPositionVariant(isPrevDayHolyday, isNextDayHolyday, isPrevWeekDayHolyday, isNextWeekDayHolyday);
        const disabled = (holyday && holyday.type !== "selected") || isWeekend(year, month, day);

        return (
          <Day
            as="button"
            holydayType={holyday?.type}
            onClick={() => onClickDay(month, day)}
            key={day}
            disabled={disabled}
            positionVariant={positionVariant}
          >
            {day}
          </Day>
        );
      })}
    </Container>
  );
};

export default DateGrid;
