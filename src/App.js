import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import {
  LoggedOutWrapper,
  LoggedInWrapper,
  BlueWrapper
} from "./components/UI/Wrappers/Wrappers";
import "./App.css";
import Navbar from "./components/Navigation/Navbar";
import Main from "./components/layout/Main/Main";
import JournalSidebar from "./components/layout/Journal/JournalSidebar/JournalSidebar";
import LoadingCircle from "./components/Loading/Loading";
import Login from './pages/Login';

//Lazy Loading
const DailyWeather = lazy(() => import("./pages/weather/DailyWeather"));
const CurrentDetails = lazy(() => import("./pages/weather/CurrentDetails"));
const HourlyWeather = lazy(() => import("./pages/weather/HourlyWeather"));

const Inbox = lazy(() => import("./pages/Inbox"));
const Today = lazy(() => import("./pages/Today"));
const Next7 = lazy(() => import("./pages/Next7"));

const Monthly = lazy(() => import("./pages/calendar/Monthly"));
const WeeklyCalendar = lazy(() => import("./pages/calendar/WeeklyCalendar"));
const DailyCalendar = lazy(() => import("./pages/calendar/DailyCalendar"));

const ChoresPage = lazy(() => import("./pages/house/ChoresPage"));
const WorkoutPage = lazy(() => import("./pages/house/WorkoutPage"));
const Budget = lazy(() => import("./pages/house/Budget"));

const SignUp = lazy(() => import("./pages/SignUp"));
const WeatherPage = lazy(() => import("./pages/weather/WeatherPage"));
const CalendarPage = lazy(() => import("./pages/calendar/CalendarPage"));
const ProjectsPage = lazy(() => import("./pages/projects/ProjectsPage"));
const ProjectTodos = lazy(() => import("./pages/projects/ProjectTodos"));
const HousePage = lazy(() => import("./pages/house/HousePage"));

const App = ({ authenticated }) => {
  let routes;

  if (authenticated) {
    routes = (
      <LoggedInWrapper>
        <Main />
        <JournalSidebar />
        <Suspense fallback={<LoadingCircle />}>
          <Switch>
            <Route exact path="/" component={Inbox} />
            <Route exact path="/inbox" component={Inbox} />
            <Route exact path="/today" component={Today} />
            <Route exact path="/next7" component={Next7} />
            <Route exact path="/calendar" component={CalendarPage} />
            <Route exact path="/calendar/monthly" component={Monthly} />
            <Route exact path="/calendar/weekly" component={WeeklyCalendar} />
            <Route exact path="/calendar/daily" component={DailyCalendar} />
            <Route
              exact
              path="/calendar/daily/:day"
              component={DailyCalendar}
            />
            <Route exact path="/weather" component={WeatherPage} />
            <Route exact path="/weather/current" component={CurrentDetails} />
            <Route exact path="/weather/daily" component={DailyWeather} />
            <Route exact path="/weather/hourly" component={HourlyWeather} />
            <Route exact path="/projects/" component={ProjectsPage} />
            <Route exact path="/house" component={HousePage} />
            <Route exact path="/house/chores" component={ChoresPage} />
            <Route exact path="/house/workouts" component={WorkoutPage} />
            <Route exact path="/house/budget" component={Budget} />
            <Route path="/project/:id" component={ProjectTodos} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </LoggedInWrapper>
    );
  } else {
    routes = (
      <LoggedOutWrapper>
        <BlueWrapper />
        <Navbar />
        <Suspense fallback={<LoadingCircle />}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Redirect to="/login" />
          </Switch>
        </Suspense>
      </LoggedOutWrapper>
    );
  }

  return <div className="App">{routes}</div>;
};

const mapStateToProps = ({ firebase }) => ({
  authenticated: firebase.auth.uid,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
