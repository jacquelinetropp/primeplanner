import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./utils/global";
import theme from './utils/theme';
import { Provider } from "react-redux";

import store from './store/index';

const root = document.getElementById("root");

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Fragment>
  
        <p>Loading</p>
  
      <GlobalStyles />
    </Fragment>
  </ThemeProvider>,
  root
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Fragment>
            <GlobalStyles />
            <App />
          </Fragment>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
    root
  );
});

// ReactDOM.render(
//   <BrowserRouter>
//     <ThemeProvider theme={theme}>
//       <GlobalStyles />
//       <App />
//     </ThemeProvider>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
