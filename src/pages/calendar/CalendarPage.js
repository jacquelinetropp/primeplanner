import React, { Fragment } from "react";
import JournalCategories from "../../components/layout/Journal/JournalCategories/JournalCategories";
import JournalTag from "../../components/JournalTags/JournalTag";
import { BsFillCalendarFill } from "react-icons/bs";

const CalendarPage = () => {
  return (
    <Fragment>
      <JournalCategories name="Calendar" icon={<BsFillCalendarFill />} hidden>
        <JournalTag link="/calendar/monthly" name="Monthly" />
        <JournalTag link="/calendar/weekly" name="Weekly" color="green" />
        <JournalTag link="/calendar/daily" name="Daily" color="pink" />
      </JournalCategories>
    </Fragment>
  );
};

export default CalendarPage;
