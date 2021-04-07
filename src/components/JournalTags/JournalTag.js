import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TagWrapper = styled(Link)`
  display: grid;
  grid-template-columns: 20px 1fr;
  background-color: transparent;
  height: 30px;
`;

const Tag = styled.div`
  background-color: var(--color-mainDark);
  clip-path: polygon(50% 0, 100% 0, 100% 50%, 100% 100%, 50% 100%, 21% 50%);
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
`;

const TagName = styled.div`
  text-align: center;
  background-color: var(--color-mainLight);
`;

const JournalTag = ({ name, link }) => {
  return (
    <TagWrapper to={link}>
      <Tag />
      <TagName>
        <h6>{name}</h6>
      </TagName>
    </TagWrapper>
  );
};

export default JournalTag;
