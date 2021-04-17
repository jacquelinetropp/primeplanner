import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import AddButton from "../../../UI/Button/AddButton";
import JournalMain from "../JournalMain/JournalMain";

const CategoriesWrapper = styled.div`
  display: flex;
  grid-column: 2/3;
  flex-direction: column;
  justify-content: space-between;
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

const JournalCategories = ({ disabled, children }) => {
  return (
    <CategoriesWrapper>
      <div>
        {children}
      </div>
      <AddButton disabled={disabled}>Add Page</AddButton>
    </CategoriesWrapper>
  );
};

export default JournalCategories;
