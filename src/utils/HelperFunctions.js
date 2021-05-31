import { eachDayOfInterval, addDays, format } from "date-fns";

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
      if (structuredDate === days[i]) {
        next7tasks.push(todo);
      }
    }
  });

  return next7tasks;
}

export function todaysTasks(todos) {
  const today = new Date().toDateString();
  let tasks = [];

  todos.map((todo) => {
    const date = todo.dueDate;
    const structuredDate = new Date(date).toDateString();
    if (structuredDate == today) {
      tasks.push(todo);
    }
  });

  return tasks;

};

export function getHighPriority(todos) {
  let tasks = [];
  todos.map(todo => {
    if (todo.priority === "high") {
      tasks.push(todo);
    }
  })
  return tasks;
}