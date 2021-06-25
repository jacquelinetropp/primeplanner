import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import * as actions from "../../store/actions/actions";

import Modal from "../modal/Modal";
import Button from "../UI/Button/Button";
import Message from "../UI/Forms/Message";
import { FormButtonsWrapper, MessageWrapper } from "../UI/Wrappers/Wrappers";

const TodoWrapper = styled.div`
  margin: 1rem 0rem;
  font-size: 1.3rem;
  text-align: center;
  color: var(--color-white);
`;

const DeleteBudgetItem = ({
  show,
  close,
  item,
  deleteItem,
  loading,
  error,
}) => {
  return (
    <Modal opened={show} close={close}>
      <h1>Delete Budget Item</h1>
      <h4>Are you sure you want to delete this item?</h4>
      <TodoWrapper>{item.name}</TodoWrapper>
      <FormButtonsWrapper>
        <Button
          contain
          color="red"
          onClick={async () => await deleteItem(item.id)}
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

const mapStateToProps = ({ finance }) => ({
  error: finance.error,
  loading: finance.loading,
});

const mapDispatchToProps = {
  deleteItem: actions.deleteBudgetItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBudgetItem);
