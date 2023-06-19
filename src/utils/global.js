import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}
*:focus {
outline: 0;
outline: none;
}
:root {
  font-size: 62.5%;
  box-sizing: border-box;
  --color-main: ${(props) => props.theme.colors.main};
  --color-mainDark: ${(props) => props.theme.colors.mainDark};
  --color-quad: ${(props) => props.theme.colors.quad};
  --color-second: ${(props) => props.theme.colors.second};
  --color-tertiary: ${(props) => props.theme.colors.tertiary};
  --color-text: ${(props) => props.theme.colors.textColor};
  --color-white: ${(props) => props.theme.colors.whiteColor};
  --color-gray: ${(props) => props.theme.colors.gray};
  --color-grayDark: ${(props) => props.theme.colors.grayDark};
  --color-errorRed: ${(props) => props.theme.colors.errorRed};
  --shadow: ${(props) => props.theme.colors.shadow};
  @media ${(props) => props.theme.mediaQueries.small} {
    font-size: 60%;
  }
  @media ${(props) => props.theme.mediaQueries.smallest} {
    font-size: 55%;
  }
}
body {
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  line-height: 1.6;
}
a, button {
  cursor: pointer;
}
a, input, textarea, button {
  outline: none;
  text-decoration: none;
  font-family: inherit;
}

h1 {
    font-size: 3.5rem;
  }
  
  h2 {
    font-size: 3rem;
  }
  h3 {
    font-size: 2.75rem;
  }
  h4 {
    font-size: 2.5rem;
  }
  h5 {
    font-size: 2rem
  }
  h6 {
    font-size: 1.8rem;
  }
   p{ 
     font-size: 1.4rem;
   }

   .center {
       text-align: center;
       justify-self: center;
       align-self: center;
   }
`;
export default GlobalStyles;
