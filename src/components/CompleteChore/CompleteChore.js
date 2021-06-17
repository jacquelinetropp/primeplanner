import React, { Fragment } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { connect } from "react-redux";

import Button from "../UI/Button/Button";
import Modal from "../modal/Modal";
import { StyledForm } from "../UI/Wrappers/Wrappers";

import * as actions from "../../store/actions/actions";
import DatePickerField from "../DatePicker/DatePicker";

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

const CompleteChore = ({
  opened,
  close,
  chore,
  loading,
  error,
  completeChore,
}) => {
  const loadingText = "Adding...";
  return (
    <Fragment>
      <Modal opened={opened} close={close}>
        <h1>Did you complete {chore.name}?</h1>
        <h4>Select which date you completed it on</h4>
        <Formik
          initialValues={{
            date: new Date(),
            amount: chore.amount,
            frequency: chore.frequency
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await completeChore(chore.id, values, close());
          }}
        >
          {({ isSubmitting, isValid, resetForm, values, setFieldValue }) => (
            <StyledForm>
              <DatePickerField
                name="date"
                value={values.date}
                onChange={setFieldValue}
              />
              <ButtonsWrapper>
                <Button
                  contain
                  color="main"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  loading={loading ? loadingText : null}
                >
                  Complete
                </Button>
                <Button
                  type="button"
                  color="red"
                  contain
                  onClick={() => {
                    close();
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </ButtonsWrapper>
              <MessageWrapper></MessageWrapper>
            </StyledForm>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = ({ house }) => ({
  loading: house.loading,
  error: house.error,
});

const mapDispatchToProps = {
  completeChore: actions.completeChore,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteChore);
