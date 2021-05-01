import React, { useState } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';

import styled from "styled-components";
import InputProject from "../layout/Projects/InputProject";
import * as actions from "../../store/actions/actions";
import JournalTag from "../JournalTags/JournalTag";
import {StyledEdit, StyledDelete} from '../UI/Wrappers/Wrappers';

const Wrapper = styled.div`
  width: 100%;
    display: flex;
    align-items: center;

  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  z-index: 0;

  &:hover {
   background-color: ${({ bcolor }) => {
    if (bcolor === "yellow") return "var(--color-tertiary)";
    else if (bcolor === "pink") return "var(--color-mainLight)";
    else if (bcolor === "green") return "var(--color-second)";
    else if (bcolor === "none") return "";
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
    <Wrapper active={active}>
      <JournalTag  onClick={() => (getTodos(project.id), getOneProject(project.id))} link={`/project/${project.id}`} name={project.name} bcolor/>
      <Controls>
        {" "}
        <StyledEdit 
          onClick={() => setIsEditing(true)}
        />
        <StyledDelete
          onClick={() => setIsDeleting(true)}
        />
      </Controls>
    
      <InputProject
        project={project}
        opened={isEditing}
        close={() => setIsEditing(false)}
      />
    </Wrapper>
  );
};

const mapDispatchToProps = {
  editProject: actions.editProject,
  cleanUp: actions.projectCleanUp,
  getTodos: actions.getTodos,
  getOneProject: actions.getOneProject
};

export default connect(null, mapDispatchToProps)(SingleProject);
