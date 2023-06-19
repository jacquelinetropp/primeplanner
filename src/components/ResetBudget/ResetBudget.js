import React from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/actions";

import Modal from "../modal/Modal";
import Button from "../UI/Button/Button";
import Message from "../UI/Forms/Message";
import { FormButtonsWrapper, MessageWrapper } from "../UI/Wrappers/Wrappers";

const ResetBudget = ({
  show,
  close,
  resetBudget,
  loading,
  error,
}) => {
  return (
    <Modal opened={show} close={close}>
      <h1>Reset Budget</h1>
      <h4>Are you sure you want to delete this item?</h4>
      <FormButtonsWrapper>
        <Button
          contain
          color="red"
          onClick={async () => (await resetBudget(), close())}
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
  error: finance.resetBudget.loading,
  loading: finance.resetBudget.error,
});

const mapDispatchToProps = {
  resetBudget: actions.resetBudget,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetBudget);
