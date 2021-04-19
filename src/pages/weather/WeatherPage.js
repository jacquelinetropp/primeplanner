import React, { Fragment } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import JournalCategories from '../../components/layout/Journal/JournalCategories/JournalCategories';
import JournalCategory from '../../components/JournalCategory/JournalCategory';
import AddButton from '../../components/UI/Button/AddButton';


const WeatherPage = () => {
    return (
       <Fragment>
            <JournalCategories disabled>
                <JournalCategory link="/weather/current">Current Details</JournalCategory>
                <JournalCategory link="/weather/daily">7 day</JournalCategory>
                <JournalCategory link="/weather/hourly">48 hours</JournalCategory>
                <AddButton disabled>Add Page</AddButton>
            </JournalCategories>   
       </Fragment>
    )
}

export default WeatherPage;
