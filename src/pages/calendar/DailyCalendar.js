import React, { Fragment } from "react";
import JournalMain from "../../components/layout/Journal/JournalMain/JournalMain";
import styled from "styled-components";
import { connect } from "react-redux";
import { addDays, isSameDay, subDays } from "date-fns";
import SingleTodo from "../../components/SingleTodo/SingleTodo";
import { withRouter } from "react-router-dom";
import * as action from '../../store/actions/actions';
import { actionTypes } from "react-redux-firebase";

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
    const newDay =(new Date(+day));
    const chores = action.getChores;
    console.log(chores);

    if (day) {
      this.setState({
        today: newDay
      })
    }
  }

  renderDay() {
    const today = this.state.today;
    const { todos } = this.props;
    const tasks = todos
      .filter((e) => isSameDay(new Date(today), new Date(e.dueDate)))
      .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
      .map((e, i) => <SingleTodo key={e.id} todo={e} />);
 
    let content;
    if (tasks.length === 0) {
      content = <Fragment>No tasks today!</Fragment>;
    } else {
      content = tasks;
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
  chores: house.chores
});

const mapDispatchToProps = {
  getChores: actionTypes.getChores
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DailyCalendar));
