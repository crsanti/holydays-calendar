import styled, { CSSObject, CSSProperties } from "styled-components";
import { HolydayType } from "../../model";
import GridCell from "./GridCell";

export type PositionVariant = "first" | "last";

interface Props {
  holydayType?: HolydayType;
  positionVariant?: PositionVariant;
}

const BORDER_RADIUS = 8;

const colorVariants: Record<Required<Props>["holydayType"] | "default", CSSObject> = {
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

const positionVariants: Record<PositionVariant, CSSProperties> = {
  first: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },
  last: {
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
  },
};

const Day = styled(GridCell)<Props>(({ holydayType, positionVariant }) => ({
  border: 0,
  fontWeight: 600,
  lineHeight: "var(--line-height)",
  padding: 0,
  ...colorVariants[holydayType ?? "default"],
  ...(positionVariant && positionVariants[positionVariant]),
}));

export default Day;
