import styled, { CSSObject } from "styled-components";
import { HolydayType } from "../../model";
import GridCell from "./GridCell";

interface Props {
  variant?: HolydayType;
}

// TODO: Try design with border radius
// const BORDER_RADIUS = 8;

const variants: Record<Required<Props>["variant"] | "default", CSSObject> = {
  selected: {
    cursor: "pointer",
    color: "var(--white)",
    backgroundColor: "var(--selected-day)",
  },
  national: { color: "var(--white)", backgroundColor: "var(--national-holyday)" },
  regional: { color: "var(--white)", backgroundColor: "var(--regional-holyday)" },
  local: { color: "var(--white)", backgroundColor: "var(--local-holyday)" },
  default: {
    fontWeight: 400,
    cursor: "pointer",
    backgroundColor: "transparent",
    "&:disabled": {
      color: "var(--medium-grey)",
      cursor: "default",
    },
    "&:not(:disabled):hover": {
      backgroundColor: "var(--disabled)",
      color: "var(--blue)",
    },
  },
};

const Day = styled(GridCell)<Props>(({ variant }) => ({
  border: 0,
  fontWeight: 600,
  lineHeight: "var(--line-height)",
  padding: 0,
  ...variants[variant ?? "default"],
}));

export default Day;
