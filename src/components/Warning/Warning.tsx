import { FC, PropsWithChildren, useEffect, useId, useState } from "react";
import styled from "styled-components";

const Container = styled.span({
  position: "relative",
});

const IconButton = styled.button({
  marginLeft: 6,
  padding: 0,
  border: 0,
  backgroundColor: "transparent",
  font: "inherit",
  cursor: "help",
});

interface TooltipProps {
  isVisible: boolean;
}

const Tooltip = styled.span<TooltipProps>(({ isVisible }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  zIndex: 1,
  boxSizing: "border-box",
  width: "max-content",
  // NOTE: Narrow screens shrink it so it never causes horizontal scroll (WCAG 1.4.10)
  maxWidth: "min(280px, calc(100vw - 64px))",
  padding: "6px 10px",
  borderRadius: 6,
  backgroundColor: "var(--grey)",
  color: "var(--white)",
  fontSize: 13,
  fontWeight: 400,
  lineHeight: "18px",
  textAlign: "left",
  visibility: isVisible ? "visible" : "hidden",
}));

interface Props {
  text: string;
}

/**
 * Its children followed by a ⚠️ button. `text` shows in a tooltip while the whole is hovered or the button has focus,
 * and stays while the pointer moves onto it. Escape hides it until the pointer and the focus leave (WCAG 1.4.13).
 */
const Warning: FC<PropsWithChildren<Props>> = ({ text, children }) => {
  const tooltipId = useId();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const isVisible = (isHovered || isFocused) && !isDismissed;

  useEffect(() => {
    if (!isHovered && !isFocused) setIsDismissed(false);
  }, [isHovered, isFocused]);

  useEffect(() => {
    if (!isVisible) return;
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDismissed(true);
    };
    document.addEventListener("keydown", dismissOnEscape);
    return () => document.removeEventListener("keydown", dismissOnEscape);
  }, [isVisible]);

  return (
    <Container onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
      <IconButton
        type="button"
        aria-label="Warning"
        aria-describedby={tooltipId}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        ⚠️
      </IconButton>
      <Tooltip id={tooltipId} role="tooltip" isVisible={isVisible}>
        {text}
      </Tooltip>
    </Container>
  );
};

export default Warning;
