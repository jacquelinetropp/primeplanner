import React, { Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";
import SingleTodo from "../components/SingleTodo/SingleTodo";
import JournalMain from "../components/layout/Journal/JournalMain/JournalMain";
import { todaysTasks, setOverdueTasks, getSevenMinusToday } from "../utils/HelperFunctions";
import {getFutureTodos} from '../utils/inboxFunctions';

const Inbox = ({ todos, loading }) => {
  const todaysTodos = todaysTasks(todos);
  const next7 = getSevenMinusToday(todos);
  const futureTodos = getFutureTodos(todos);
  const overdue = setOverdueTasks(todos);

  let content;
  if (loading && !todos) {
    content = <Fragment>Loading...</Fragment>;
  } else if (todos.length === 0) {
    content = <Fragment>No todos!</Fragment>;
  } else {
    content = (
      <Fragment>
        <h4>Overdue</h4>
        {overdue.map((todo) => (
          <SingleTodo key={todo.id} todo={todo} />
        ))}
        <h4>Today</h4>
        {todaysTodos.map((todo) => (
          <SingleTodo key={todo.id} todo={todo} />
        ))}
        <h4>Next 7 days</h4>
        {next7.map((todo) => (
          <SingleTodo key={todo.id} todo={todo} />
        ))}
        <h4>Future Tasks</h4>
        {futureTodos.map((todo) => (
          <SingleTodo key={todo.id} todo={todo} />
        ))}
      </Fragment>
    );
  }

  return (
    <JournalMain>
      <h2 className="center">All Tasks</h2>
      {content}
    </JournalMain>
  );
};

const mapStateToProps = ({ todos }) => ({
  todos: todos.allTodos,
  loading: todos.loading,
});

const mapDispatchToProps = {
  getAllTodos: actions.getAllTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
