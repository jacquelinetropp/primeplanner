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
  color: var(--color-text);
  z-index: 5;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 5px 0px;
`;

const ColorDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ priority }) => {
    if (priority === "high") return "var(--color-mainDark)";
    else if (priority === "medium") return "var(--color-main)";
    else if (priority === "low") return "var(--color-second)";
    else return "var(--color-text)";
  }};
  width: 3px;
  height: 100%;
  border-radius: 5px;
`;

const Controls = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
  margin-left: auto;
  display: ${({ calendar }) => (calendar ? "none" : "")};
`;

const TaskCircle = styled.div`
  height: 20px;
  width: 20px;
  margin-right: 1rem;
  border-radius: 50%;
  border: 1px solid black;
  transition: all 1s;
  cursor: pointer;

  background-color: ${({ completed }) => (completed ? "black" : "none")};

  &:hover {
    background-color: black;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  width: 100%;
`;

const StyledDate = styled.p`
  display: ${({ calendar }) => (calendar ? "none" : "")};
`;

const StyledTextDiv = styled.div`
  display: flex;
  width: 100%;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledText = styled.h6`
  font-size: ${({ calendar }) => (calendar ? "1.4rem" : "1.8rem")};
`;

const StyledBubble = styled.p`
  background-color: ${({ priority }) => {
    if (priority === "high") return "var(--color-mainDark)";
    else if (priority === "medium") return "var(--color-main)";
    else if (priority === "low") return "var(--color-second)";
    else return "var(--color-text)";
  }};
  border-radius: 10px;
  color: #fff;
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-left: 10px;
`;

const SingleTodo = ({ todo, completeTodo, calendar }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const date = todo.dueDate;
  const structuredDate = new Date(date).toString().slice(0, 21);
  const structuredTime = new Date(date).toTimeString().slice(0, 5);

  let priority;
  if (todo.priority === "high") {
    priority = "High Priority";
  } else if (todo.priority === "medium") {
    priority = "Medium Priority";
  } else if (todo.priority === "low") {
    priority = "Low Priority";
  }

  return (
    <Wrapper>
      <ColorDiv priority={todo.priority} />
      <TaskCircle
        completed={todo.completed === true ? "completed" : ""}
        onClick={() => completeTodo(todo.id)}
      />
      <TextWrapper completed={todo.completed === true ? "completed" : ""}>
        <StyledTextDiv>
          <StyledText priority={todo.priority} calendar={calendar}>
            {" "}
            {todo.todo}
          </StyledText>
          <StyledBubble priority={todo.priority}>{priority}</StyledBubble>
        </StyledTextDiv>
        <StyledDate calendar={calendar}>
          {calendar ? structuredTime : structuredDate}
        </StyledDate>
      </TextWrapper>
      <Controls calendar={calendar}>
        <StyledEdit onClick={() => setIsEditing(true)} />
        <StyledDelete onClick={() => setIsDeleting(true)} />
        {isEditing ? (
          <InputTodo
            todo={todo}
            opened={isEditing}
            close={() => setIsEditing(false)}
          />
        ) : (
          ""
        )}
        {isDeleting ? (
          <DeleteTodo
            todo={todo}
            show={isDeleting}
            close={() => setIsDeleting(false)}
          />
        ) : (
          ""
        )}
      </Controls>
    </Wrapper>
  );
};

const mapDispatchToProps = {
  completeTodo: actions.completeTodo,
};

export default connect(null, mapDispatchToProps)(SingleTodo);
