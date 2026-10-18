import { FC } from "react";
import styled from "styled-components";

const Container = styled.footer({
  marginTop: 20,
  textAlign: "center",
  fontSize: 13,
  lineHeight: "20px",
});

// NOTE: festivos.io publishes its data under CC BY 4.0, which requires crediting it
const Attribution: FC = () => {
  return (
    <Container>
      Holydays from <a href="https://festivos.io">festivos.io</a> —{" "}
      <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
    </Container>
  );
};

export default Attribution;
