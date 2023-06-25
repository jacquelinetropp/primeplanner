import React, { Fragment } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import Button from "../UI/Button/Button";
import Modal from "../modal/Modal";
import Input from "../UI/Forms/Input";
import Message from "../UI/Forms/Message";
import {
  FormButtonsWrapper,
  MessageWrapper,
  StyledForm,
} from "../UI/Wrappers/Wrappers";

import * as actions from "../../store/actions/actions";

const BudgetSchema = Yup.object().shape({
  amount: Yup.number().required("This item is required"),
});

const SetBudget = ({
  maxBudget,
  loading,
  error,
  opened,
  close,
  setBudget,
  editBudget,
}) => {
  return (
    <Fragment>
      <Modal opened={opened} close={close}>
        <h1>Set Your Budget</h1>
        <h4>What do you want to spend each month?</h4>
        <Formik
          initialValues={{
            amount: "",
          }}
          validationSchema={BudgetSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            maxBudget.length === 0
              ? await setBudget(values)
              : await editBudget(values);
            close();
            resetForm();
          }}
        >
          {({ isSubmitting, isValid, resetForm }) => (
            <StyledForm>
              <Field
                type="number"
                name="amount"
                placeholder="What is your monthly budget..."
                component={Input}
              />

              <FormButtonsWrapper>
                <Button
                  contain
                  color="main"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  loading={loading ? "loading..." : null}
                >
                  Set Budget
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
              </FormButtonsWrapper>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
            </StyledForm>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = ({ finance }) => ({
  loading: finance.loading,
  error: finance.error,
});

const mapDispatchToProps = {
  setBudget: actions.setBudget,
  editBudget: actions.editBudget,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetBudget);
