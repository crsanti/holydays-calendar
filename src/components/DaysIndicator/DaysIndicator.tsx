import { FC } from "react";
import styled from "styled-components";

const Root = styled.div({
  display: "flex",
  justifyContent: "center",
  position: "relative",
});

const Block = styled.div({
  margin: "0 15px",
  fontSize: 13,
});

const Year = styled.div({
  fontSize: 16,
  marginLeft: "15px",
  fontWeight: "bold",
  position: "absolute",
  left: 0,
});

interface Props {
  remainingDays: number;
  totalDays: number;
  year: number;
}

const DaysIndicator: FC<Props> = ({ totalDays, remainingDays, year }) => {
  return (
    <Root>
      <Block>Total days: {totalDays}</Block>
      <Block>Remaining days: {remainingDays}</Block>
      <Year>{year}</Year>
    </Root>
  );
};

export default DaysIndicator;
