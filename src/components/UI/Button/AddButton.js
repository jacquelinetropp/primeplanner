import React from "react";
import styled from "styled-components";

import { AiOutlinePlus } from "react-icons/ai";

const StyledPlus = styled(AiOutlinePlus)`
  font-size: 1.8rem;
  margin-right: 1.3rem;
`;

const Wrapper = styled.button`
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-top: 1px solid #f0efef;
  font-weight: 700;
  font-size: 15px;
  padding: 0.5rem;
  outline: none;
  width: 100%;
  background-color: transparent;
  margin-top: auto;
  display: ${({ hidden }) => (hidden ? "none" : "block")};
  color: ${({ color }) => (color ? "var(--color-white)" : "black")};

  &:disabled {
    background-color: #cccccc;
    pointer-events: none;
  }

  &:hover {
    background-color: var(--color-white);
    color: var(--color-main);
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AddButton = ({ children, action, disabled, hidden, color }) => {
  return (
    <Wrapper disabled={disabled} onClick={action} hidden={hidden} color={color}>
      <InnerWrapper>
        <StyledPlus />
        {children}
      </InnerWrapper>
    </Wrapper>
  );
};

export default AddButton;
