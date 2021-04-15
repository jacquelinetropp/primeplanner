import React, { Fragment } from 'react'
import Calendar from '../components/Calendar/Calendar'
import JournalCategories from '../components/layout/Journal/JournalCategories/JournalCategories'

const CalendarPage = () => {
    return (
        <Fragment>
            <JournalCategories />
            <Calendar />            
        </Fragment>
    )
}

export default CalendarPage
