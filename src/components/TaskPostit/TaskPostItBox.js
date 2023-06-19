import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
  color: var(--color-white);
  margin: 1rem;
  border-radius: 5px;
  background-color: ${(props) => props.color};

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const NumberWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  font-size: 3rem;

  @media only screen and (max-width: 768px) {
    padding: 1rem;
    font-size: 2rem;
  }
`;

const NameWrapper = styled.div`
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to bottom,
    rgba(225, 225, 225, 0.3),
    rgba(225, 225, 225, 0.3)
  );
  padding: 1rem;
`;

const TaskPostItBox = ({ name, number, color }) => {
  return (
    <Wrapper color={color}>
      <NumberWrapper>{number}</NumberWrapper>
      <NameWrapper>{name}</NameWrapper>
    </Wrapper>
  );
};

export default TaskPostItBox;
