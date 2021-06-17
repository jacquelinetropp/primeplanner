import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import * as actions from "../../store/actions/actions";

import Modal from "../modal/Modal";
import Button from "../UI/Button/Button";
import Message from "../UI/Forms/Message";
import { FormButtonsWrapper, MessageWrapper } from "../UI/Wrappers/Wrappers";

const WorkoutWrapper = styled.div`
  margin: 1rem 0rem;
  font-size: 1.3rem;
  text-align: center;
  color: var(--color-white);
`;

const DeleteWorkoutItem = ({
  show,
  close,
  item,
  deleteWorkout,
  loading,
  error,
}) => {
  return (
    <Modal opened={show} close={close}>
      <h1>Delete Workout</h1>
      <h4>Are you sure you want to delete this workout?</h4>
      <WorkoutWrapper>{item.name}</WorkoutWrapper>
      <FormButtonsWrapper>
        <Button
          contain
          color="red"
          onClick={async () => await deleteWorkout(item.id)}
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

const mapStateToProps = ({ house }) => ({
  error: house.deleteWorkouts.error,
  loading: house.deleteWorkouts.loading,
});

const mapDispatchToProps = {
  deleteWorkout: actions.deleteWorkout,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteWorkoutItem);
