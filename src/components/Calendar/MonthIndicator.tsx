import { capitalize as prettify } from "lodash-es";
import { VFC } from "react";
import styled from "styled-components";
import { formatDate } from "../../utils";

interface Props {
  month: number;
}

const Container = styled.div({
  textAlign: "center",
  fontWeight: 600,
  fontSize: 14,
});

const MonthIndicator: VFC<Props> = ({ month }) => {
  const date = formatDate(Date.UTC(1970, month, 1), { month: "long" });
  return <Container>{prettify(date)}</Container>;
};

export default MonthIndicator;
