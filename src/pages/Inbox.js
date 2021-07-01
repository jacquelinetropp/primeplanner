import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";
import SingleTodo from "../components/SingleTodo/SingleTodo";
import JournalMain from "../components/layout/Journal/JournalMain/JournalMain";
import { todaysTasks, setOverdueTasks, getSevenMinusToday } from "../utils/HelperFunctions";
import {getFutureTodos} from '../utils/inboxFunctions';
import LoadingCircle from '../components/Loading/Loading';

const Inbox = ({ todos, loading }) => {
  const todaysTodos = todaysTasks(todos);
  const next7 = getSevenMinusToday(todos);
  const futureTodos = getFutureTodos(todos);
  const overdue = setOverdueTasks(todos);

  let content;
  if (loading || !todos) {
    content = <LoadingCircle />;
  } else if (todos.length === 0) {
    content = <h5 className="center">No todos!</h5>;
  } else {
    content = (
      <Fragment>
        <h4>Overdue</h4>
        {overdue.length === 0 ? "No overdue tasks!" : overdue.map((todo) => (
          <SingleTodo key={todo.id} todo={todo} />
        ))}
        <h4>Today</h4>
        {todaysTodos.length === 0 ? "No Tasks today" : todaysTodos.map((todo) => (
          <SingleTodo key={todo.id} todo={todo} />
        ))}
        <h4>Next 7 days</h4>
        {next7.length === 0 ? "No tasks for the next seven days" : next7.map((todo) => (
          <SingleTodo key={todo.id} todo={todo} />
        ))}
        <h4>Future Tasks</h4>
        {futureTodos.length === 0 ? "No future tasks" : futureTodos.map((todo) => (
          <SingleTodo key={todo.id} todo={todo} />
        ))}
      </Fragment>
    );
  }

  return (
    <JournalMain>
      <h2 className="center">All Tasks</h2>
      {content}
    </JournalMain>
  );
};

const mapStateToProps = ({ todos }) => ({
  todos: todos.allTodos,
  loading: todos.loading,
});

const mapDispatchToProps = {
  getAllTodos: actions.getAllTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
