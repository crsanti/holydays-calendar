import { VFC } from "react";
import styled from "styled-components";

const Container = styled.div({
  display: "inline-flex",
  justifyContent: "center",
});

const Block = styled.div({
  margin: "0 15px",
  fontSize: 13,
});

interface Props {
  remainingDays?: number;
  totalDays?: number;
}
const DaysIndicator: VFC<Props> = ({ totalDays = 23, remainingDays = 23 }) => {
  return (
    <Container>
      <Block>Total days: {totalDays}</Block>
      <Block>Remaining days: {remainingDays}</Block>
    </Container>
  );
};

export default DaysIndicator;
