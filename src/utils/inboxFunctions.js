/* eslint-disable eqeqeq */
import { setOverdueTasks, sevenDayTasks, todaysTasks } from "./HelperFunctions";

function removeOverDueTodos(todos) {
  const overdueTodos = setOverdueTasks(todos);
  let futureTodos = [];
  for (let i = 0; i < todos.length; i++) {
    if (overdueTodos.indexOf(todos[i]) === -1) {
      futureTodos.push(todos[i]);
    }
  }
  return futureTodos;
}

function removeTodosDueToday(todos) {
  const editedTodos = removeOverDueTodos(todos);
  const todaysTodos = todaysTasks(todos);
  let futureTodos = [];

  for (let i = 0; i < editedTodos.length; i++) {
    if (todaysTodos.indexOf(editedTodos[i]) == -1) {
      futureTodos.push(editedTodos[i]);
    }
  }
  return futureTodos;
}

export function getFutureTodos(todos) {
  const editedTodos = removeTodosDueToday(todos);
  const sevenDaysOut = sevenDayTasks(todos);

  let futureTodos = [];
  for (let i = 0; i < editedTodos.length; i++) {
    if (sevenDaysOut.indexOf(editedTodos[i]) == -1) {
      futureTodos.push(editedTodos[i]);
    }
  }
  let finalTodos = [];
  // eslint-disable-next-line array-callback-return
  futureTodos.map((todo) => {
    if (todo.completed == false) {
      finalTodos.push(todo);
    }
  });
  return finalTodos;
}
