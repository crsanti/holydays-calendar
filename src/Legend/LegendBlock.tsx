import { FC } from "react";
import { Holyday } from "../model";
import styled from "styled-components";

interface LegendBlockProps {
  variant?: Holyday | 'selected';
}

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  padding: "0 13px",
});

const Square = styled.div<{ variant: LegendBlockProps["variant"] }>(({ variant }) => ({
  width: 13,
  height: 13,
  marginRight: 6,
  backgroundColor:
    variant === "local"
      ? "var(--local-holyday)"
      : variant === "regional"
        ? "var(--regional-holyday)"
        : variant === "national"
          ? "var(--national-holyday)"
          : variant === "selected"
            ? "var(--selected-day)"
            : undefined,
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
