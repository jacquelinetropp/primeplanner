import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { MinIcon } from "../UI/Wrappers/Wrappers";
import * as actions from "../../store/actions/actions";
import { Fragment } from "react";
import SingleTodo from "../SingleTodo/SingleTodo";
import SingleChore from "../Chore/SingleChore";
import SingleWorkout from "../SingleWorkout/SingleWorkout";

const PostWrapper = styled.div`
  border-radius: 5px;
  grid-column: 1/3;
  height: ${({ isOpen }) => (isOpen ? "100%" : "min-content")};
  border-bottom: 1px solid var(--color-grayDark);
  border-right: 1px solid var(--color-grayDark);

  @media only screen and (max-width: 768px) {
    grid-column: 1/-1;
  }
`;

const MinimizeWrapper = styled.div``;

const Header = styled.h2`
  font-size: ${({ isOpen }) => (isOpen ? "3rem" : "1.2rem")};
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
  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const today = new Date().toDateString();

  let content;
  if (loading || !todos || !chores || !workouts) {
    content = <Fragment>Loading...</Fragment>;
  } else if (
    todos.length === 0 &&
    chores.length === 0 &&
    workouts.length === 0
  ) {
    content = <Fragment>No tasks for today!</Fragment>;
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
    <PostWrapper isOpen={isOpen}>
      <MinimizeWrapper>
        <MinIcon onClick={togglePopup} />
      </MinimizeWrapper>
      <PostContent>
        <Header isOpen={isOpen} className="center">
          Today's High Priority Tasks
        </Header>
        {isOpen && <Fragment>{content}</Fragment>}
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
