import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import { Fragment } from "react";
import LoadingCircle from "../Loading/Loading";
import TaskPostItBox from "./TaskPostItBox";
import { setOverdueTasks, todaysTasks } from "../../utils/HelperFunctions";

const PostWrapper = styled.div`
  border-radius: 5px;
  grid-column: 1/5;
  padding: 1rem;
  position: relative;

  @media only screen and (max-width: 768px) {
    grid-column: 1/-1;
  }
`;

const Header = styled.h2`
  font-size: 2.2rem;
  grid-column: 1/-1;
`;

const PostContent = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TaskPostit2 = ({
  todos,
  getAllTodos,
  loading,
  getChores,
  chores,
  getWorkouts,
  workouts,
}) => {
  useEffect(() => {
    getAllTodos();
    getChores();
    getWorkouts();
  }, []);

  const today = new Date().toDateString();
  const overdueTasts = setOverdueTasks(todos);
  const todayLength = todaysTasks(todos).length;

  let content;
  if (loading || !todos || !chores || !workouts) {
    content = <LoadingCircle />;
  } else {
    let tasks = [];
    todos.map((todo) => {
      const date = todo.dueDate;
      const structuredDate = new Date(date).toDateString();
      if (structuredDate === today && todo.priority === "high") {
        tasks.push(todo);
      }
    });
    //put chores in array
    let choresList = [];
    chores.map((chore) => {
      const date = chore.nextDate;
      const structuredDate = new Date(date).toDateString();
      if (structuredDate === today) {
        choresList.push(chore);
      }
    });

    //put workout into array
    let workoutList = [];
    workouts.map((workout) => {
      const date = workout.date;
      const structuredDate = new Date(date).toDateString();
      if (structuredDate === today) {
        workoutList.push(workout);
      }
    });
    content = (
      <Fragment>
        <TaskPostItBox
          name="Outstanding Tasks"
          number={overdueTasts.length}
          color="var(--color-second)"
        />
        <TaskPostItBox
          name="Tasks Due Today"
          number={todayLength}
          color="var(--color-quad)"
        />
        <TaskPostItBox
          name="Chores Due Today"
          number={choresList.length}
          color="var(--color-tertiary)"
        />
        <TaskPostItBox
          name="Workouts Due Today"
          number={workoutList.length}
          color="var(--color-main)"
        />
      </Fragment>
    );
  }

  return (
    <PostWrapper>
      <PostContent>
        <Header className="center">Welcome!</Header>
        <Fragment>{content}</Fragment>
      </PostContent>
    </PostWrapper>
  );
};

const mapStateToProps = ({ todos, house }) => ({
  todos: todos.allTodos,
  loading: todos.loading,
  chores: house.chores,
  workouts: house.workouts.workoutList,
});

const mapDispatchToProps = {
  getAllTodos: actions.getAllTodos,
  getChores: actions.getChores,
  getWorkouts: actions.getWorkouts,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPostit2);
