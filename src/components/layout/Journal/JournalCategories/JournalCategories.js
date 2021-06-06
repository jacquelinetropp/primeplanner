import React, { useState } from "react";
import styled from "styled-components";
import AddButton from "../../../UI/Button/AddButton";

import { BsChevronDown } from "react-icons/bs";

const CategoriesWrapper = styled.div`
  display: flex;
  grid-column: 2/3;
  flex-direction: column;
  border-right: 1px solid #f0efef;
  padding: 1rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2rem;
  border-bottom: 1px solid #f0efef;
`;

const Header = styled.h6`
  font-size: 2.2rem;
  text-align: center;
  letter-spacing: 1px;
`;

const DownIcon = styled(BsChevronDown)`
  font-size: 1.4rem;
  margin-right: 1rem;
`;

const Content = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  transform: translateY(${(isOpen) => (isOpen ? "0%" : "-100%")});
  transition: all 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
`;

const JournalCategories = ({ title, disabled, children, action, hidden, text }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CategoriesWrapper>
      <HeaderWrapper onClick={toggleOpen}>
        <DownIcon />
        <Header>{title}</Header>
      </HeaderWrapper>
      {isOpen && <Content isOpen={isOpen}>{children}</Content>}
      <AddButton disabled={disabled} action={action} hidden={hidden}>{text}</AddButton>
    </CategoriesWrapper>
  );
};

export default JournalCategories;
