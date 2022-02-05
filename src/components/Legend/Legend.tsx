import { FC } from "react";
import styled from "styled-components";
import BaseCard from "../Card";
import LegendBlock from "./LegendBlock";

const Container = styled.div({
  position: "sticky",
  top: 0,
  padding: 10,
  marginBottom: -50,
  textAlign: "center",
  fontSize: 14,
});

const Card = styled(BaseCard)({
  display: "inline-flex",
  padding: 0,
  borderRadius: 8,
  flexDirection: "column",
});

const LegendBlockContainer = styled.div({
  display: "inline-flex",
  flexWrap: "wrap",
});

const Legend: FC = ({ children }) => {
  return (
    <Container>
      <Card>
        <LegendBlockContainer>
          <LegendBlock variant="national">National holydays</LegendBlock>
          <LegendBlock variant="regional">Regional holydays</LegendBlock>
          <LegendBlock variant="local">Local holydays</LegendBlock>
          <LegendBlock variant="selected">Selected days</LegendBlock>
        </LegendBlockContainer>
        {children}
      </Card>
    </Container>
  );
};

export default Legend;
