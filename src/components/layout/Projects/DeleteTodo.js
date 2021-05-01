import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";

import Modal from "../../modal/Modal";
import Button from "../../UI/Button/Button";

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;
const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0 rem;
  width: 100%;
  padding: 0 3rem;
`;

const TodoWrapper = styled.div`
  margin: 1rem 0rem;
  font-size: 1.3rem;
  text-align: center;
  color: var(--color-white);
`;

const DeleteTodo = ({ show, close, todo, deleteTodo, loading, error }) => {
  return (
    <Modal opened={show} close={close}>
      <h1>
        Deleting Task
      </h1>
      <h4>
        Are you sure you want to delete this task?
      </h4>
      <TodoWrapper>{todo.todo}</TodoWrapper>
      <ButtonsWrapper>
        <Button
          contain
          color="red"
          onClick={async () => await deleteTodo(todo.id)}
          disabled={loading}
          loading={loading ? "Deleting..." : null}
        >
          Delete
        </Button>
        <Button type="button" color="main" contain onClick={close}>
          Cancel
        </Button>
      </ButtonsWrapper>
      <MessageWrapper>
    
      </MessageWrapper>
    </Modal>
  );
};

const mapStateToProps = ({ todos }) => ({
  error: todos.deleteTodo.error,
  loading: todos.deleteTodo.loading,
});

const mapDispatchToProps = {
  deleteTodo: actions.deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTodo);
