import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

import Modal from "../../modal/Modal";
import Button from "../../UI/Button/Button";
import { withRouter } from "react-router-dom";

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

const TodoWrapper = styled.div`
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
  history
}) => {
  return (
    <Modal opened={show} close={close}>
      <h1>
        Deleting Project
      </h1>
      <h4>
        Are you sure you want to delete this todo?
      </h4>
      <TodoWrapper>{project.name}</TodoWrapper>
      <ButtonsWrapper>
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
      </ButtonsWrapper>
      
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteProject));
