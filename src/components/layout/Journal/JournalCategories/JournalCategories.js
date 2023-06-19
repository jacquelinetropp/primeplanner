import React, { useState } from "react";
import styled from "styled-components";
import AddButton from "../../../UI/Button/AddButton";

import JournalHeaderMainLinks from "../JournalHeaderLinks/JournalHeaderMainLinks";

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem 0;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Content = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  transform: translateY(${(isOpen) => (isOpen ? "0%" : "-100%")});
  transition: all 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
`;

const JournalCategories = ({
  name,
  icon,
  disabled,
  children,
  action,
  hidden,
  text,
  color,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CategoriesWrapper>
      <HeaderWrapper onClick={toggleOpen}>
        <JournalHeaderMainLinks name={name} icon={icon} />
      </HeaderWrapper>
      {isOpen && <Content isOpen={isOpen}>{children}</Content>}
      <AddButton
        disabled={disabled}
        action={action}
        hidden={hidden}
        color={color}
      >
        {text}
      </AddButton>
    </CategoriesWrapper>
  );
};

export default JournalCategories;
