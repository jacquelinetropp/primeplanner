import React, { useState } from "react";
import styled from "styled-components";
import { StyledDelete, StyledEdit } from "../UI/Wrappers/Wrappers";
import DeleteBudgetItem from "./DeleteBudgetItem";
import InputBudgetItem from "./InputBudgetItem";

const Wrapper = styled.div`
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ItemName = styled.div`
  font-size: 1.4rem;
`;

const PriceDiv = styled.div`
  font-size: 1.4rem;
`;

const Controls = styled.div``;

const BudgetItem = ({ item }) => {
  const [isEdting, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <Wrapper>
      <ItemName>{item.name}</ItemName>
      <PriceDiv>{item.price}</PriceDiv>
      <Controls>
        <StyledEdit onClick={() => setIsEditing(true)} />
        <StyledDelete onClick={() => setIsDeleting(true)} />
      </Controls>
      <InputBudgetItem
        item={item}
        opened={isEdting}
        close={() => setIsEditing(false)}
      />
      <DeleteBudgetItem
        item={item}
        show={isDeleting}
        close={() => setIsDeleting(false)}
      />
    </Wrapper>
  );
};

export default BudgetItem;
