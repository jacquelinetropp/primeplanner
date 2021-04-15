import React, { Fragment } from 'react';
import styled from 'styled-components';
import JournalCategories from './JournalCategories/JournalCategories';
import JournalMain from './JournalMain/JournalMain';
import JournalSidebar from './JournalSidebar/JournalSidebar';

const JournalWrapper = styled.div`
    grid-column: 1/-1;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 0 2rem rgba(0,0,0, 0.3);

    display: grid;
    grid-template-columns: 150px 150px auto;
`;


const Journal = () => {
    return (
        <Fragment>
            <JournalSidebar />
            <JournalCategories />
            <JournalMain />
        </Fragment>
    )
}

export default Journal
