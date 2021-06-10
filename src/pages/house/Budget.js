import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import styled from "styled-components";
import { Fragment } from "react";
import JournalMain from "../../components/layout/Journal/JournalMain/JournalMain";
import Button from "../../components/UI/Button/Button";
import BudgetItem from "../../components/BudgetItem/BudgetItem";
import AddButton from "../../components/UI/Button/AddButton";
import InputBudgetItem from "../../components/BudgetItem/InputBudgetItem";

const Wrapper = styled.div`
  text-align: center;
`;

const BudgetMaxWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Budget = ({
  maxBudget,
  getMaxBudget,
  budgetItems,
  getBudgetItems,
  loading,
}) => {
  useEffect(() => {
    getMaxBudget();
    getBudgetItems();
  }, []);
  let content;
  if (loading || !budgetItems) {
    content = <div>Loading...</div>;
  } else if (budgetItems.length === 0) {
    content = <div>No budget items</div>;
  } else {
    content = (
      <Fragment>
        {budgetItems.map((item) => (
          <BudgetItem item={item}>Test</BudgetItem>
        ))}
      </Fragment>
    );
  }
  let maxBudgetContent;
  if (maxBudget === null) {
    maxBudgetContent = <p>Please set your monthly budget</p>;
  } else {
    maxBudgetContent = <p>{maxBudget}</p>;
  }
  const [isAdding, setIsAdding] =useState(false);
  console.log(isAdding);
  return (
    <JournalMain>
      <Wrapper>
        <h4>Monthly Budget</h4>
        <BudgetMaxWrapper>
        <h6>Your monthly Budget: {" "} ${" "}</h6>
        {maxBudgetContent}
        {maxBudget ? (
            <Button contain>Change Budget</Button>
        ) : (
            <Button contain>Set Budget</Button>
        )}
        </BudgetMaxWrapper>
        {content}
      </Wrapper>
      <AddButton action={() => setIsAdding(true)}>Add Budget Item</AddButton>
      <InputBudgetItem  opened={isAdding} close={() => setIsAdding(false)} />
    </JournalMain>
  );
};

const mapStateToProps = ({ finance }) => ({
  maxBudget: finance.max,
  budgetItems: finance.budget,
  loading: finance.loading,
});

const mapDispatchToProps = {
  getMaxBudget: actions.getMaxBudget,
  getBudgetItems: actions.getBudget,
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
