import React from "react";
import { withRouter } from "react-router-dom";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import "./Calendar.styles.scss";
import styled from "styled-components";
import SingleCalendarWorkout from "../SingleWorkout/SingleCalendarWorkout";

const Workout = styled.div`
  background-color: ${({ type }) => {
    if (type === "strength") return "var(--color-tertiary)";
    else if (type === "cardio") return "var(--color-mainLight)";
    else if (type === "HIIT") return "var(--color-second)";
    else if (type === "recovery") return "var(--color-main)";
    else return "var(--color-main)";
  }};
  height: 100%;
  margin-bottom: 1px;
  padding: 1rem;
`;

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    isDeleting: false,
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
    const { todos, workouts, workoutList, chores } = this.props;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

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
            onClick={workouts ? null : () => this.onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            {isSameMonth(day, monthStart) ? (
              <div>
                {todos ? (
                  <div className="taskDiv">
                    {todos
                      .filter((e) => isSameDay(cloneDay, new Date(e.dueDate)))
                      .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
                      .map((e, i) => (
                        <div key={i} className="task">
                          {e.todo} -{" "}
                          {new Date(e.dueDate).toTimeString().slice(0, 5)}
                        </div>
                      ))}
                  </div>
                ) : (
                  ""
                )}
                {chores ? (
                  <div className="choresDiv">
                    {chores
                      .filter((e) => isSameDay(cloneDay, new Date(e.nextDate)))
                      .sort((a, b) => (a.nextDate > b.nextDate ? 1 : -1))
                      .map((e, i) => (
                        <div key={i} className="chores">
                          {e.name} -{" "}
                          {new Date(e.nextDate).toTimeString().slice(0, 5)}
                        </div>
                      ))}
                  </div>
                ) : (
                  ""
                )}
                {workouts ? (
                  <div className="workoutDiv">
                    {workouts
                      .filter((e) => isSameDay(cloneDay, new Date(e.date)))
                      .sort((a, b) => (a.date > b.date ? 1 : -1))
                      .map((e, i) => (
                        <Workout key={i} className="workout" type={e.type}>
                          <SingleCalendarWorkout item={e} />
                        </Workout>
                      ))}
                  </div>
                ) : (
                  ""
                )}
                {workoutList ? (
                  <div className="workoutDiv">
                    {workoutList
                      .filter((e) => isSameDay(cloneDay, new Date(e.date)))
                      .sort((a, b) => (a.date > b.date ? 1 : -1))
                      .map((e, i) => (
                        <div key={i} className="workoutMonthly">
                          {e.name} -{" "}
                          {new Date(e.date).toTimeString().slice(0, 5)}
                        </div>
                      ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              " "
            )}
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
    return (
      <div className={rows.length === 5 ? "body body5" : "body body6"}>
        {rows}
      </div>
    );
  }

  onDateClick = (day) => {
    const dayInMilli = new Date(day).getTime();
    const { history } = this.props;

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

export default withRouter(Calendar);
