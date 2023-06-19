import React from "react";
import JournalMain from "../../components/layout/Journal/JournalMain/JournalMain";
import styled from "styled-components";
import { connect } from "react-redux";
import { addDays, isSameDay, addWeeks, subWeeks } from "date-fns";
import SingleTodo from "../../components/SingleTodo/SingleTodo";
import SingleChore from "../../components/Chore/SingleChore";
import SingleWorkout from "../../components/SingleWorkout/SingleWorkout";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 50px repeat(2, 1fr);
  height: 100%;

  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 50px repeat(4, 1fr);
  }
`;

const TitleWrapper = styled.div`
  grid-column: 1/-1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DayContainer = styled.div`
  overflow: auto;
`;

class WeeklyCalendar extends React.Component {
  state = {
    today: new Date(),
  };

  renderDaysOfWeek() {
    let dayOfTheWeek = [];
    const today = this.state.today;
    function displayDate() {
      for (var i = 0; i < 8; i++) {
        if (i === 0) {
          dayOfTheWeek.push(today.toDateString());
        } else {
          let newDay = addDays(today, i);
          dayOfTheWeek.push(new Date(newDay).toDateString());
        }
      }
    }
    displayDate();
    const { todos, chores, workouts } = this.props;
    return dayOfTheWeek.map((day, i) => (
      <DayContainer key={i}>
        <h6 className="center">{day}</h6>
        {todos
          ? todos
              .filter((e) => isSameDay(new Date(day), new Date(e.dueDate)))
              .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
              .map((e, i) => (
                <SingleTodo key={e.id} todo={e} className="task" calendar />
              ))
          : " "}
        {chores
          ? chores
              .filter((e) => isSameDay(new Date(day), new Date(e.nextDate)))
              .sort((a, b) => (a.nextDate > b.nextDate ? 1 : -1))
              .map((e, i) => (
                <SingleChore key={e.id} chore={e} className="task" calendar />
              ))
          : " "}
        {workouts
          ? workouts
              .filter((e) => isSameDay(new Date(day), new Date(e.date)))
              .sort((a, b) => (a.date > b.date ? 1 : -1))
              .map((e, i) => (
                <SingleWorkout
                  key={e.id}
                  workout={e}
                  className="task"
                  calendar
                />
              ))
          : " "}
      </DayContainer>
    ));
  }

  nextWeek = () => {
    const newWeek = addWeeks(this.state.today, 1);

    this.setState({
      today: newWeek,
    });
  };

  previousWeek = () => {
    const prevWeek = subWeeks(this.state.today, 1);

    this.setState({
      today: prevWeek,
    });
  };
  render() {
    return (
      <JournalMain>
        <Wrapper>
          <TitleWrapper>
            <div className="icon" onClick={this.previousWeek}>
              chevron_left
            </div>
            <h4>Week of {this.state.today.toDateString()}</h4>
            <div onClick={this.nextWeek}>
              <div className="icon">chevron_right</div>
            </div>
          </TitleWrapper>
          {this.renderDaysOfWeek()}
        </Wrapper>
      </JournalMain>
    );
  }
}

const mapStateToProps = ({ todos, house }) => ({
  todos: todos.allTodos,
  chores: house.chores,
  workouts: house.workouts.workoutList,
});

export default connect(mapStateToProps)(WeeklyCalendar);
