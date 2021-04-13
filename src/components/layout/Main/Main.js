import React from "react";
import styled from "styled-components";
import Moment from "react-moment";

import HomeImage from "../../../images/cork-board.png";
import TaskPostit from "../../TaskPostit/TaskPostit";
import WeatherHome from "../../Weather/WeatherHome/WeatherHome";
import Journal from "../Journal/Journal";
import Button from "../../UI/Button/Button";

const HomeWrapper = styled.div`
  background-image: url(${HomeImage});
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: min-content repeat(2, 1fr);
  padding: 1.5rem;
  grid-gap: 1.5rem;
`;

const TodayDate = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  grid-column: 1/5;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
`;

const ButtonsWrapper = styled.div`
  grid-column: 5/6;
  width: 50%;
  margin: 0 auto;
`;

const Notebook = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 2rem rgba (0, 0, 0 0.3);
`;

const Main = () => {
  return (
    <HomeWrapper>
      <TodayDate>
        <h1>
          <Moment format="dddd MMMM Do, YYYY">{new Date()}</Moment>
        </h1>
      </TodayDate>
      <ButtonsWrapper>
        <Button>Edit Profile</Button>
        <Button>Logout</Button>
      </ButtonsWrapper>
      <TaskPostit />
      <WeatherHome />
      <Journal />
    </HomeWrapper>
  );
};

export default Main;
