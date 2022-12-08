import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    ul,
    ol {
        list-style: none;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
    }

    body {
        font-family: "Maven Pro", sans-serif;
    }

    .accent-font {
        font-family: Overpass;
    }
`;

export default GlobalStyle;
