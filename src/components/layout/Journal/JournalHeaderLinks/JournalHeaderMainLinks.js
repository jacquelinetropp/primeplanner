import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
`;

const Icon = styled.div`
  font-size: 2rem;
  padding-right: 10px;
`;

const Name = styled.h3`
  font-size: 2rem;
  color: #fff;
`;

const JournalHeaderMainLinks = ({ icon, name, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <Icon>{icon}</Icon>
      <Name>{name}</Name>
    </Wrapper>
  );
};

export default JournalHeaderMainLinks;
