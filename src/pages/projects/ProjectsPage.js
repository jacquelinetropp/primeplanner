import React, { Fragment, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import Calendar from '../../components/Calendar/Calendar';
import JournalCategories from '../../components/layout/Journal/JournalCategories/JournalCategories';
import JournalCategory from '../../components/JournalCategory/JournalCategory';
import * as actions from '../../store/actions/actions';

import AddButton from '../../components/UI/Button/AddButton';


const ProjectsPage = ({projects, getProjects, loading}) => {
    useEffect(() => {
        getProjects()
    }, []);

    const [isAdding, setIsAdding] = useState(false);

    console.log(isAdding);

    let content;
    if (!projects || loading) {
        content = (
            <JournalCategories>Loading</JournalCategories>
        )
    } else if (projects.length === 0) {
        content = (
            <JournalCategories>No projects
            <AddButton action={() =>setIsAdding(true)}>Add Page</AddButton></JournalCategories>
        )
    } else {
        content = (
            <JournalCategories action={() => setIsAdding(true)}>
                {projects.map((project) => (
                    <div>Single project</div>
                ))}
                <AddButton>Add Page</AddButton>
            </JournalCategories>
        )
    }
    return (
       <Fragment>
           {content}  
       </Fragment>
    )
};

const mapStateToProps = ({projects}) => ({
    projects: projects.projects,
    loading: projects.loading
})

const mapDispatchToProps = {
    getProjects: actions.getProjects
    
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);