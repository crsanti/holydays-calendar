import { groupBy } from "lodash-es";
import { VFC } from "react";
import styled from "styled-components";
import { HolyDay } from "../../model";
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
  thisMonthHolydays: HolyDay[];
  prevMonthHolydays: HolyDay[];
  nextMonthHolydays: HolyDay[];
  onClickDay(month: number, day: number): void;
}

const DateGrid: VFC<Props> = ({ month, year, thisMonthHolydays, prevMonthHolydays, nextMonthHolydays, onClickDay }) => {
  const prevMonthHolydaysMap = groupBy(prevMonthHolydays, "day");
  const nextMonthHolydaysMap = groupBy(nextMonthHolydays, "day");
  const thisMonthHolydaysMap = groupBy(thisMonthHolydays, "day");

  const daysOfMonth = daysOf(month, year);

  return (
    <Container startColumn={getWeekDay(year, month, 1) + 1}>
      {Array.from({ length: daysOfMonth }, (_, index) => {
        const day = index + 1;
        const holyday = thisMonthHolydaysMap[day]?.[0];
        const prevHolyday = (day === 1 ? prevMonthHolydaysMap[daysOf(month - 1, year)] : thisMonthHolydaysMap[day - 1])?.[0];
        const nextHolyday = (day === daysOfMonth ? nextMonthHolydaysMap[1] : thisMonthHolydaysMap[day + 1])?.[0];
        const positionVariant = getPositionVariant(holyday, prevHolyday, nextHolyday);
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

type MaybeDay = HolyDay | undefined;
const getPositionVariant = (holyday: MaybeDay, prevHolyday: MaybeDay, nextHolyday: MaybeDay): PositionVariant | undefined => {
  let position: PositionVariant | undefined;
  if (!holyday || (!prevHolyday && !nextHolyday)) return position;
  if (!prevHolyday) return "first";
  if (!nextHolyday) return "last";
};

export default DateGrid;
