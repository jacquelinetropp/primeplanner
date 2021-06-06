import React from "react";
import styled from "styled-components";
import Button from "../UI/Button/Button";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 1rem;
  border: 1px solid var(--color-text);
  border-radius: 5px;
`;

const NameWrapper = styled.div`
  grid-column: 1/-1;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 5px;
  height: min-content;
  background-color: ${({ color }) => {
    if (color === "yellow") return "var(--color-tertiary)";
    else if (color === "pink") return "var(--color-mainLight)";
    else if (color === "green") return "var(--color-second)";
    else return "var(--color-main)";
  }};
`;

const LastDateWrapper = styled.div`
  grid-column: 1/2;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 0.5rem;
`;

const NextDateWrapper = styled.div`
  grid-column: 2/3;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 0.5rem;
`;

const FrequencyWrapper = styled.div`
  grid-column: 1/-1;
  font-size: 1.1rem;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  grid-column:1/-1;
  width: 75%;
  justify-self: center;
`

const Chore = ({ chore }) => {
  return (
    <Wrapper>
      <NameWrapper color={chore.color}>{chore.name}</NameWrapper>
      <LastDateWrapper>
        <p>Last completed...</p>
        <p>{chore.lastDate}</p>
      </LastDateWrapper>
      <NextDateWrapper>
        <p>Complete by...</p>
        <p>{chore.nextDate}</p>
      </NextDateWrapper>
      <FrequencyWrapper>
        {chore.frequency} {chore.amount}
      </FrequencyWrapper>
      <ButtonWrapper>
        <Button >Complete Task</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Chore;
