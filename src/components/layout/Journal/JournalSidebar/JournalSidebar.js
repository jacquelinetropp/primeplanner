import React from "react";
import styled from "styled-components";

import JournalTag from "../../../JournalTags/JournalTag";
import AddButton from "../../../UI/Button/AddButton";
import JournalCategories from "../JournalCategories/JournalCategories";

const SidebarWrapper = styled.div`
  border-right: 1px solid #f0efef;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`;

const JournalSidebar = () => {
  return (
    <SidebarWrapper>
      <div>
        <JournalTag name="Calendar" link="/calendar" />
        <JournalTag name="Weather" link="/weather"/>
      </div>
      <AddButton>Add Section</AddButton>
    </SidebarWrapper>
  );
};

export default JournalSidebar;
