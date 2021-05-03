import React, { Fragment } from "react";
import JournalCategories from "../../components/layout/Journal/JournalCategories/JournalCategories";
import JournalTag from "../../components/JournalTags/JournalTag";

const CalendarPage = () => {
  return (
    <Fragment>
      <JournalCategories title="Calendar">
        <JournalTag link="/weather/current" name ="Monthly" />
        <JournalTag link="/weather/daily" name="Weekly" color="green"/>
        <JournalTag link="/weather/hourly" name="Daily" color="pink"/>
      </JournalCategories>
    </Fragment>
  );
};

export default CalendarPage;