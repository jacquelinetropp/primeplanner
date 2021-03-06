import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";

import TaskPostit from "../../TaskPostit/TaskPostit";
import WeatherHome from "../../WeatherHome/WeatherHome";
import Button from "../../UI/Button/Button";
import EditProfile from "../../../pages/EditProfile";
import { format } from "date-fns";

const TodayDateWrapper = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  grid-column: 1/4;
  grid-row: 1/2;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);

  @media only screen and (max-width: 768px){
    grid-column: 1/-1;
    grid-row: 2/3;
  }
`;

const TodaysDate = styled.h1`
  font-size: 1.8rem;
`;

const ButtonsWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  grid-column: 4/6;
  margin: 0 auto;
  display: flex;

  @media only screen and (max-width: 768px){
    grid-column: 1/-1;
    grid-row: 1/2;
  }
`;

const DailYWrapper = styled.div`
  grid-column: 2/-1;
  grid-row: 2/3;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media only screen and (max-width: 768px){
    grid-row: 3/4;
  }
`;

const Main = ({ logout, toggleProfile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const FormattedDate = format(new Date(), "eeee LLLL d, yyyy")

  return (
    <Fragment>
      <TodayDateWrapper>
        <TodaysDate>
      {FormattedDate}
        </TodaysDate>
      </TodayDateWrapper>
      <ButtonsWrapper>
        <Button onClick={togglePopup}>Edit Profile</Button>
        <Button onClick={() => logout()}>Logout</Button>
      </ButtonsWrapper>
      <DailYWrapper>
        <TaskPostit />
        <WeatherHome />
      </DailYWrapper>
      {isOpen && <EditProfile close={togglePopup} />}
    </Fragment>
  );
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  logout: actions.signOut,
  toggleProfile: actions.toggleProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
