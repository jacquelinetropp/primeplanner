import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { MinIcon } from "../UI/Wrappers/Wrappers";
import * as actions from "../../store/actions/actions";
import { Fragment } from "react";
import SingleTodo from "../SingleTodo/SingleTodo";

const PostWrapper = styled.div`
  border-radius: 5px;
  grid-column: 1/3;
  height: ${({ isOpen }) => (isOpen ? "100%" : "min-content")};
  border-right: 1px solid var(--color-grayDark);
  border-bottom: 1px solid var(--color-grayDark);

  /* @media only screen and (max-width: 425px) {
    grid-column: 1/-1;
    grid-row: 3/4;
    width: 100vw;
  } */
`;

const MinimizeWrapper = styled.div`
  display: none;

  @media only screen and (max-width: 425px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  }
`;

const PostContent = styled.div`
  background-color: var(--color-gray);
  height: 100%;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const TaskPostit = ({ todos, getAllTodos, loading }) => {
  useEffect(() => {
    getAllTodos();
  }, []);
  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

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
      if (structuredDate == today && todo.priority == "high") {
        tasks.push(todo);
      }
    });
    console.log(tasks);
    content = (
      <Fragment>
        {tasks.map((task) => (
          <SingleTodo key={task.id} todo={task} />
        ))}
      </Fragment>
    );
  }

  return (
    <PostWrapper isOpen={isOpen}>
      <MinimizeWrapper>
        <MinIcon onClick={togglePopup} />
      </MinimizeWrapper>
      {isOpen && (
        <PostContent isOpen={isOpen}>
          <h2 className="center">Today's High Priority Tasks</h2>
          {content}
        </PostContent>
      )}
    </PostWrapper>
  );
};

const mapStateToProps = ({ todos }) => ({
  todos: todos.allTodos,
  loading: todos.loading,
});

const mapDispatchToProps = {
  getAllTodos: actions.getAllTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPostit);
