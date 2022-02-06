import styled from "styled-components";
import { DAYS_OF_WEEK } from "../../constants";

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: `repeat(${DAYS_OF_WEEK}, 1fr)`,
});

export default Grid;
