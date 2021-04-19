import React, { useState } from "react";
import styled from "styled-components";

import {Icon} from '../UI/Wrappers/Wrappers';

const PostWrapper = styled.div`
  border-radius: 5px;
  grid-column: 1/3;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  height: ${({isOpen}) => (isOpen ? "100%" : "min-content")};

  @media only screen and (max-width: 425px) {
    grid-column: 1/-1;
    grid-row: 3/4;
    width: 100vw;
  }
`;

const MinimizeWrapper = styled.div`
  background-color: #87c8d6;
  height: 3rem;
`;

const PostContent = styled.div`
  background-color: var(--color-main);
  height: calc(100% - 3rem);
  display: ${({isOpen}) => (isOpen ? "block" : "none")};
`;

const TaskPostit = () => {
  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <PostWrapper isOpen={isOpen}>
      <MinimizeWrapper>
        <Icon onClick={togglePopup} />
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
