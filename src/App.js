import React from "react";
import {Route, Switch} from 'react-router-dom';

import Calendar from "./components/Calendar/Calendar";

import "./App.css";
import Home from "./pages/Home";

class App extends React.Component {
  render() {
    return (
      <div className="App">
      <Switch>
      <Route exact path="/calendar" component={Calendar} />
      <Route exact path="/" component={Home} />
     
        </Switch>
      </div>
    );
  }
}

export default App;