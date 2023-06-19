import React, { Fragment, hydrate } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./utils/global";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import LoadingCircle from "./components/Loading/Loading";

import store from "./store/index";

const root = document.getElementById("root");

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Fragment>
      <LoadingCircle />

      <GlobalStyles />
    </Fragment>
  </ThemeProvider>,
  root
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.hydrate(
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
