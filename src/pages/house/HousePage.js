import React, { Fragment } from "react";
import JournalCategories from "../../components/layout/Journal/JournalCategories/JournalCategories";
import JournalTag from "../../components/JournalTags/JournalTag";

import { BsFillHouseDoorFill } from "react-icons/bs";

const HousePage = () => {
  return (
    <Fragment>
      <JournalCategories hidden name="Household" icon={<BsFillHouseDoorFill />}>
        <JournalTag link="/house/chores" name="Chores" />
        <JournalTag link="/house/workouts" name="Workouts" color="green" />
        <JournalTag link="/house/budget" name="Budget" color="pink" />
      </JournalCategories>
    </Fragment>
  );
};

export default HousePage;
