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

const PriorityWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;
const BudgetSchema = Yup.object().shape({
    name: Yup.string().required("The item is required.").min(2, "Too short."),
    amount: Yup.number().required("This item is required")
  });

const InputBudgetItem = ({ item, loading, error, opened, close, addBudgetItem, editBudgetItem }) => {
  const inputStyles = {
    maxWidth: 320,
  };

  return (
    <Fragment>
      <Modal opened={opened} close={close}>
        <h1>Add Your Item</h1>
        <h4>Please add date and amount</h4>
        <Formik
          initialValues={{
            name: item ? item.name : "",
            amount: item ? item.price : "",
            date: item ? item.date : new Date(),
          }}
          validationSchema={BudgetSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
           item ? await editBudgetItem(values, item.id) :
            await addBudgetItem(values); close(); resetForm();
          }}
        >
          {({ isSubmitting, isValid, resetForm, values, setFieldValue }) => (
            <StyledForm>
              <Field
                type="text"
                name="name"
                placeholder="Write your item..."
                component={Input}
              />
              <Field
              type="number"
              name="amount"
              placeholder="How much was this..."
              component={Input}
            />

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
                  loading={loading ? "loading..." : null}
                >
                  {item ? "Edit Budget Item" : "Add Budget Item"}
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
  addBudgetItem: actions.addBudgetItem,
  editBudgetItem: actions.editBudgetItem
};

export default connect(mapStateToProps, mapDispatchToProps)(InputBudgetItem);
