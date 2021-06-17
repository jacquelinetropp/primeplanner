import React, { Fragment } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import Button from "../../UI/Button/Button";
import Modal from "../../modal/Modal";
import Input from "../../UI/Forms/Input";
import { StyledForm, StyledSelectField, FormButtonsWrapper, MessageWrapper } from "../../UI/Wrappers/Wrappers";

import * as actions from "../../../store/actions/actions";
import Message from "../../UI/Forms/Message";

const ProjectSchema = Yup.object().shape({
  project: Yup.string()
    .required("The project is required.")
    .min(2, "Too short."),
});

const InputProject = ({
  project,
  addProject,
  loading,
  error,
  opened,
  close,
  editProject,
}) => {
  const loadingText = project ? "Editing..." : "Adding...";

  return (
    <Fragment>
      <Modal opened={opened} close={close}>
        <h1>{project ? "Edit your project" : "Add your new Project"}</h1>
        <h4>
          {project ? "Change your project here" : "Type your project here"}
        </h4>
        <Formik
          initialValues={{
            project: project ? project.name : "",
            color: project ? project.color : "blue",
          }}
          validationSchema={ProjectSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // send our project
            const res = project
              ? await editProject(project.id, values)
              : (await addProject(values), close(), resetForm());
          }}
        >
          {({ values, handleChange, isSubmitting, isValid, resetForm }) => (
            <StyledForm>
              <Field
                type="text"
                name="project"
                placeholder={project ? project.name : "Write your project..."}
                onChange={handleChange}
                value={values.project}
                component={Input}
              />
              <StyledSelectField>
                <h6>Color</h6>
                <Field as="select" name="color">
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="pink">Pink</option>
                </Field>
              </StyledSelectField>
              <FormButtonsWrapper>
                <Button
                  contain
                  color="main"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  loading={loading ? loadingText : null}
                >
                  {project ? "Edit Project" : "Add Project"}
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

const mapStateToProps = ({ projects }) => ({
  loading: projects.loading,
  error: projects.error,
});

const mapDispatchToProps = {
  addProject: actions.addProject,
  editProject: actions.editProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputProject);
