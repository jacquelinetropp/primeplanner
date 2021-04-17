import React, { Fragment } from 'react'
import JournalMain from '../../components/layout/Journal/JournalMain/JournalMain'
import WeatherPage from './WeatherPage'

const CurrentDetails = () => {
    return (
        <Fragment>
            <WeatherPage />
            <JournalMain>Testing</JournalMain>
        </Fragment>
    )
}

export default CurrentDetails
