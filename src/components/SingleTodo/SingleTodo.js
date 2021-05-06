import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import InputTodo from "../layout/Projects/InputTodos";
import { StyledEdit, StyledDelete } from "../UI/Wrappers/Wrappers";
import * as actions from "../../store/actions/actions";
import DeleteTodo from "../layout/Projects/DeleteTodo";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
  z-index: 5;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
`;
const Controls = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
  margin-left: auto;
`;

const TaskCircle = styled.div`
  height: 20px;
  width: 20px;
  margin-right: 1rem;
  border-radius: 50%;
  border: 1px solid black;
  transition: all 1s;

  background-color: ${({ completed }) => (completed ? "black" : "none")};

  &:hover {
    background-color: black;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

const StyledText = styled.h6`
  color: ${({ priority }) => {
    if (priority === "high") return "var(--color-mainDark)";
    else if (priority === "medium") return "var(--color-main)";
    else if (priority === "low") return "var(--color-second)";
    else return "var(--color-text)";
  }};
`;

const SingleTodo = ({ todo, completeTodo }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const date = todo.dueDate;
  const structuredDate = new Date(date).toString();

  return (
    <Wrapper>
      <TaskCircle
        completed={todo.completed == true ? "completed" : ""}
        onClick={() => completeTodo(todo.id)}
      />
      <TextWrapper completed={todo.completed == true ? "completed" : ""}>
        <StyledText priority={todo.priority}> {todo.todo}</StyledText>
        <p>{structuredDate}</p>
      </TextWrapper>
      <Controls>
        <StyledEdit onClick={() => setIsEditing(true)} />
        <StyledDelete onClick={() => setIsDeleting(true)} />

        <InputTodo
          todo={todo}
          opened={isEditing}
          close={() => setIsEditing(false)}
        />
        <DeleteTodo
          todo={todo}
          show={isDeleting}
          close={() => setIsDeleting(false)}
        />
      </Controls>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  completeTodo: actions.completeTodo,
};

export default connect(null, mapDispatchToProps)(SingleTodo);
