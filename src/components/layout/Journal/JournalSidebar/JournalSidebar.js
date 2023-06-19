import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/actions";

import JournalHeaderLinks from "../JournalHeaderLinks/JournalHeaderLinks";

import { MdManageAccounts } from "react-icons/md";

import {
  MinIcon,
  HomeIcon,
  TodayIcon,
  SevenDayIcon,
} from "../../../UI/Wrappers/Wrappers";
import WeatherPage from "../../../../pages/weather/WeatherPage";
import ProjectsPage from "../../../../pages/projects/ProjectsPage";
import CalendarPage from "../../../../pages/calendar/CalendarPage";
import HousePage from "../../../../pages/house/HousePage";
import { sevenDayTasks, todaysTasks } from "../../../../utils/HelperFunctions";
import JournalHeaderMainLinks from "../JournalHeaderLinks/JournalHeaderMainLinks";
import WeatherHome from "../../../WeatherHome/WeatherHome";
import EditProfile from "../../../../pages/EditProfile";

const SidebarWrapper = styled.div`
  border-right: 1px solid #f0efef;
  grid-column: 1/2;
  grid-row: 1/-1;
  display: flex;
  background-color: var(--color-mainDark);
  color: #fff;

  @media only screen and (max-width: 768px) {
    grid-row: 3/-1;
  }
`;

const CategoryWrapper = styled.div`
  padding-top: 2rem;
`;

const SidebarHeader = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  margin-right: 5px;
  display: none;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const InnerWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const LogoutWrapper = styled.div`
  margin-top: auto;
  margin-bottom: 5px;
`;

const LogoutButton = styled.button`
  background-color: rgba(19, 16, 64, 0.8);
  margin-top: 10px;
  outline: none;
  color: var(--color-white);
  padding: 0.7rem;
  border-radius: 5px;
  font-weight: 600;
  width: 100%;
`;

const JournalSidebar = ({ todos, logout, toggleProfile }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const [isEditingOpen, setIsEditingOpen] = useState(false);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditProfile = () => {
    setIsEditingOpen(!isEditingOpen);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    if (width < 768) {
      setIsOpen(false);
    }
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const todayLength = todaysTasks(todos).length;

  const length = sevenDayTasks(todos).length;

  return (
    <Fragment>
      <SidebarWrapper>
        <IconWrapper>
          <MinIcon onClick={togglePopup} />
        </IconWrapper>
        {isOpen && (
          <InnerWrapper>
            <SidebarHeader isOpen={isOpen}>
              <h3>Overview</h3>
              <JournalHeaderLinks
                link="/inbox"
                text="Inbox"
                number={todos.length}
                img={<HomeIcon />}
              />
              <JournalHeaderLinks
                link="/today"
                text="Today"
                number={todayLength}
                img={<TodayIcon />}
              />
              <JournalHeaderLinks
                link="/next7"
                text="Next 7 days"
                number={length}
                img={<SevenDayIcon />}
              />
            </SidebarHeader>
            <CategoryWrapper>
              <CalendarPage />
              <WeatherPage />
              <ProjectsPage />
              <HousePage />
              <JournalHeaderMainLinks
                name="Edit Profile"
                icon={<MdManageAccounts />}
                onClick={() => toggleEditProfile()}
              />
            </CategoryWrapper>
            <LogoutWrapper>
              <WeatherHome />
              <LogoutButton onClick={() => logout()}>Logout</LogoutButton>
            </LogoutWrapper>
          </InnerWrapper>
        )}
      </SidebarWrapper>
      {isEditingOpen && <EditProfile close={toggleEditProfile} />}
    </Fragment>
  );
};

const mapStateToProps = ({ todos }) => ({
  todos: todos.allTodos,
});

const mapDispatchToProps = {
  logout: actions.signOut,
  toggleProfile: actions.toggleProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(JournalSidebar);
