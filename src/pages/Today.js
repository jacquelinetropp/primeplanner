import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Fragment } from "react";
import SingleTodo from "../components/SingleTodo/SingleTodo";
import JournalMain from "../components/layout/Journal/JournalMain/JournalMain";

const Today = ({ todos, loading }) => {
  const today = new Date().toDateString();

  let content;
  if (loading || !todos) {
    content = <Fragment>Loading...</Fragment>;
  } else if (todos.length === 0) {
    content = <Fragment>No todos for today!</Fragment>;
  } else {
    let tasks = [];

    todos.map((todo) => {
      const date = todo.dueDate;
      const structuredDate = new Date(date).toDateString();
      if (structuredDate == today) {
        tasks.push(todo);
      }
    });
    if (tasks.length === 0) {
      content = <h5>No tasks due today</h5>;
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
