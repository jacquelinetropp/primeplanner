import React, { Fragment } from "react";
import JournalCategories from "../../components/layout/Journal/JournalCategories/JournalCategories";
import JournalTag from "../../components/JournalTags/JournalTag";

const CalendarPage = () => {
  return (
    <Fragment>
      <JournalCategories title="Calendar" hidden>
        <JournalTag link="/calendar/monthly" name ="Monthly" />
        <JournalTag link="/calendar/weekly" name="Weekly" color="green"/>
        <JournalTag link="/calendar/daily" name="Daily" color="pink"/>
      </JournalCategories>
    </Fragment>
  );
};

export default CalendarPage;