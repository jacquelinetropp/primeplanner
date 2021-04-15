import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Calendar from "./components/Calendar/Calendar";
import {
  LoggedOutWrapper,
  LoggedInWrapper,
  JournalWrapper,
} from "./components/UI/Wrappers/Wrappers";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navigation/Navbar";
import Main from "./components/layout/Main/Main";
import WeatherPage from "./pages/WeatherPage";
import JournalSidebar from "./components/layout/Journal/JournalSidebar/JournalSidebar";
import CalendarPage from "./pages/CalendarPage";

const App = ({ authenticated, verified }) => {
  let routes;

  if (authenticated) {
    routes = (
      <LoggedInWrapper>
        <Main />
        <JournalWrapper>
          <JournalSidebar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/calendar" component={CalendarPage} />
            <Route exact path="/weather" component={WeatherPage} />
            <Redirect to="/" />
          </Switch>
        </JournalWrapper>
      </LoggedInWrapper>
    );
  } else {
    routes = (
      <LoggedOutWrapper>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Redirect to="/login" />
        </Switch>
      </LoggedOutWrapper>
    );
  }

  return <div className="App">{routes}</div>;
};

const mapStateToProps = ({ firebase }) => ({
  authenticated: firebase.auth.uid,
  verified: firebase.auth.emailVerified,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
