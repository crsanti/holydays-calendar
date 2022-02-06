import { groupBy } from "lodash-es";
import { VFC } from "react";
import styled from "styled-components";
import { HolyDay, HolydaysByMonth } from "../../model";
import { daysOf, getWeekDay, isWeekend } from "../../utils";
import Day, { PositionVariant } from "./Day";
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
  holydays: HolydaysByMonth[number];
  onClickDay(month: number, day: number): void;
}

const DateGrid: VFC<Props> = ({ month, year, holydays, onClickDay }) => {
  const holydaysMap = groupBy(holydays, "day");
  return (
    <Container startColumn={getWeekDay(year, month, 1) + 1}>
      {Array.from({ length: daysOf(month, year) }, (_, index) => {
        const day = index + 1;
        const holyday = holydaysMap[day]?.[0];
        const disabled = (holyday && holyday.type !== "selected") || isWeekend(year, month, day);

        const prevHolyday = holydaysMap[day - 1]?.[0];
        const nextHolyday = holydaysMap[day + 1]?.[0];

        const positionVariant = getPositionVariant(holyday, prevHolyday, nextHolyday);

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

type MaybeDay = HolyDay | undefined;
const getPositionVariant = (
  holyday: MaybeDay,
  prevHolyday: MaybeDay,
  nextHolyday: MaybeDay,
): PositionVariant | undefined => {
  let position: PositionVariant | undefined;
  if (!holyday || (!prevHolyday && !nextHolyday)) return position;
  if (!prevHolyday) return "first";
  if (!nextHolyday) return "last";
};

export default DateGrid;
