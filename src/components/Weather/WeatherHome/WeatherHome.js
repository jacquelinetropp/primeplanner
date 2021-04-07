import React from "react";
import styled from "styled-components";

const WeatherWrapper = styled.div`
  grid-column: 3/-1;
  background-color: #7ecf9a;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const WeatherContent = styled.div`
  background-color: var(--color-second);
  height: calc(100% - 3rem);
  margin-top: 3rem;
`;

const WeatherHome = () => {
  return (
    <WeatherWrapper>
      <WeatherContent>
        <h2 className="center">Current Weather</h2>
      </WeatherContent>
    </WeatherWrapper>
  );
};

export default WeatherHome;
