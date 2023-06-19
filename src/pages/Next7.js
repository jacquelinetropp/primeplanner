import React from "react";
import { connect } from "react-redux";
import { Fragment } from "react";
import SingleTodo from "../components/SingleTodo/SingleTodo";
import JournalMain from "../components/layout/Journal/JournalMain/JournalMain";
import {sevenDayTasks} from '../utils/HelperFunctions';
import LoadingCircle from "../components/Loading/Loading";

const Next7 = ({ todos, loading }) => {
  let content;
  if (loading || !todos) {
    content = <LoadingCircle />;
  } else if (todos.length === 0) {
    content = <h5 className="center">No todos!</h5>;;
  } else {

    const tasks = sevenDayTasks(todos);

    if (tasks.length === 0) {
      content = <h5 className="center">No tasks due in the next 7 days</h5>;
    } else {
      content = (
        <Fragment>
          {tasks.map((task) => (
            <SingleTodo key={task.id} todo={task} />
          ))}
        </Fragment>
      );
    }
  }

  return (
    <JournalMain>
      <h2 className="center">Tasks for the Next 7 days</h2>
      {content}
    </JournalMain>
  );
};

const mapStateToProps = ({ todos }) => ({
  todos: todos.allTodos,
  loading: todos.loading,
});

export default connect(mapStateToProps)(Next7);
