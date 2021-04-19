import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import AddButton from "../../../UI/Button/AddButton";
import JournalMain from "../JournalMain/JournalMain";

const CategoriesWrapper = styled.div`
  display: flex;
  grid-column: 2/3;
  flex-direction: column;
  border-right: 1px solid #f0efef;
`;

const Category = styled(Link)`
    height: 30px;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    padding-left: .8rem;
    font-weight: 600;    
    color: var(--color-mainDark);
`;

const Header = styled.h6`
  font-size: 2.2rem;
  text-align: center;
  border-bottom: 1px solid #f0efef;
`;

const JournalCategories = ({ disabled, children, action}) => {
  return (
    <CategoriesWrapper>

      <Header>Pages</Header>
        {children}


    </CategoriesWrapper>
  );
};

export default JournalCategories;
