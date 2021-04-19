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
   background-color: ${({ color }) => {
    if (color === "yellow") return "#DBCE8A";
    else if (color === "pink") return "var(--color-mainDark)";
    else if (color === "green") return "#87DEA6";
    else return "#87C8D6";}};
  clip-path: polygon(50% 0, 100% 0, 100% 50%, 100% 100%, 50% 100%, 21% 50%);
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
`;

const TagName = styled.div`
  text-align: center;
  background-color: ${({ color }) => {
    if (color === "yellow") return "var(--color-tertiary)";
    else if (color === "pink") return "var(--color-mainLight)";
    else if (color === "green") return "var(--color-second)";
    else return "var(--color-main)";}};
  color: var(--color-text);
`;

const JournalTag = ({ name, link, color }) => {
  return (
    <TagWrapper to={link}>
      <Tag color={color}/>
      <TagName color={color}>
        <h6>{name}</h6>
      </TagName>
    </TagWrapper>
  );
};

export default JournalTag;
