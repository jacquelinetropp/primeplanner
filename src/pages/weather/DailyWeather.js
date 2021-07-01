import React, { Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import JournalMain from "../../components/layout/Journal/JournalMain/JournalMain";

const DailyWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  padding: 1rem;

  @media only screen and (max-width: 900px) {
    grid-column: 1/-1;
    grid-row: 2/3;
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 768px) {
    padding: 1rem 0;
  }

  @media only screen and (max-width: 425px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const DailyContent = styled.div`
  background-color: rgba(242, 227, 153, 0.7);
  text-align: center;
  border-radius: 5px;
  padding: 1rem;
`;

const DailyWeather = ({ data }) => {
  let dayOfTheWeek = [];
  function displayDate() {
    const today = new Date();
    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (var i = 0; i < 14; i++) {
      if (i === 0) {
        dayOfTheWeek.push("Today");
      } else {
        dayOfTheWeek.push(week[(today.getDay() + i) % 7]);
      }
    }
  }
  displayDate();

  let content;
  if (!data) {
    content = <div>Loading...</div>;
  } else if (data.length === 0) {
    content = <div>Loading...</div>;
  } else {
    content = (
      <DailyWrapper>
        {data.map((day, index) => {
          return (
            <DailyContent key={Math.random() * 99}>
              <h6>{`${dayOfTheWeek[index]}`}</h6>
              <img
                src={
                  "http://openweathermap.org/img/w/" +
                  `${!day ? null : day.weather[0].icon}` +
                  ".png"
                }
                alt="weather icon"
                className="neg-marbottom icon"
              />

              <h3>
                {day.temp.max}
                <sup>o</sup>
              </h3>
              <h5>
                {day.temp.min}
                <sup>o</sup>
              </h5>
            </DailyContent>
          );
        })}
      </DailyWrapper>
    );
  }
  console.log(data);
  return (
    <Fragment>
      <JournalMain>{content}</JournalMain>
    </Fragment>
  );
};

const mapStateToProps = ({ weather }) => ({
  data: weather.forecast.daily,
});

export default connect(mapStateToProps)(DailyWeather);
