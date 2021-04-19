import React, { Fragment, useState } from "react";
import styled from "styled-components";

import JournalTag from "../../../JournalTags/JournalTag";
import AddButton from "../../../UI/Button/AddButton";
import { Icon } from "../../../UI/Wrappers/Wrappers";
import JournalCategories from "../JournalCategories/JournalCategories";

const SidebarWrapper = styled.div`
  border-right: 1px solid #f0efef;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const SidebarHeader = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
`;

const Header = styled.h6`
  font-size: 2.2rem;
  text-align: center;
  border-bottom: 1px solid #f0efef;
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
              <Header>Notebooks</Header>
            </SidebarHeader>
            <JournalTag color="pink" name="Calendar" link="/calendar" />
            <JournalTag name="Weather" link="/weather" />
            <JournalTag name="Projects" link="/projects" color="green" />
            <JournalTag name="Household" link="/household" color="yellow" />
          </div>
          <AddButton>Add Section</AddButton>
        </Fragment>
      )}
    </SidebarWrapper>
  );
};

export default JournalSidebar;
