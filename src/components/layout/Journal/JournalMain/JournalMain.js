import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--color-white);
  grid-column: 2/-1;
  grid-row: 3/-1;
  padding: 1rem;
  position: relative;
  overflow: scroll;

  @media only screen and (max-width: 768px) {
    grid-row: 4/-1;
  }
`;

const JournalMain = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default JournalMain;
