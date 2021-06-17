import React, { Fragment } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import Button from "../../UI/Button/Button";
import Modal from "../../modal/Modal";
import Input from "../../UI/Forms/Input";
import {
  StyledForm,
  StyledSelectField,
  FormButtonsWrapper,
  MessageWrapper
} from "../../UI/Wrappers/Wrappers";

import * as actions from "../../../store/actions/actions";
import { useParams } from "react-router-dom";
import DatePickerField from "../../DatePicker/DatePicker";
import Message from "../../UI/Forms/Message";

const TodoSchema = Yup.object().shape({
  todo: Yup.string().required("The todo is required.").min(2, "Too short."),
});

const InputTodo = ({
  todo,
  addTodo,
  loading,
  error,
  opened,
  close,
  editTodo,
}) => {
  const { id } = useParams();
  const loadingText = todo ? "Editing..." : "Adding...";

  return (
    <Fragment>
      <Modal opened={opened} close={close}>
        <h1>{todo ? "Edit your task" : "Add your new task"}</h1>
        <h4>{todo ? "Change your task here" : "Type your task here"}</h4>
        <Formik
          initialValues={{
            todo: todo ? todo.todo : "",
            date: todo ? todo.dueDate : new Date(),
            priority: todo ? todo.priority : "high",
          }}
          validationSchema={TodoSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // send our todo
            const res = todo
              ? (await editTodo(todo.id, values), close())
              : (await addTodo(values, id), close(), resetForm());
          }}
        >
          {({ isSubmitting, isValid, resetForm, values, setFieldValue }) => (
            <StyledForm>
              <Field
                type="text"
                name="todo"
                placeholder="Write your task..."
                component={Input}
              />
              <StyledSelectField>
                <h6>Priority</h6>
                <Field as="select" name="priority">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
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
                  {todo ? "Edit Task" : "Add Task"}
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

const mapStateToProps = ({ todos }) => ({
  loading: todos.loading,
  error: todos.error,
});

const mapDispatchToProps = {
  addTodo: actions.addTodo,
  editTodo: actions.editTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTodo);
