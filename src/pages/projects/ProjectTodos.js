import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import styled from "styled-components";

import InputTodo from "../../components/layout/Projects/InputTodos";
import JournalMain from "../../components/layout/Journal/JournalMain/JournalMain";
import AddButton from "../../components/UI/Button/AddButton";
import { useParams } from "react-router";
import {
  StyledEdit,
  StyledDelete,
} from "../../components/UI/Wrappers/Wrappers";
import InputProject from "../../components/layout/Projects/InputProject";
import SingleTodo from "../../components/SingleTodo/SingleTodo";
import LoadingCircle from "../../components/Loading/Loading";
import DeleteProject from "../../components/layout/Projects/DeleteProject";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Controls = styled.div`
  margin-top: 2px;
  margin-left: 10px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  flex-direction: column;
  margin-top: 2rem;
`;

const ProjectTodos = ({
  getTodos,
  currentTodos,
  loading,
  getOneProject,
  currentProject,
}) => {
  const { id } = useParams();
  useEffect(() => {
    getOneProject(id);
    getTodos(id);
  }, []);

  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  let content;

  if (!currentTodos || loading) {
    content = (
      <Content>
        <LoadingCircle />
      </Content>
    );
  } else if (currentTodos.length === 0) {
    content = (
      <Content>
        <h6>No Tasks. Please Add a task.</h6>
      </Content>
    );
  } else {
    content = (
      <Content>
        {currentTodos.map((todo) => (
          <SingleTodo key={todo.id} todo={todo}/>
        ))}
      </Content>
    );
  }

  return (
    <JournalMain>
      <Wrapper>
        <HeaderWrapper>
          <h1>{currentProject.name}</h1>
          <Controls>
            <StyledEdit onClick={() => setIsEditing(true)} />
            <StyledDelete onClick={() => setIsDeleting(true)} />
          </Controls>
        </HeaderWrapper>
        <InputProject
          project={currentProject}
          opened={isEditing}
          close={() => setIsEditing(false)}
        />
        <DeleteProject
            project={currentProject}
            show={isDeleting}
            close={() => setIsDeleting(false)} />
        {content}

        <AddButton action={() => setIsAdding(true)}>Add Task</AddButton>
        <InputTodo opened={isAdding} close={() => setIsAdding(false)} />
      </Wrapper>
    </JournalMain>
  );
};
const mapStateToProps = ({ todos, projects }) => ({
  currentTodos: todos.currentTodos,
  loading: todos.loading,
  currentProject: projects.currentProject,
});

const mapDispatchToProps = {
  getOneProject: actions.getOneProject,
  getTodos: actions.getTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTodos);
