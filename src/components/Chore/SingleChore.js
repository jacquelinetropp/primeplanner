import React, { useState } from "react";
import styled from "styled-components";
import { Fragment } from "react";
import CompleteChore from "../CompleteChore/CompleteChore";

const Wrapper = styled.div`
  font-size: ${({ calendar }) => (calendar ? "1.4rem" : "1.8rem")};
  display: flex;
  align-items: center;
  align-items: center;
  padding: 0.5rem 1rem;
  font-weight: 700;
  color: var(--color-text);
`;

const TaskTriangle = styled.div`
  height: 20px;
  width: 20px;
  margin-right: 1rem;
  transition: all 1s;
  cursor: pointer;
  border: 1px solid black;

  background-color: ${({ completed }) => (completed ? "black" : "none")};

  &:hover {
    background-color: black;
  }
`;

const SingleChore = ({ chore, calendar }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  return (
    <Fragment>
      <Wrapper calendar={calendar}>
        <TaskTriangle onClick={() => setIsCompleting(true)} />
        {chore.name}
      </Wrapper>
      <CompleteChore
        chore={chore}
        opened={isCompleting}
        close={() => setIsCompleting(false)}
      />
    </Fragment>
  );
};

export default SingleChore;
