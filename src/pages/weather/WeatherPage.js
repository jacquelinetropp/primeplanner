import React, { Fragment } from "react";
import JournalCategories from "../../components/layout/Journal/JournalCategories/JournalCategories";
import JournalTag from "../../components/JournalTags/JournalTag";
import { TiWeatherPartlySunny } from "react-icons/ti";

const WeatherPage = () => {
  return (
    <Fragment>
      <JournalCategories name="Weather" icon={<TiWeatherPartlySunny />} hidden>
        <JournalTag link="/weather/current" name="Current Details" />
        <JournalTag link="/weather/daily" name="Daily" color="green" />
        <JournalTag link="/weather/hourly" name="Hourly" color="pink" />
      </JournalCategories>
    </Fragment>
  );
};

export default WeatherPage;
