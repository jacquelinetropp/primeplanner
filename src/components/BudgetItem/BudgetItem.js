import React from "react";
import styled from "styled-components";
import { filterAndSortItems } from "../../utils/HelperFunctions";

const Wrapper = styled.div`
grid-column: 1/-1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const ItemName = styled.div`
  font-size: 1.4rem;
`;

const PriceDiv = styled.div`
    font-size: 1.4rem;
`

const BudgetItem = ({ item }) => {
  return (
    <Wrapper>
      <ItemName>{item.name}</ItemName>
      <PriceDiv>{item.price}</PriceDiv>
    </Wrapper>
  );
};

export default BudgetItem;
