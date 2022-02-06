import styled, { CSSObject, CSSProperties } from "styled-components";
import { HolydayType } from "../../../model";
import GridCell from "../GridCell";

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

export type PositionVariant =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "rounded";

const BORDER_RADIUS = 8;
const POSITION_VARIANT_TOP_LEFT_STYLE: CSSProperties = { borderTopLeftRadius: BORDER_RADIUS };
const POSITION_VARIANT_TOP_RIGHT_STYLE: CSSProperties = { borderTopRightRadius: BORDER_RADIUS };
const POSITION_VARIANT_BOTTOM_LEFT_STYLE: CSSProperties = { borderBottomLeftRadius: BORDER_RADIUS };
const POSITION_VARIANT_BOTTOM_RIGHT_STYLE: CSSProperties = { borderBottomRightRadius: BORDER_RADIUS };
const POSITION_VARIANT_TOP_STYLE: CSSProperties = { ...POSITION_VARIANT_TOP_LEFT_STYLE, ...POSITION_VARIANT_TOP_RIGHT_STYLE };
const POSITION_VARIANT_LEFT_STYLE: CSSProperties = { ...POSITION_VARIANT_TOP_LEFT_STYLE, ...POSITION_VARIANT_BOTTOM_LEFT_STYLE };
const POSITION_VARIANT_RIGHT_STYLE: CSSProperties = {
  ...POSITION_VARIANT_TOP_RIGHT_STYLE,
  ...POSITION_VARIANT_BOTTOM_RIGHT_STYLE,
};
const POSITION_VARIANT_BOTTOM_STYLE: CSSProperties = {
  ...POSITION_VARIANT_BOTTOM_LEFT_STYLE,
  ...POSITION_VARIANT_BOTTOM_RIGHT_STYLE,
};
const POSITION_VARIANT_ROUNDED_STYLE: CSSProperties = { ...POSITION_VARIANT_TOP_STYLE, ...POSITION_VARIANT_BOTTOM_STYLE };

const positionVariants: Record<PositionVariant, CSSProperties> = {
  "top-left": POSITION_VARIANT_TOP_LEFT_STYLE,
  "top-right": POSITION_VARIANT_TOP_RIGHT_STYLE,
  "bottom-left": POSITION_VARIANT_BOTTOM_LEFT_STYLE,
  "bottom-right": POSITION_VARIANT_BOTTOM_RIGHT_STYLE,
  top: POSITION_VARIANT_TOP_STYLE,
  left: POSITION_VARIANT_LEFT_STYLE,
  right: POSITION_VARIANT_RIGHT_STYLE,
  bottom: POSITION_VARIANT_BOTTOM_STYLE,
  rounded: POSITION_VARIANT_ROUNDED_STYLE,
};

const Day = styled(GridCell)({
  border: 0,
  fontWeight: 600,
  lineHeight: "var(--line-height)",
  padding: 0,
});

interface Props {
  holydayType?: HolydayType;
  positionVariant?: PositionVariant;
}

const DayWithBordersAndColors = styled(Day)<Props>(({ holydayType, positionVariant }) => ({
  ...colorVariants[holydayType ?? "default"],
  ...(positionVariant && positionVariants[positionVariant]),
}));

export default DayWithBordersAndColors;
