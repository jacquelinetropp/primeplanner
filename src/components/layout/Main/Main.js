import React, { useState } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";

import TaskPostit from "../../TaskPostit/TaskPostit";
import WeatherHome from "../../WeatherHome/WeatherHome";
import Button from "../../UI/Button/Button";
import EditProfile from "../../../pages/EditProfile";
import { Link } from "react-router-dom";

const HomeWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: min-content minmax(30px, 1fr);
  grid-gap: 1.5rem;

  @media only screen and (max-width: 768px) {
    grid-column: 1/-1;
    grid-template-rows: min-content min-content repeat(2, 1fr);
  }

  @media only screen and (max-width: 425px) {
    width: 100vw;
  }
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

  @media only screen and (max-width: 768px) {
    grid-column: 1/-1;
  }
`;

const ButtonsWrapper = styled.div`
  grid-column: 5/6;
  width: 50%;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    grid-column: 1/-1;
    grid-row: 1/2;
    display: flex;
  }
`;

const Notebook = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 2rem rgba (0, 0, 0 0.3);
`;

const Main = ({ logout, toggleProfile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HomeWrapper>
      <TodayDate>
        <h1>
          <Moment format="dddd MMMM Do, YYYY">{new Date()}</Moment>
        </h1>
      </TodayDate>
      <ButtonsWrapper>
        <Button onClick={togglePopup}>Edit Profile</Button>
        <Button onClick={() => logout()}>Logout</Button>
      </ButtonsWrapper>
      <TaskPostit />
      <WeatherHome />
      {isOpen && <EditProfile close={togglePopup} />}
    </HomeWrapper>
  );
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  logout: actions.signOut,
  toggleProfile: actions.toggleProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
