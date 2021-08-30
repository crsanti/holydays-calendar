import { capitalize } from "lodash-es";
import { VFC } from "react";
import styled from "styled-components";
import { formatDate } from "../../utils";
import Container from "./Grid";
import GridCell from "./GridCell";

const WeekDay = styled(GridCell)({
  fontWeight: 600,
});

const prettify = (weekDay: string) => capitalize(weekDay).replace(".", "");

const DaysOfWeek: VFC = () => {
  return (
    <Container>
      {Array.from({ length: 7 }, (_, day) => {
        const weekday = formatDate(Date.UTC(2021, 5, day), { weekday: "short" });
        return <WeekDay key={weekday}>{prettify(weekday)}</WeekDay>;
      })}
    </Container>
  );
};

export default DaysOfWeek;
