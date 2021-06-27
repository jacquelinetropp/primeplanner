import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import JournalHeaderLinks from "../JournalHeaderLinks/JournalHeaderLinks";

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

const SidebarWrapper = styled.div`
  border-right: 1px solid #f0efef;
  grid-column: 1/2;
  grid-row: 2/-1;

  @media only screen and (max-width: 768px){
    grid-row: 3/-1;
  }
`;

const SidebarHeader = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-between;
  
`;

const IconWrapper = styled.div`
  float: left;
`;

const JournalSidebar = ({ todos }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
      window.addEventListener("resize", updateWidth);
      if (width < 768) {
        setIsOpen(false);
      }
      return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const todayLength = todaysTasks(todos).length;

  const length = sevenDayTasks(todos).length;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarWrapper>
      <IconWrapper>
        <MinIcon onClick={togglePopup} />
      </IconWrapper>
      {isOpen && (
        <Fragment>
          <div>
            <SidebarHeader isOpen={isOpen}>
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
            <CalendarPage />
            <WeatherPage />
            <ProjectsPage />
            <HousePage />
          </div>
        </Fragment>
      )}
    </SidebarWrapper>
  );
};

const mapStateToProps = ({ todos }) => ({
  todos: todos.allTodos,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(JournalSidebar);
