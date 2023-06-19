import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import JournalMain from "../../components/layout/Journal/JournalMain/JournalMain";
import Calendar from "../../components/Calendar/Calendar";
import AddButton from "../../components/UI/Button/AddButton";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";

const WorkoutPage = ({ getWorkouts, workouts }) => {
  useEffect(() => {
    getWorkouts();
  }, []);
  const [isAdding, setIsAdding] = useState(false);
  return (
    <JournalMain>
      <Calendar workouts={workouts} />
      <AddButton action={() => setIsAdding(true)}>Add Workout</AddButton>
      <WorkoutForm opened={isAdding} close={() => setIsAdding(false)} />
    </JournalMain>
  );
};

const mapStateToProps = ({ house }) => ({
  workouts: house.workouts.workoutList,
});

const mapDispatchToProps = {
  getWorkouts: actions.getWorkouts,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutPage);
