import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";
import SingleTodo from "../components/SingleTodo/SingleTodo";
import JournalMain from "../components/layout/Journal/JournalMain/JournalMain";

const Inbox = ({ todos, loading }) => {
  let content;
  if (loading && !todos) {
    content = <Fragment>Loading...</Fragment>;
  } else if (todos.length === 0) {
    content = <Fragment>No todos!</Fragment>;
  } else {
    content = (
      <Fragment>
        {todos.map((todo) => (
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
