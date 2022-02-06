import { groupBy } from "lodash-es";
import { VFC, useMemo } from "react";
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
  holydays: HolydaysByMonth;
  onClickDay(month: number, day: number): void;
}

const DateGrid: VFC<Props> = ({ month, year, holydays, onClickDay }) => {
  const prevMonthHolydays = holydays[month - 1];
  const nextMonthHolydays = holydays[month + 1];
  const thisMonthHolydays = holydays[month];
  const prevMonthHolydaysMap = useMemo(() => groupBy(prevMonthHolydays, "day"), [prevMonthHolydays]);
  const nextMonthHolydaysMap = useMemo(() => groupBy(nextMonthHolydays, "day"), [nextMonthHolydays]);
  const thisMonthHolydaysMap = useMemo(() => groupBy(thisMonthHolydays, "day"), [thisMonthHolydays]);

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
