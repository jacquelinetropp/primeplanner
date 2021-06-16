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
import { getAmountSpent } from "../../utils/BudgetUtils";
import SetBudget from "../../components/SetBudget/SetBudget";

const Wrapper = styled.div`
  text-align: center;
`;

const BudgetMaxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BudgetItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const BudgetCalculations = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledAmount = styled.div`
  border: 1px solid black;
  width: min-content;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  justify-self: center;
  color: ${({ color }) =>
    color ? "var(--color-secondary)" : "var(--color-errorRed)"};
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
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

  const [setBudget, isSettingBudget] = useState(false);

  //Set Budget Items
  let content;
  if (loading || !budgetItems) {
    content = <div>Loading...</div>;
  } else if (budgetItems.length === 0) {
    content = <div>No budget items</div>;
  } else {
    content = (
      <Fragment>
        {budgetItems.map((item) => (
          <BudgetItem key={item.id} item={item}>
            Test
          </BudgetItem>
        ))}
      </Fragment>
    );
  }

  //set Budget
  let maxBudgetContent;
  if (!maxBudget && loading) {
    maxBudgetContent = "Loading...";
  } else if (!maxBudget[0]) {
    maxBudgetContent = <p>Please set your monthly budget</p>;
  } else {
    maxBudgetContent = <p>{maxBudget[0].amount}</p>;
  }
  const [isAdding, setIsAdding] = useState(false);

  //set Amount spent
  let amountSpent;
  if (loading && !budgetItems) {
    amountSpent = "Loading...";
  } else if (!budgetItems) {
    amountSpent = "Please add Items";
  } else {
    amountSpent = budgetItems.reduce((acc, value) => {
      return acc + value.price;
    }, 0);
  }

  //set Remaining Balance
  let remainingBalanceAmount;
  const remainingBalance = () => {
    if (!maxBudget.amount && loading) {
      return (remainingBalanceAmount = "Loading...");
    } else if (!maxBudget[0]) {
      return (remainingBalanceAmount = "N/A");
    } else {
      return (remainingBalanceAmount = maxBudget[0].amount - amountSpent);
    }
  };
  remainingBalance();

  return (
    <JournalMain>
      <Wrapper>
        <h4>Monthly Budget</h4>
        <BudgetMaxWrapper>
          <h6>Your monthly Budget: $ </h6>
          {maxBudgetContent}
          {maxBudget ? (
            <Button onClick={() => isSettingBudget(true)} contain>
              Change Budget
            </Button>
          ) : (
            <Button onClick={() => isSettingBudget(true)} contain>
              Set Budget
            </Button>
          )}
        </BudgetMaxWrapper>
        <BudgetCalculations>
          <CenteredDiv>
            <h6>Amount Spent: </h6>
            <StyledAmount>{amountSpent}</StyledAmount>
          </CenteredDiv>
          <CenteredDiv>
            <h6>Amount Remaining: </h6>
            <StyledAmount color={amountSpent < maxBudget ? "color" : ""}>
              {remainingBalanceAmount}
            </StyledAmount>
          </CenteredDiv>
        </BudgetCalculations>
        <BudgetItemWrapper>
          <h6>Item</h6>
          <h6>Price</h6>
          {content}
        </BudgetItemWrapper>
      </Wrapper>
      <AddButton action={() => setIsAdding(true)}>Add Budget Item</AddButton>
      <InputBudgetItem opened={isAdding} close={() => setIsAdding(false)} />
      <SetBudget
        maxBudget={maxBudget}
        opened={setBudget}
        close={() => isSettingBudget(false)}
      />
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
