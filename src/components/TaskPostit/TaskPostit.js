import React, { useState } from "react";
import styled from "styled-components";

import { MinIcon } from "../UI/Wrappers/Wrappers";

const PostWrapper = styled.div`
  border-radius: 5px;
  grid-column: 1/3;
  height: ${({ isOpen }) => (isOpen ? "100%" : "min-content")};
  border-right: 1px solid var(--color-grayDark);
  border-bottom: 1px solid var(--color-grayDark);

  /* @media only screen and (max-width: 425px) {
    grid-column: 1/-1;
    grid-row: 3/4;
    width: 100vw;
  } */
`;

const MinimizeWrapper = styled.div`
 display: none;

@media only screen and (max-width: 425px) {
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
}
`;

const PostContent = styled.div`
  background-color: var(--color-gray);
  height: 100%;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const TaskPostit = () => {
  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <PostWrapper isOpen={isOpen}>
      <MinimizeWrapper>
        <MinIcon onClick={togglePopup} />
      </MinimizeWrapper>
      {isOpen && (
        <PostContent isOpen={isOpen}>
          <h2 className="center">Today's Tasks</h2>
        </PostContent>
      )}
    </PostWrapper>
  );
};

export default TaskPostit;
