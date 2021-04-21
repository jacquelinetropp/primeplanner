import React, { Fragment } from "react";
import JournalCategories from "../../components/layout/Journal/JournalCategories/JournalCategories";
import JournalTag from "../../components/JournalTags/JournalTag";

const CalendarPage = () => {
  return (
    <Fragment>
      <JournalCategories title="Calendar">
        <JournalTag link="/weather/current" name ="Current Details" />
        <JournalTag link="/weather/daily" name="Daily" color="green"/>
        <JournalTag link="/weather/hourly" name="Hourly" color="pink"/>
      </JournalCategories>
    </Fragment>
  );
};

export default CalendarPage;