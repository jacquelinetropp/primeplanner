import React, { Fragment } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import Button from "../UI/Button/Button";
import Modal from "../modal/Modal";
import Input from "../UI/Forms/Input";
import { StyledForm, StyledSelectField, FormButtonsWrapper, MessageWrapper } from "../UI/Wrappers/Wrappers";

import * as actions from "../../store/actions/actions";
import { useParams } from "react-router-dom";
import DatePickerField from "../DatePicker/DatePicker";
import Message from "../UI/Forms/Message";

const WorkoutSchema = Yup.object().shape({
    name: Yup.string().required("The todo is required.").min(2, "Too short."),
  });

const WorkoutForm = ({
  todo,
  addWorkout,
  loading,
  error,
  opened,
  close,
}) => {
  const { id } = useParams();
  const loadingText = todo ? "Editing..." : "Adding...";

  const inputStyles = {
    maxWidth: 320,
  };

  return (
    <Fragment>
      <Modal opened={opened} close={close}>
        <h1>{todo ? "Edit your task" : "Add your new task"}</h1>
        <h4>{todo ? "Change your task here" : "Type your task here"}</h4>
        <Formik
          initialValues={{
            name: "",
            date: new Date(),
            type: "strength",
          }}
          validationSchema={WorkoutSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
          
            const res =  await addWorkout(values, id); close(); resetForm();
          }}
        >
          {({ isSubmitting, isValid, resetForm, values, setFieldValue }) => (
            <StyledForm>
              <Field
                type="text"
                name="name"
                placeholder="Write your workout..."
                component={Input}
              />
              <StyledSelectField>
                <h6>Type</h6>
                <Field as="select" name="type">
                  <option value="strength">Strength</option>
                  <option value="cardio">Cardio</option>
                  <option value="recovery">Recovery</option>
                  <option value="HIIT">HIIT</option>
                </Field>
              </StyledSelectField>

              <DatePickerField
                name="date"
                value={values.date}
                onChange={setFieldValue}
              />

              <FormButtonsWrapper>
                <Button
                  contain
                  color="main"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  loading={loading ? loadingText : null}
                >
                  Add Workout
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

const mapStateToProps = ({ house }) => ({
  loading: house.workouts.loading,
  error: house.workouts.error,
});

const mapDispatchToProps = {
  addWorkout: actions.addWorkout,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutForm);

