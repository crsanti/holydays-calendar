import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

const Container = styled.div({
  position: "fixed",
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  columnGap: 12,
  boxSizing: "border-box",
  width: "max-content",
  maxWidth: "calc(100vw - 32px)",
  padding: "10px 12px 10px 16px",
  borderRadius: 8,
  backgroundColor: "var(--grey)",
  color: "var(--white)",
  fontSize: 14,
  lineHeight: "20px",
  boxShadow: "0 8px 32px rgba(10, 10, 46, 0.2)",
});

const CloseButton = styled.button({
  padding: "0 4px",
  border: 0,
  backgroundColor: "transparent",
  color: "inherit",
  fontSize: 18,
  lineHeight: "20px",
  cursor: "pointer",
});

interface Props {
  onClose(): void;
}

// NOTE: It stays until closed: it reports an error, and a timeout could hide it before it is read
const Toast: FC<PropsWithChildren<Props>> = ({ children, onClose }) => {
  return (
    <Container role="alert">
      {children}
      <CloseButton type="button" aria-label="Close" onClick={onClose}>
        ×
      </CloseButton>
    </Container>
  );
};

export default Toast;
