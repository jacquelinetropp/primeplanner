import React, { Fragment, useState } from "react";
import styled from "styled-components";

import JournalHeaderLinks from '../JournalHeaderLinks/JournalHeaderLinks';

import AddButton from "../../../UI/Button/AddButton";
import { MinIcon, HomeIcon } from "../../../UI/Wrappers/Wrappers";
import WeatherPage from "../../../../pages/weather/WeatherPage";
import ProjectsPage from "../../../../pages/projects/ProjectsPage";
import CalendarPage from "../../../../pages/calendar/CalendarPage";
import HousePage from "../../../../pages/house/HousePage";

const SidebarWrapper = styled.div`
  border-right: 1px solid #f0efef;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  grid-column: 1/2;
  grid-row: 2/-1;
`;

const SidebarHeader = styled.div`
  /* text-align: center;
  display: flex;
  align-items: center; */
`;

const IconWrapper = styled.div`
  position: absolute;
`;

const JournalSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarWrapper>
      <IconWrapper>
  
      </IconWrapper>
      {isOpen && (
        <Fragment>
          <div>
            <SidebarHeader>
              <JournalHeaderLinks link="/" text="Inbox" number="2" img={<HomeIcon />} />
              <JournalHeaderLinks link="/"  text="Today" number="2" img={<HomeIcon />} />
              <JournalHeaderLinks  link="/" text="Next 7 days" number="2" img={<HomeIcon />} />
            </SidebarHeader>
            <CalendarPage />
            <WeatherPage />
            <ProjectsPage />
            <HousePage />
      
          </div>
          <AddButton>Add Section</AddButton>
        </Fragment>
      )}
    </SidebarWrapper>
  );
};

export default JournalSidebar;
