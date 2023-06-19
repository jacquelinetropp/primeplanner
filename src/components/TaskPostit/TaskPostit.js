import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import { Fragment } from "react";
import SingleTodo from "../SingleTodo/SingleTodo";
import SingleChore from "../Chore/SingleChore";
import SingleWorkout from "../SingleWorkout/SingleWorkout";
import LoadingCircle from "../Loading/Loading";
import TaskPostItBox from "./TaskPostItBox";
import { setOverdueTasks } from "../../utils/HelperFunctions";

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
  text-align: left;
`;

const PostContent = styled.div`
  background-color: var(--color-gray);
  height: 100%;
  overflow: auto;
`;

const TaskPostit = ({
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

  let content;
  if (loading || !todos || !chores || !workouts) {
    content = <LoadingCircle />;
  } else if (
    todos.length === 0 &&
    chores.length === 0 &&
    workouts.length === 0
  ) {
    content = <h5 className="center">No high priority tasks today!</h5>;
  } else {
    let tasks = [];
    todos.map((todo) => {
      const date = todo.dueDate;
      const structuredDate = new Date(date).toDateString();
      if (structuredDate === today && todo.priority === "high") {
        tasks.push(todo);
      }
    });
    let choresList = [];

    chores.map((chore) => {
      const date = chore.nextDate;
      const structuredDate = new Date(date).toDateString();
      if (structuredDate === today) {
        choresList.push(chore);
      }
    });
    let workoutList = [];
    workouts.map((workout) => {
      const date = workout.date;
      const structuredDate = new Date(date).toDateString();
      if (structuredDate === today) {
        workoutList.push(workout);
      }
    });
    if (
      tasks.length === 0 &&
      choresList.length === 0 &&
      workoutList.length === 0
    ) {
      content = <h5 className="center">No high priority tasks today!</h5>;
    } else {
      content = (
        <Fragment>
          <TaskPostItBox
            name="Outstanding Tasks"
            number={overdueTasts.length}
          />
          <h2> hi</h2>
          {tasks.map((task) => (
            <SingleTodo key={task.id} todo={task} />
          ))}
          {choresList.map((chore) => (
            <SingleChore chore={chore} kye={chore.id} />
          ))}
          {workoutList.map((workout) => (
            <SingleWorkout workout={workout} key={workout.id} />
          ))}
        </Fragment>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskPostit);
