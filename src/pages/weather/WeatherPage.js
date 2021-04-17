import React, { Fragment } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import JournalCategories from '../../components/layout/Journal/JournalCategories/JournalCategories';
import JournalMain from '../../components/layout/Journal/JournalMain/JournalMain';
import JournalSidebar from '../../components/layout/Journal/JournalSidebar/JournalSidebar';
import { JournalWrapper } from '../../components/UI/Wrappers/Wrappers';
import {Switch, Route} from 'react-router-dom';
import JournalCategory from '../../components/JournalCategory/JournalCategory';

//Categories: Type of weather - 5 day, 48hr,
//Main: Displaying each weather
//Make sure to disable add page button

const WeatherPage = () => {
    console.log('rendering');
    return (
       <Fragment>
            <JournalCategories disabled>
                <JournalCategory link="/current">Current Details</JournalCategory>
                <JournalCategory link="/7day">7 day</JournalCategory>
                <JournalCategory link="/48hr">48 hours</JournalCategory>
            </JournalCategories>   
       </Fragment>
    )
}

export default WeatherPage
