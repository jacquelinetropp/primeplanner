import React from "react";
import { connect } from "react-redux";
import { Fragment } from "react";
import SingleTodo from "../components/SingleTodo/SingleTodo";
import JournalMain from "../components/layout/Journal/JournalMain/JournalMain";
import { todaysTasks } from "../utils/HelperFunctions";
import LoadingCircle from "../components/Loading/Loading";

const Today = ({ todos, loading }) => {
  let content;
  if (loading || !todos) {
    content = <LoadingCircle />;
  } else if (todos.length === 0) {
    content = <h5 className="center">No todos today!</h5>;
  } else {
    const tasks = todaysTasks(todos);
    if (tasks.length === 0) {
      content = <h5 className="center">No tasks due today</h5>;
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
      <h2 className="center">Today's Tasks</h2>
      {content}
    </JournalMain>
  );
};

const mapStateToProps = ({ todos }) => ({
  todos: todos.allTodos,
  loading: todos.loading,
});

export default connect(mapStateToProps)(Today);
