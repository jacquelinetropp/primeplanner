import React, { useState } from "react";
import { connect } from "react-redux";

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

  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  z-index: 0;

  background-color: ${({ active }) => (active ? "#cccccc" : "transparent")};

  &:hover {
    background-color: ${({ bcolor }) => {
      if (bcolor === "yellow") return "var(--color-tertiary)";
      else if (bcolor === "pink") return "var(--color-mainLight)";
      else if (bcolor === "green") return "var(--color-second)";
      else return "var(--color-main)";
    }};
  }
`;
const Controls = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
`;

const SingleProject = ({ project, active, getTodos, getOneProject }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Wrapper active={active} bcolor={project.color}>
      <JournalTag
        color={project.color}
        onClick={() => (getTodos(project.id), getOneProject(project.id))}
        link={`/project/${project.id}`}
        name={project.name}
      />
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
