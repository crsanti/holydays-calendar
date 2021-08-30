import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle({
  html: {
    fontFamily: "Inter",
    fontWeight: 400,
    color: "var(--grey)",
  },
  body: {
    position: "relative",
    minHeight: "100vh",
    background: "var(--disabled)",
    padding: "2em 1em",
    lineHeight: "var(--line-height)",
  },
  "#root": {
    position: "relative",
  },
  ":root": {
    "--line-height": "40px",
    "--grey": "#19181A",
    "--disabled": "#F8F7FA",
    "--white": "#fff",
    "--medium-grey": "#C9C8CC",
    "--national-holyday": "#00a37f",
    "--regional-holyday": "#009eb8",
    "--local-holyday": "#ff4388",
    "--selected-day": "#7047EB",
  },
});

export default GlobalStyles;
