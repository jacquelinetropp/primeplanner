import React, { useEffect } from "react";
import JournalMain from "../../components/layout/Journal/JournalMain/JournalMain";
import Calendar1 from "../../components/Calendar/Calendar1";
import * as actions from "../../store/actions/actions";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Monthly = ({ todos, workouts, getWorkouts, getChores, chores }) => {
  useEffect(() => {
    getWorkouts();
  }, []);
  return (
    <JournalMain>
      <Calendar1 todos={todos} workoutList={workouts} chores={chores}/>
    </JournalMain>
  );
};

const mapStateToProps = ({ todos, house }) => ({
  todos: todos.allTodos,
  workouts: house.workouts.workoutList,
  chores: house.chores
});

const mapDispatchToProps = {
  getWorkouts: actions.getWorkouts,
  getChores: actions.getChores
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Monthly)
);
