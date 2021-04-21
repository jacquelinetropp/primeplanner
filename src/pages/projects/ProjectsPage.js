import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Calendar from "../../components/Calendar/Calendar";
import JournalCategories from "../../components/layout/Journal/JournalCategories/JournalCategories";
import JournalCategory from "../../components/JournalCategory/JournalCategory";
import * as actions from "../../store/actions/actions";
import styled from "styled-components";

import AddButton from "../../components/UI/Button/AddButton";

const ProjectsPage = ({ projects, getProjects, loading }) => {
  useEffect(() => {
    getProjects();
  }, []);

  const [isAdding, setIsAdding] = useState(false);

  console.log(isAdding);

  let content;
  if (!projects || loading) {
    content = <Fragment>Loading</Fragment>;
  } else if (projects.length === 0) {
    content = (
    <div>
        No projects
        </div>
    );
  } else {
    content = (
      <Fragment>
        {projects.map((project) => (
          <div>Single project</div>
        ))}
        </Fragment>
   
    );
  }
  return <Fragment> <JournalCategories title="Projects" action={() => setIsAdding(true)}>
    {content}
  </JournalCategories>
  </Fragment>;
};

const mapStateToProps = ({ projects }) => ({
  projects: projects.projects,
  loading: projects.loading,
});

const mapDispatchToProps = {
  getProjects: actions.getProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
