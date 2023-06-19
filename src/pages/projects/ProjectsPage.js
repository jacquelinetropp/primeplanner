import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import JournalCategories from "../../components/layout/Journal/JournalCategories/JournalCategories";
import * as actions from "../../store/actions/actions";
import InputProject from "../../components/layout/Projects/InputProject";

import SingleProject from "../../components/SingleProject/SingleProject";
import { withRouter } from "react-router-dom";
import LoadingCircle from "../../components/Loading/Loading";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

const ProjectsPage = ({ projects, getProjects, loading, history }) => {
  useEffect(() => {
    getProjects();
  }, []);

  const [isAdding, setIsAdding] = useState(false);

  const newId = history.location.pathname.slice(9);

  let content;
  if (!projects || loading) {
    content = <LoadingCircle />;
  } else if (projects.length === 0) {
    content = <h6 className="center">No projects</h6>;
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
      <JournalCategories
        text="Add Project"
        name="Projects"
        icon={<AiOutlineFundProjectionScreen />}
        action={() => setIsAdding(true)}
        color
      >
        {content}
      </JournalCategories>
      <InputProject opened={isAdding} close={() => setIsAdding(false)} />
    </Fragment>
  );
};

const mapStateToProps = ({ projects }) => ({
  projects: projects.projects,
  loading: projects.getProject.loading,
});

const mapDispatchToProps = {
  getProjects: actions.getProjects,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectsPage)
);
