import React from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import * as actions from "../../store/actions/actions";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  parse,
  addMonths,
  subMonths,
  getMonth,
  getYear,
} from "date-fns";
import "./Calendar.styles.css";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  };

  renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "eeee";
    const days = [];

    let startDate = startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const currentMonthNumber = getMonth(currentMonth);
    const currentYear = getYear(currentMonth);
    const { todos } = this.props;

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const yearTasks = [];
    const yearTodos = todos.map(todo => {
      const todoYear = getYear(todo.dueDate);
      if (todo.priority === "high") {
        if (todoYear === currentYear) {
          yearTasks.push(todo);
        }
      }
    });

    let tasks = [];
    const monthTodos = yearTasks.map((todo) => {
      const todoMonth = getMonth(todo.dueDate);
      if (todo.priority === "high") {
        if (todoMonth === currentMonthNumber) {
          tasks.push(todo);
        }
      }
    });

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            {isSameMonth(day, monthStart) ? (
              <div>
                <div className="taskDiv">
                  {tasks
                    .filter((e) => isSameDay(cloneDay, new Date(e.dueDate)))
                    .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
                    .map((e, i) => (
                      <div key={i} className="task">
                        {e.todo} - {new Date(e.dueDate).toTimeString().slice(0, 5)}
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              " "
            )}
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    console.log(rows.length)
    return <div className={rows.length === 5 ? "body body5" : "body body6"}>{rows}</div>;
  }

  onDateClick = (day) => {
    const dayInMilli = new Date(day).getTime();
    const {history} = this.props;

    history.push(`/calendar/daily/${dayInMilli}`);
  
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1),
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }) => ({
  todos: todos.allTodos,
});

export default withRouter(connect(mapStateToProps)(Calendar));
