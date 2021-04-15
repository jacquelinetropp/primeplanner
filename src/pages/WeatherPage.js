import React, { Fragment } from 'react';
import Calendar from '../components/Calendar/Calendar';
import JournalCategories from '../components/layout/Journal/JournalCategories/JournalCategories';
import JournalMain from '../components/layout/Journal/JournalMain/JournalMain';
import JournalSidebar from '../components/layout/Journal/JournalSidebar/JournalSidebar';
import { JournalWrapper } from '../components/UI/Wrappers/Wrappers';

//Categories: Type of weather - 5 day, 48hr,
//Main: Displaying each weather

const WeatherPage = () => {
    return (
       <Fragment>
            <JournalCategories categories={['7 day', '48hours']}/>
            <Calendar />
       
       </Fragment>
    )
}

export default WeatherPage
