import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${({ contain }) => (contain ? "auto" : "100%")};
  outline: none;
  padding: 1.2rem 2rem;
  border-radius: 10px;
  font-size: 1.2rem;
  color: var(--color-white);
  font-weight: 700;
  box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
  background-color: ${({ color }) => {
    if (color === "red") return "var(--color-errorRed)";
    else if (color === "main") return "var(--color-mainDark)";
    else return "var(--color-main)";
  }};
  margin: 1rem;
  border: none;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(2px);
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #333;
    color: var(--color-white);
  }
`;

const Button = ({ children, disabled, loading, color, contain, ...rest }) => {
  return (
    <StyledButton color={color} contain={contain} disabled={disabled} {...rest}>
      {loading ? loading : children}
    </StyledButton>
  );
};

export default Button;
