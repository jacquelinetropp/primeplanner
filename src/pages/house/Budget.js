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
import SetBudget from "../../components/SetBudget/SetBudget";
import ResetBudget from "../../components/ResetBudget/ResetBudget";
import LoadingCircle from "../../components/Loading/Loading";

const Wrapper = styled.div`
  text-align: center;
`;

const BudgetMaxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
`;

const BudgetItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const BudgetCalculations = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledAmount = styled.div`
  border: ${({ color }) =>
    color
      ? "1px solid var(--color-second)"
      : "1px solid var(--color-errorRed)"};
  width: min-content;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  justify-self: center;
  color: ${({ color }) =>
    color ? "var(--color-second)" : "var(--color-errorRed)"};
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Div = styled.div`
  grid-column: 1/-1;
  font-size: 1.5rem;
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
  const [deleteBudget, setDeletingBudget] = useState(false);

  //Set Budget Items
  let content;
  if (loading || !budgetItems) {
    content = <LoadingCircle />;
  } else if (budgetItems.length === 0) {
    content = <Div>No budget items</Div>;
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

  //color of boxes:
  let color;
  const colorfunc = () => {
    if (!maxBudget.amount && loading) {
      return (color = "");
    } else if (!maxBudget[0]) {
      return (color = "");
    } else {
      return (color = amountSpent < maxBudget[0].amount ? "color" : "");
    }
  };

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
          <Button onClick={() => setDeletingBudget(true)} contain>
            Reset Budget
          </Button>
        </BudgetMaxWrapper>
        <BudgetCalculations>
          <CenteredDiv>
            <h6>Amount Spent: </h6>
            <StyledAmount color={colorfunc()}>{amountSpent}</StyledAmount>
          </CenteredDiv>
          <CenteredDiv>
            <h6>Amount Remaining: </h6>
            <StyledAmount color={colorfunc()}>
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
      <ResetBudget show={deleteBudget} close={() => setDeletingBudget(false)} />
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
