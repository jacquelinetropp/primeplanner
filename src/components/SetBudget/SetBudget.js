import React, {Fragment} from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import Button from "../UI/Button/Button";
import Modal from "../modal/Modal";
import Input from "../UI/Forms/Input";
import { StyledForm } from "../UI/Wrappers/Wrappers";

import * as actions from "../../store/actions/actions";


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

const PriorityWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;
const BudgetSchema = Yup.object().shape({
    amount: Yup.number().required("This item is required")
  });

const SetBudget = ({ maxBudget, loading, error, opened, close, setBudget, editBudget }) => {
  return (
    <Fragment>
      <Modal opened={opened} close={close}>
        <h1>Set Your Budget</h1>
        <h4>What do you want to spend each month?</h4>
        <Formik
          initialValues={{
            amount: maxBudget ? maxBudget : "",
            id: maxBudget ? maxBudget.id : "",
          }}
          validationSchema={BudgetSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            maxBudget ? await editBudget(values) : 
            await setBudget(values); close(); resetForm();
          }}
        >
          {({ isSubmitting, isValid, resetForm}) => (
            <StyledForm>
              <Field
              type="number"
              name="amount"
              placeholder="What is your monthly budget..."
              component={Input}
            />

              <ButtonsWrapper>
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
              </ButtonsWrapper>
              <MessageWrapper></MessageWrapper>
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
  editBudget: actions.editBudget
};

export default connect(mapStateToProps, mapDispatchToProps)(SetBudget);

