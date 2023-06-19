import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled(Link)`
  display: flex;
  justify-content: space-between;
  color: var(--color-white);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const JournalHeaderLinks = ({ img, text, number, link }) => {
  return (
    <Wrapper to={link}>
      <Header>
        {img}
        <p>{text}</p>
      </Header>
      <p>{number}</p>
    </Wrapper>
  );
};

export default JournalHeaderLinks;
