import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";

import Modal from "../../modal/Modal";
import Button from "../../UI/Button/Button";
import Message from "../../UI/Forms/Message";
import { MessageWrapper, FormButtonsWrapper } from "../../UI/Wrappers/Wrappers";

const TodoWrapper = styled.div`
  margin: 1rem 0rem;
  font-size: 1.3rem;
  text-align: center;
  color: var(--color-white);
`;

const DeleteTodo = ({ show, close, todo, deleteTodo, loading, error }) => {
  return (
    <Modal opened={show} close={close}>
      <h1>Deleting Task</h1>
      <h4>Are you sure you want to delete this task?</h4>
      <TodoWrapper>{todo.todo}</TodoWrapper>
      <FormButtonsWrapper>
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
      </FormButtonsWrapper>
      <MessageWrapper>
        <Message error show={error}>
          {error}
        </Message>
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
