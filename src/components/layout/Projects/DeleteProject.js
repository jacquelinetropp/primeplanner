import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

import Modal from "../../modal/Modal";
import Button from "../../UI/Button/Button";
import { withRouter } from "react-router-dom";
import { MessageWrapper, FormButtonsWrapper } from "../../UI/Wrappers/Wrappers";
import Message from "../../UI/Forms/Message";

const ProjectWrapper = styled.div`
  margin: 1rem 0rem;
  font-size: 1.3rem;
  text-align: center;
  color: var(--color-white);
`;

const DeleteProject = ({
  show,
  close,
  project,
  deleteProject,
  loading,
  error,
  history,
}) => {
  return (
    <Modal opened={show} close={close}>
      <h1>Deleting Project</h1>
      <h4>Are you sure you want to delete this todo?</h4>
      <ProjectWrapper>{project.name}</ProjectWrapper>
      <FormButtonsWrapper>
        <Button
          contain
          color="red"
          onClick={() => {
            deleteProject(project.id);
            history.push("/");
          }}
          disabled={loading}
          loading={loading ? "Deleting..." : null}
        >
          Delete
        </Button>
        <Button type="button" color="main" contain onClick={close}>
          Cancel
        </Button>
      </FormButtonsWrapper>
      <MessageWrapper>
        <Message error show={error}>
          {error}
        </Message>
      </MessageWrapper>
    </Modal>
  );
};

const mapStateToProps = ({ projects }) => ({
  error: projects.deleteProject.error,
  loading: projects.deleteProject.loading,
});

const mapDispatchToProps = {
  deleteProject: actions.deleteProject,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeleteProject)
);
