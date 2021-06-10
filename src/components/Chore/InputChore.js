import React, { Fragment } from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import Button from "../UI/Button/Button";
import Modal from "../modal/Modal";
import Input from "../UI/Forms/Input";
import { StyledForm } from "../UI/Wrappers/Wrappers";

import * as actions from "../../store/actions/actions";
import { useParams } from "react-router-dom";

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

const ChoreSchema = Yup.object().shape({
  chore: Yup.string().required("The chore is required.").min(2, "Too short."),
});

const InputChore = ({
  chore,
  addChore,
  loading,
  error,
  opened,
  close,
}) => {
  const { id } = useParams();
  const loadingText = chore ? "Editing..." : "Adding...";

  const inputStyles = {
    maxWidth: 320,
  };

  let numbers = [];
  function getNumber() {
    for (let i = 0; i < 31; i++) {
      numbers.push(i + 1);
    }
  }
  getNumber();

  return (
    <Fragment>
      <Modal opened={opened} close={close}>
        <h1>{chore ? "Edit your chore" : "Add your new chore"}</h1>
        <h4>{chore ? "Change your chore here" : "Type your task chore"}</h4>
        <Formik
          initialValues={{
            chore: chore ? chore.chore : "",
            frequency: chore ? chore.frequency : 1,
            amount: chore ? chore.amount : "days",
            color: chore ? chore.color : "blue",
          }}
          validationSchema={ChoreSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // send our chore
            // const res = chore
            //   ? (await editTodo(chore.id, values), close())
            //   : (await addChore(values, id), close(), resetForm());
            await addChore(values,id); close(); resetForm();
          }}
        >
          {({ isSubmitting, isValid, resetForm, }) => (
            <StyledForm>
              <Field
                type="text"
                name="chore"
                placeholder="Write your chore..."
                component={Input}
              />
              <PriorityWrapper>
                <h6>Frequency</h6>
                <div>
                <Field as="select" name="frequency">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </Field>
                <Field as="select" name="amount">
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="months">months</option>
                </Field>
                </div>
              </PriorityWrapper>

              <PriorityWrapper>
              <h6>Color</h6>
              <Field as="select" name="color">
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="pink">Pink</option>
              </Field>
            </PriorityWrapper>

              <ButtonsWrapper>
                <Button
                  contain
                  color="main"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  loading={loading ? loadingText : null}
                >
                  {chore ? "Edit Chore" : "Add Chore"}
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
  addChore: actions.addChores,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputChore);
