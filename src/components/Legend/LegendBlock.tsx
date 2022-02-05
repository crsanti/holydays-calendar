import { FC } from "react";
import styled from "styled-components";
import { HolydayType } from "../../model";

interface LegendBlockProps {
  variant: HolydayType;
}

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  padding: "0 13px",
});

const variantsMap: Record<LegendBlockProps["variant"], string> = {
  local: "var(--local-holyday)",
  regional: "var(--regional-holyday)",
  national: "var(--national-holyday)",
  selected: "var(--selected-day)",
};

const Square = styled.div<{ variant: LegendBlockProps["variant"] }>(({ variant }) => ({
  width: 13,
  height: 13,
  marginRight: 6,
  backgroundColor: variantsMap[variant],
}));

const LegendBlock: FC<LegendBlockProps> = ({ variant, children }) => {
  return (
    <Container>
      <Square variant={variant} />
      {children}
    </Container>
  );
};

export default LegendBlock;
