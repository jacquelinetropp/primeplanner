import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import JournalMain from "../../components/layout/Journal/JournalMain/JournalMain";
import Calendar1 from "../../components/Calendar/Calendar1";
import AddButton from "../../components/UI/Button/AddButton";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";

const WorkoutPage = ({ getWorkouts, workouts }) => {
  useEffect(() => {
    getWorkouts();
  }, []);
  const [isAdding, setIsAdding] = useState(false);
  return (
    <JournalMain>
      <Calendar1 workouts={workouts}/>
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
