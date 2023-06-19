import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledWrapper = styled.div`
  &:hover {
    background-color: var(--color-white);
  }
`;

const TagWrapper = styled(Link)`
  display: grid;
  align-items: center;
  grid-template-columns: 20px 1fr;
  background-color: transparent;
  min-height: 30px;
  padding: 0 2rem;
  color: var(--color-white);

  &:hover {
    color: var(--color-main);
  }
`;

const TagName = styled.div`
  padding-left: 10px;
  font-weight: 700;
`;

const JournalTag = ({ name, link, color, onClick }) => {
  return (
    <StyledWrapper color={color} onClick={onClick}>
      <TagWrapper to={link}>
        <TagName>
          <p>{name}</p>
        </TagName>
      </TagWrapper>
    </StyledWrapper>
  );
};

export default JournalTag;
