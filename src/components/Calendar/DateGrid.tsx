import { groupBy } from "lodash-es";
import React, { VFC } from "react";
import styled from "styled-components";
import { Holyday, HolydaysByMonth } from "../../model";
import Grid from "./Grid";
import GridCell from "./GridCell";
import { daysOf, getWeekDay, isWeekend } from "../../utils";

interface ContainerProps {
  startColumn: number;
}

const Container = styled(Grid)<ContainerProps>(({ startColumn: gridColumn }) => ({
  "> :first-child": {
    gridColumn,
  },
}));

interface DayProps {
  variant?: "selected" | Holyday;
}

// const BORDER_RADIUS = 8;
const Day = styled(GridCell)<DayProps>(({ variant }) => ({
  border: 0,
  fontWeight: 600,
  lineHeight: "var(--line-height)",
  "&[data-variant]": {
    borderRadius: 0,
  },
  padding: 0,
  backgroundColor: "transparent",
  ...(variant === "selected"
    ? {
        cursor: "pointer",
        color: "var(--white)",
        backgroundColor: "var(--selected-day)",
        "&:hover": {
          // backgroundColor: "var(--disabled)",
          // color: "var(--blue)",
        },
      }
    : variant === "national"
    ? { color: "var(--white)", backgroundColor: "var(--national-holyday)" }
    : variant === "regional"
    ? { color: "var(--white)", backgroundColor: "var(--regional-holyday)" }
    : variant === "local"
    ? { color: "var(--white)", backgroundColor: "var(--local-holyday)" }
    : {
        fontWeight: 400,
        cursor: "pointer",
        "&:disabled": {
          color: "var(--medium-grey)",
          cursor: "default",
        },
        "&:not(:disabled):hover": {
          backgroundColor: "var(--disabled)",
          color: "var(--blue)",
        },
      }),
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
        const variant: DayProps["variant"] = isSelected ? "selected" : holyday?.type;

        return (
          <Day
            as="button"
            variant={variant}
            data-variant={variant}
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
