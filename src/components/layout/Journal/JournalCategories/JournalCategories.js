import React from "react";
import styled from "styled-components";
import AddButton from "../../../UI/Button/AddButton";
import JournalMain from "../JournalMain/JournalMain";

const CategoriesWrapper = styled.div`
  display: flex;
  grid-column: 2/3;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #f0efef;
`;

const Category = styled.div`
    height: 30px;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    padding-left: .8rem;
    font-weight: 600;
    
`;

const JournalCategories = ({ categories }) => {
  return (
    <CategoriesWrapper>
      <div>
        {categories ? (
            categories.map((category) => {
                return <Category>{category}</Category>;
              })
        ) : (
            null
        )}
      </div>
      <AddButton>Add Page</AddButton>
    </CategoriesWrapper>
  );
};

export default JournalCategories;
