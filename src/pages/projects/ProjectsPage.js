import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import JournalCategories from "../../components/layout/Journal/JournalCategories/JournalCategories";
import JournalCategory from "../../components/JournalCategory/JournalCategory";
import * as actions from "../../store/actions/actions";
import styled from "styled-components";
import InputProject from "../../components/layout/Projects/InputProject";

import AddButton from "../../components/UI/Button/AddButton";
import SingleProject from "../../components/SingleProject/SingleProject";
import { withRouter } from "react-router-dom";

const ProjectsPage = ({ projects, getProjects, loading, history }) => {
  useEffect(() => {
    getProjects();
  }, []);

  const [isAdding, setIsAdding] = useState(false);

  const newId = history.location.pathname.slice(9);
  
  let content;
  if (!projects || loading) {
    content = <Fragment>Loading</Fragment>;
  } else if (projects.length === 0) {
    content = <div>No projects</div>;
  } else {
    content = (
      <Fragment>
        {projects.map((project) => {
          if (project.id === newId) {
            return <SingleProject key={project.id} project={project} active />;
          } else {
            return <SingleProject key={project.id} project={project} />;
          }
        })}
      </Fragment>
    );
  }
  return (
    <Fragment>
      {" "}
      <JournalCategories title="Projects" action={() => setIsAdding(true)}>
        {content}
      </JournalCategories>
      <InputProject opened={isAdding} close={() => setIsAdding(false)} />
    </Fragment>
  );
};

const mapStateToProps = ({ projects }) => ({
  projects: projects.projects,
  loading: projects.loading,
});

const mapDispatchToProps = {
  getProjects: actions.getProjects,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectsPage)
);
