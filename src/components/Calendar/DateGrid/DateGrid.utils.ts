import { PositionVariant } from "./Day";

export const POSITION_VARIANT_TOP_LEFT = 0b0001;
export const POSITION_VARIANT_TOP_RIGHT = 0b0010;
export const POSITION_VARIANT_BOTTOM_LEFT = 0b0100;
export const POSITION_VARIANT_BOTTOM_RIGHT = 0b1000;
export const POSITION_VARIANT_TOP = POSITION_VARIANT_TOP_LEFT + POSITION_VARIANT_TOP_RIGHT;
export const POSITION_VARIANT_LEFT = POSITION_VARIANT_TOP_LEFT + POSITION_VARIANT_BOTTOM_LEFT;
export const POSITION_VARIANT_RIGHT = POSITION_VARIANT_TOP_RIGHT + POSITION_VARIANT_BOTTOM_RIGHT;
export const POSITION_VARIANT_BOTTOM = POSITION_VARIANT_BOTTOM_LEFT + POSITION_VARIANT_BOTTOM_RIGHT;
export const POSITION_VARIANT_ROUNDED =
  POSITION_VARIANT_TOP_LEFT + POSITION_VARIANT_TOP_RIGHT + POSITION_VARIANT_BOTTOM_LEFT + POSITION_VARIANT_BOTTOM_RIGHT;

export const positionVariantsMap: Record<number, PositionVariant> = {
  [POSITION_VARIANT_TOP_LEFT]: "top-left",
  [POSITION_VARIANT_TOP_RIGHT]: "top-right",
  [POSITION_VARIANT_BOTTOM_LEFT]: "bottom-left",
  [POSITION_VARIANT_BOTTOM_RIGHT]: "bottom-right",
  [POSITION_VARIANT_TOP]: "top",
  [POSITION_VARIANT_LEFT]: "left",
  [POSITION_VARIANT_RIGHT]: "right",
  [POSITION_VARIANT_BOTTOM]: "bottom",
  [POSITION_VARIANT_ROUNDED]: "rounded",
};

export const getPositionVariant = (
  prevHolyday: boolean,
  isNextDayHolyday: boolean,
  isPrevWeekDayHolyday: boolean,
  nextWeekHolyday: boolean,
): PositionVariant | undefined => {
  const topLeft = !isPrevWeekDayHolyday && !prevHolyday ? POSITION_VARIANT_TOP_LEFT : 0;
  const topRight = !isPrevWeekDayHolyday && !isNextDayHolyday ? POSITION_VARIANT_TOP_RIGHT : 0;
  const bottomLeft = !prevHolyday && !nextWeekHolyday ? POSITION_VARIANT_BOTTOM_LEFT : 0;
  const bottomRight = !isNextDayHolyday && !nextWeekHolyday ? POSITION_VARIANT_BOTTOM_RIGHT : 0;

  const style = topLeft + topRight + bottomLeft + bottomRight;
  return positionVariantsMap[style];
};
