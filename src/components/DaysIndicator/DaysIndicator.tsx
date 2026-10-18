import { FC, useId } from "react";
import styled from "styled-components";

// NOTE: Equal side columns keep the totals centered whatever the width of the year and the button.
// Below 540px the single row no longer fits in the legend card, so the totals move to their own row.
const Root = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  gridTemplateAreas: '"year totals reset"',
  alignItems: "center",
  columnGap: 15,
  padding: "0 15px",
  "@media (max-width: 540px)": {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: '"totals totals" "year reset"',
  },
});

const Tooltip = styled.span({
  position: "absolute",
  top: "100%",
  left: 0,
  zIndex: 1,
  width: "max-content",
  maxWidth: 260,
  padding: "6px 10px",
  borderRadius: 6,
  backgroundColor: "var(--grey)",
  color: "var(--white)",
  fontSize: 13,
  fontWeight: 400,
  lineHeight: "18px",
  textAlign: "left",
  visibility: "hidden",
});

// NOTE: The warning tooltip shows while the year (⚠️ included) is hovered or focused
const Year = styled.div({
  gridArea: "year",
  justifySelf: "start",
  position: "relative",
  fontSize: 16,
  fontWeight: "bold",
  [`&:hover > ${Tooltip}, &:focus > ${Tooltip}`]: {
    visibility: "visible",
  },
});

const WarningIcon = styled.span({
  marginLeft: 6,
  cursor: "help",
});

const Totals = styled.div({
  gridArea: "totals",
  justifySelf: "center",
  display: "flex",
  columnGap: 30,
});

const Block = styled.div({
  fontSize: 13,
  whiteSpace: "nowrap",
});

const ResetButton = styled.button({
  gridArea: "reset",
  justifySelf: "end",
  padding: "2px 8px",
  border: "1px solid var(--selected-day)",
  borderRadius: 6,
  backgroundColor: "transparent",
  color: "var(--selected-day)",
  fontSize: 13,
  whiteSpace: "nowrap",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "var(--selected-day)",
    color: "var(--white)",
  },
});

interface Props {
  remainingDays: number;
  totalDays: number;
  year: number;
  // Shown as a ⚠️ next to the year, with the text in a tooltip
  warning?: string;
  onReset(): void;
}

const DaysIndicator: FC<Props> = ({ totalDays, remainingDays, year, warning, onReset }) => {
  const tooltipId = useId();

  return (
    <Root>
      <Year tabIndex={warning ? 0 : undefined} aria-describedby={warning ? tooltipId : undefined}>
        {year}
        {warning && (
          <>
            <WarningIcon aria-hidden="true">⚠️</WarningIcon>
            <Tooltip id={tooltipId} role="tooltip">
              {warning}
            </Tooltip>
          </>
        )}
      </Year>
      <Totals>
        <Block>Total days: {totalDays}</Block>
        <Block>Remaining days: {remainingDays}</Block>
      </Totals>
      <ResetButton type="button" onClick={onReset}>
        Reset days
      </ResetButton>
    </Root>
  );
};

export default DaysIndicator;
