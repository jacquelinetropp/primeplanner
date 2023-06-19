import React, { Fragment } from 'react';
import JournalCategories from './JournalCategories/JournalCategories';
import JournalMain from './JournalMain/JournalMain';
import JournalSidebar from './JournalSidebar/JournalSidebar';

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
