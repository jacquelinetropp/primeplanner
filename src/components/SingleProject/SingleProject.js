import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";
import InputProject from "../layout/Projects/InputProject";
import * as actions from "../../store/actions/actions";
import JournalTag from "../JournalTags/JournalTag";
import { StyledEdit, StyledDelete } from "../UI/Wrappers/Wrappers";
import DeleteProject from "../layout/Projects/DeleteProject";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  z-index: 0;
  color: ${({ active }) =>
    active ? "var(--color-main)" : "var(--color-white)"};
  background-color: ${({ active }) => (active ? "#cccccc" : "transparent")};
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  color: ${({ active }) =>
    active ? "var(--color-main)" : "var(--color-white)"};
`;

const SingleProject = ({ project, active, getTodos, getOneProject }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Wrapper active={active} bcolor={project.color}>
      <StyledLink
        onClick={() => (getTodos(project.id), getOneProject(project.id))}
        to={`/project/${project.id}`}
        active={active}
      >
        {project.name}
      </StyledLink>

      <Controls>
        {" "}
        <StyledEdit onClick={() => setIsEditing(true)} />
        <StyledDelete onClick={() => setIsDeleting(true)} />
      </Controls>

      <InputProject
        project={project}
        opened={isEditing}
        close={() => setIsEditing(false)}
      />
      <DeleteProject
        project={project}
        show={isDeleting}
        close={() => setIsDeleting(false)}
      />
    </Wrapper>
  );
};

const mapDispatchToProps = {
  editProject: actions.editProject,
  cleanUp: actions.projectCleanUp,
  getTodos: actions.getTodos,
  getOneProject: actions.getOneProject,
};

export default connect(null, mapDispatchToProps)(SingleProject);
