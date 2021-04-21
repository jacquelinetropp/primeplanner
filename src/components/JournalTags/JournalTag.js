import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TagWrapper = styled(Link)`
  display: grid;
  align-items: center;
  grid-template-columns: 20px 1fr;
  background-color: transparent;
  height: 30px;
  padding: 0 2rem;
`;

const OldTag = styled.div`
   background-color: ${({ color }) => {
    if (color === "yellow") return "#DBCE8A";
    else if (color === "pink") return "var(--color-mainDark)";
    else if (color === "green") return "#87DEA6";
    else return "#87C8D6";}};
  clip-path: polygon(50% 0, 100% 0, 100% 50%, 100% 100%, 50% 100%, 21% 50%);
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
`;

const Tag = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => {
    if (color === "yellow") return "#DBCE8A";
    else if (color === "pink") return "var(--color-mainDark)";
    else if (color === "green") return "#87DEA6";
    else return "#87C8D6";}};
  margin: 0 auto;
`

const TagName = styled.div`
  /* background-color: ${({ color }) => {
    if (color === "yellow") return "var(--color-tertiary)";
    else if (color === "pink") return "var(--color-mainLight)";
    else if (color === "green") return "var(--color-second)";
    else return "var(--color-main)";}}; */
  color: var(--color-text);
  padding-left: 10px;
`;

const JournalTag = ({ name, link, color }) => {
  return (
    <TagWrapper to={link}>
      <Tag color={color}/>
      <TagName >
        <p>{name}</p>
      </TagName>
    </TagWrapper>
  );
};

export default JournalTag;
