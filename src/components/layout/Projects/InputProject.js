import React, { Fragment } from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import Button from "../../UI/Button/Button";
import Modal from "../../modal/Modal";
import Input from "../../UI/Forms/Input";
import { StyledForm } from "../../UI/Wrappers/Wrappers";

import * as actions from "../../../store/actions/actions";

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

const ColorWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

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
  cleanUp,
  getProjects,
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
              <ColorWrapper>
                <h6>Color</h6>
                <Field as="select" name="color">
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="pink">Pink</option>
                </Field>
              </ColorWrapper>
              <ButtonsWrapper>
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
              </ButtonsWrapper>
              <MessageWrapper></MessageWrapper>
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
  cleanUp: actions.projectCleanUp,
  getProjects: actions.getProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputProject);
