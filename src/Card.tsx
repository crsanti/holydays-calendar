import styled from "styled-components";

const Card = styled.div({
  margin: "0 auto",
  padding: "1.5em",
  backgroundColor: "var(--white)",
  borderRadius: 12,
  boxShadow: [
    "0 1px 3px rgba(10, 10, 46, 0.13)",
    "0 3px 14px rgba(10, 10, 46, 0.03)",
    "0 8px 32px rgba(10, 10, 46, 0.07)",
    "0 30px 84px rgba(10, 10, 46, 0.08)",
  ].join(","),
});

export default Card;
