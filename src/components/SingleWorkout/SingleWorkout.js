import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-size: ${({ calendar }) => (calendar ? "1.4rem" : "1.8rem")};
  display: flex;
  align-items: center;
  align-items: center;
  padding: 0.5rem 1rem;
  font-weight: 700;
  color: ${({ type }) => {
    if (type === "strength") return "var(--color-tertiary)";
    else if (type === "cardio") return "var(--color-mainLight)";
    else if (type === "HIIT") return "var(--color-second)";
    else if (type === "recovery") return "var(--color-main)";
    else return "var(--color-main)";
  }};
`;

const TaskSquare = styled.div`
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 22px solid var(--color-text);
  margin-right: 1rem;
`;

const SingleWorkout = ({ workout }) => {
  return (
    <Wrapper type={workout.type}>
      <TaskSquare />
      {workout.name}
    </Wrapper>
  );
};

export default SingleWorkout;
