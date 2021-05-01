import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import Button from "../../UI/Button/Button";
import Modal from "../../modal/Modal";
import Input from "../../UI/Forms/Input";
import { StyledForm } from "../../UI/Wrappers/Wrappers";

import * as actions from "../../../store/actions/actions";
import { useParams } from "react-router-dom";

import { DateTimePicker } from "react-rainbow-components";

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

  const inputStyles = {
    maxWidth: 320,
  };

  const [date, setDate] = useState(new Date());

  return (
    <Fragment>
      <Modal opened={opened} close={close}>
        <h1>{todo ? "Edit your task" : "Add your new task"}</h1>
        <h4>{todo ? "Change your task here" : "Type your task here"}</h4>
        <Formik
          initialValues={{
            todo: todo ? todo.todo : "",
          }}
          validationSchema={TodoSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // send our todo
            const res = todo
              ? (await editTodo(todo.id, values, date), close())
              : (await addTodo(values, id, date), close(), resetForm());
            // close();
            // resetForm();
          }}
        >
          {({ isSubmitting, isValid, resetForm }) => (
            <StyledForm>
              <Field
                type="text"
                name="todo"
                placeholder="Write your task..."
                component={Input}
              />
              <PriorityWrapper>
                <h6>Priority</h6>
                <Field as="select" name="priority">
                  <option value="none">select</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Field>
              </PriorityWrapper>
              {todo ? (
                ""
              ) : (
                <DateTimePicker
                  formatStyle="large"
                  value={date}
                  label="Due Date"
                  onChange={(value) => setDate(value)}
                  className="rainbow-m-around_small"
                  style={inputStyles}
                />
              )}

              <ButtonsWrapper>
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
              </ButtonsWrapper>
              <MessageWrapper></MessageWrapper>
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
