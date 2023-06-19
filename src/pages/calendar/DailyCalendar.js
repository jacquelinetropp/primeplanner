import React, { Fragment } from "react";
import JournalMain from "../../components/layout/Journal/JournalMain/JournalMain";
import styled from "styled-components";
import { connect } from "react-redux";
import { addDays, isSameDay, subDays } from "date-fns";
import SingleTodo from "../../components/SingleTodo/SingleTodo";
import { withRouter } from "react-router-dom";
import SingleChore from "../../components/Chore/SingleChore";
import SingleWorkout from "../../components/SingleWorkout/SingleWorkout";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  height: 100%;
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

class DailyCalendar extends React.Component {
  state = {
    today: new Date(),
  };
  componentDidMount() {
    const day = this.props.match.params.day;
    const newDay = new Date(+day);
    if (day) {
      this.setState({
        today: newDay,
      });
    }
  }

  renderDay() {
    const today = this.state.today;
    const { todos, chores, workouts } = this.props;
    const tasks = todos
      .filter((e) => isSameDay(new Date(today), new Date(e.dueDate)))
      .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
      .map((e, i) => <SingleTodo key={e.id} todo={e} />);
    const choresList = chores
      .filter((e) => isSameDay(new Date(today), new Date(e.nextDate)))
      .sort((a, b) => (a.nextDate > b.nextDate ? 1 : -1))
      .map((e, i) => <SingleChore key={e.id} chore={e} />);
    const workoutList = workouts
      .filter((e) => isSameDay(new Date(today), new Date(e.date)))
      .sort((a, b) => (a.date > b.date ? 1 : -1))
      .map((e, i) => <SingleWorkout key={e.id} workout={e} />);
    let content;
    if (
      tasks.length === 0 &&
      choresList.length === 0 &&
      workoutList.length === 0
    ) {
      content = <h6 className="center">No tasks today!</h6>;
    } else {
      content = (
        <Fragment>
          {tasks}
          {choresList}
          {workoutList}
        </Fragment>
      );
    }
    return <DayContainer>{todos ? content : " "}</DayContainer>;
  }

  nextDay = () => {
    const newDay = addDays(this.state.today, 1);
    this.setState({
      today: newDay,
    });
  };

  previousDay = () => {
    const prevDay = subDays(this.state.today, 1);
    this.setState({
      today: prevDay,
    });
  };
  render() {
    return (
      <JournalMain>
        <Wrapper>
          <TitleWrapper>
            <div className="icon" onClick={this.previousDay}>
              chevron_left
            </div>
            <h4>Day of {this.state.today.toDateString()}</h4>
            <div onClick={this.nextDay}>
              <div className="icon">chevron_right</div>
            </div>
          </TitleWrapper>
          {this.renderDay()}
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

const mapDispatchToProps = {};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DailyCalendar)
);
