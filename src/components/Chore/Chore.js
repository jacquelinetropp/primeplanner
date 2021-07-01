import React, { useState } from "react";
import styled from "styled-components";
import CompleteChore from "../CompleteChore/CompleteChore";
import Button from "../UI/Button/Button";
import { isBefore } from "date-fns";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: .5rem;
  padding: 1rem;
  border: 1px solid var(--color-text);
  border-radius: 5px;
`;

const NameWrapper = styled.div`
  grid-column: 1/-1;
  font-size: 1.8rem;
  text-align: center;
  border-radius: 5px;
  height: min-content;
  font-weight: 600;
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
  justify-content: center;
  border-radius: 5px;
  padding: 0.5rem;
  border: 1px solid var(--color-text);
  min-height: 80px;
`;

const NextDateWrapper = styled.div`
  grid-column: 2/3;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80px;
  justify-content: center;
  padding: 0.5rem;
  background-color: ${({ overdue }) => (overdue ? "#f2b6e8" : "")};
  border: 1px solid var(--color-text);
  border-radius: 5px;
`;

const FrequencyWrapper = styled.div`
  grid-column: 1/-1;
  font-size: 1.1rem;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  grid-column: 1/-1;
  width: 75%;
  justify-self: center;
`;

const Chore = ({ chore }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const lastCompleted = new Date(chore.lastDate).toDateString();
  const nextComplete = new Date(chore.nextDate).toDateString();
  const isOverdue = isBefore(chore.nextDate, new Date());

  return (
    <Wrapper>
      <NameWrapper color={chore.color}>{chore.name}</NameWrapper>
      <LastDateWrapper>
        <h6>Last completed...</h6>
        <p>{chore.lastDate ? lastCompleted : "Not completed"}</p>
      </LastDateWrapper>
      <NextDateWrapper overdue={isOverdue ? "overdue" : ""}>
        <h6>Complete by...</h6>
        <p>{chore.lastDate ? nextComplete : "Complete task first"}</p>
      </NextDateWrapper>
      <ButtonWrapper>
      <Button onClick={() => setIsCompleting(true)}>Complete Task</Button>
    </ButtonWrapper>
      <FrequencyWrapper>
       Every {chore.frequency} {chore.amount}
      </FrequencyWrapper>
    
      <CompleteChore
        chore={chore}
        opened={isCompleting}
        close={() => setIsCompleting(false)}
      />
    </Wrapper>
  );
};

export default Chore;
