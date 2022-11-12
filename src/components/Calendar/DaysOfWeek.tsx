import { capitalize } from "lodash-es";
import { memo, FC } from "react";
import styled from "styled-components";
import { getDaysOfWeek } from "../../utils";
import Container from "./Grid";
import GridCell from "./GridCell";

const WeekDay = styled(GridCell)({
  fontWeight: 600,
});

const prettify = (weekDay: string) => capitalize(weekDay).replace(".", "");

const DaysOfWeek: FC = () => {
  return (
    <Container>
      {getDaysOfWeek("short").map((weekday) => (
        <WeekDay key={weekday}>{prettify(weekday)}</WeekDay>
      ))}
    </Container>
  );
};

export default memo(DaysOfWeek);
