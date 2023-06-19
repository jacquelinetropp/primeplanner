import React, { Fragment } from "react";
import styled from "styled-components";

import TaskPostit2 from "../../TaskPostit/TaskPostIt2";
import { format } from "date-fns";

const TodayDateWrapper = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  grid-column: 2/-1;
  grid-row: 1/2;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    grid-column: 1/-1;
    grid-row: 2/3;
  }
`;

const TodaysDate = styled.h1`
  font-size: 1.8rem;
`;

const DailYWrapper = styled.div`
  grid-column: 2/-1;
  grid-row: 2/3;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media only screen and (max-width: 768px) {
    grid-row: 3/4;
  }
`;

const Main = () => {
  const FormattedDate = format(new Date(), "eeee LLLL d, yyyy");

  return (
    <Fragment>
      <TodayDateWrapper>
        <TodaysDate>{FormattedDate}</TodaysDate>
      </TodayDateWrapper>
      <DailYWrapper>
        <TaskPostit2 />
      </DailYWrapper>
    </Fragment>
  );
};

export default Main;
