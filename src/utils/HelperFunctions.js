/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import {
  eachDayOfInterval,
  addDays,
  isBefore,
  format,
  addWeeks,
  addMonths,
} from "date-fns";
import isSameDay from "date-fns/isSameDay";

export function sevenDayTasks(todos) {
  const today = new Date().toDateString();
  let next7tasks = [];
  const formattedToday = format(new Date(), "yyyy, M, d");
  const endDate = addDays(new Date(today), 7).toDateString();
  const daysInWeek = eachDayOfInterval({
    start: new Date(formattedToday),
    end: new Date(endDate),
  });
  let days = [];
  daysInWeek.map((day) => days.push(day.toDateString()));
  todos.map((todo) => {
    const date = todo.dueDate;
    const structuredDate = new Date(date).toDateString();

    for (var i = 0; i < days.length; i++) {
      if (structuredDate === days[i] && todo.completed == false) {
        next7tasks.push(todo);
      }
    }
  });

  return next7tasks;
}

export function getHighPriority(todos) {
  let tasks = [];
  todos.map((todo) => {
    if (todo.priority === "high") {
      tasks.push(todo);
    }
  });
  return tasks;
}

export function setOverdueTasks(todos) {
  let overdue = [];
  const today = new Date();
  todos.map((todo) => {
    const date = todo.dueDate;
    const structuredDate = new Date(date);
    if (isBefore(structuredDate, today) && todo.completed == false) {
      overdue.push(todo);
    }
  });
  return overdue;
}

export function todaysTasks(todos) {
  const today = new Date().toDateString();
  let tasks = [];

  todos.map((todo) => {
    const date = todo.dueDate;
    const structuredDate = new Date(date).toDateString();
    if (structuredDate == today && todo.completed == false) {
      tasks.push(todo);
    }
  });

  return tasks;
}

export function getSevenMinusToday(todos) {
  const sevenTasks = sevenDayTasks(todos);
  const todaysTodos = todaysTasks(todos);
  let editedTodos = [];
  sevenTasks.forEach((t) => {
    let found = false;
    todaysTodos.forEach((today) => {
      if (today.id === t.id) {
        found = true;
      }
    });
    if (!found) {
      editedTodos.push(t);
    }
  });

  return editedTodos;
}

export function findNextDate(frequency, amount, date) {
  const number = parseFloat(frequency);
  let newDate;

  if (amount === "days") {
    newDate = addDays(date, number);
  } else if (amount === "weeks") {
    newDate = addWeeks(date, number);
  } else {
    newDate = addMonths(date, number);
  }

  const nextDate = new Date(newDate).toDateString();

  return nextDate;
}

export function filterAndSortItems(items, compareDate) {
  items
    .filter((e) => isSameDay(new Date(compareDate), new Date(e.nextDate)))
    // .sort((a, b) => (a.date > b.date ? 1 : -1));
}
