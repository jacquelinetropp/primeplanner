import React from "react";
import JournalMain from "../../components/layout/Journal/JournalMain/JournalMain";
import styled from "styled-components";
import { connect } from "react-redux";
import { addDays, isSameDay, addWeeks, subWeeks } from "date-fns";
import SingleTodo from "../../components/SingleTodo/SingleTodo";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 50px repeat(2, 1fr);
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

const Task = styled.div`
  background-color: rgba(148, 242, 181, 0.8);
  margin-bottom: 1px;
  font-size: 1.4rem;
  padding-left: 1rem;
`;

class Weekly extends React.Component {
  state = {
    today: new Date(),
    daysOfTheWeek: [],
  };
  componentDidMount() {
    let dayOfTheWeek = [];
    const today = this.state.today;
    function displayDate() {
      for (var i = 0; i < 8; i++) {
        if (i === 0) {
          dayOfTheWeek.push(new Date().toDateString());
        } else {
          let newDay = addDays(today, i);
          dayOfTheWeek.push(new Date(newDay).toDateString());
        }
      }
    }
    displayDate();
    this.setState({
      daysOfTheWeek: dayOfTheWeek,
    });
    console.log(this.state.daysOfTheWeek);
  }
  // renderDays() {
  //   let dayOfTheWeek = [];
  //   const today = this.state.today;
  //   function displayDate() {
  //     for (var i = 0; i < 8; i++) {
  //       if (i === 0) {
  //         dayOfTheWeek.push(today.toDateString());
  //       } else {
  //         let newDay = addDays(today, i);
  //         dayOfTheWeek.push(new Date(newDay).toDateString());
  //       }
  //     }
  //   }
  //   displayDate();
  //   this.setState({
  //     daysOfTheWeek: dayOfTheWeek
  //   })
  // }

  nextWeek = () => {
    const newWeek = addWeeks(this.state.today, 1);
    console.log("clicked");
    this.setState({
      today: newWeek,
    });
    // this.renderDays();
    console.log(this.state.today);
    console.log(this.state.daysOfTheWeek);
  };

  previousWeek = () => {
    const prevWeek = subWeeks(this.state.today, 1);
    console.log(prevWeek);
    this.setState({
      today: prevWeek,
    });
  };
  render() {
    const { todos } = this.props;
    console.log(this.state.daysOfTheWeek);
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
          {this.state.daysOfTheWeek.map((day, i) => (
            <DayContainer key={i}>
              <h6 className="center">{day}</h6>
              {todos
                ? todos
                    .filter((e) =>
                      isSameDay(new Date(day), new Date(e.dueDate))
                    )
                    .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
                    .map((e, i) => (
                      <SingleTodo todo={e} key={e.id} className="task" />
                    ))
                : " "}
            </DayContainer>
          ))}
        </Wrapper>
      </JournalMain>
    );
  }
}

const mapStateToProps = ({ todos }) => ({
  todos: todos.allTodos,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(Weekly);
