import React, { useState } from "react";
import styled from "styled-components";
import { findNextDate } from "../../utils/HelperFunctions";
import CompleteChore from "../CompleteChore/CompleteChore";
import Button from "../UI/Button/Button";
import { isBefore, parseISO } from "date-fns";

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
  background-color: ${({ overdue }) => (overdue ? "none" : "")};
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
  const nextDate = findNextDate(chore.frequency, chore.amount, chore.lastDate);

  const isOverdue = isBefore(parseISO(nextDate), new Date());
  console.log(isOverdue);

  return (
    <Wrapper>
      <NameWrapper color={chore.color}>{chore.name}</NameWrapper>
      <LastDateWrapper>
        <p>Last completed...</p>
        <p>{chore.lastDate ? lastCompleted : "Not completed"}</p>
      </LastDateWrapper>
      <NextDateWrapper overdue={isOverdue ? "overdue" : ""}>
        <p>Complete by...</p>
        <p>{chore.lastDate ? nextDate : "Complete task first"}</p>
      </NextDateWrapper>
      <FrequencyWrapper>
        {chore.frequency} {chore.amount}
      </FrequencyWrapper>
      <ButtonWrapper>
        <Button onClick={() => setIsCompleting(true)}>Complete Task</Button>
      </ButtonWrapper>
      <CompleteChore
        chore={chore}
        opened={isCompleting}
        close={() => setIsCompleting(false)}
      />
    </Wrapper>
  );
};

export default Chore;
