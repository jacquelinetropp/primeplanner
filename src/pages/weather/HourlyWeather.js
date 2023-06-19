import React, { Fragment } from "react";
import JournalMain from "../../components/layout/Journal/JournalMain/JournalMain";
import WeatherPage from "./WeatherPage";
import styled from "styled-components";
import { connect } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HourlyWrapper = styled.div`
  max-width: 65vw;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    grid-row: 4/5;
  }

  @media only screen and (max-width: 425px) {
    width: 85vw;
  }
`;

const HourlyContent = styled.div`
  background-color: rgba(242, 227, 153, 0.7);
  border-radius: 5px;
  text-align: center;
  margin: 1rem;
  width: 85% !important;
`;

const HourlyWeather = ({ weather }) => {
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    slidesPerRow: 3,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 798,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  function displayHour(index) {
    let hour;
    const today = new Date();
    const newHour = today.getHours() + index;
    if (newHour > 24) {
      hour = `${newHour % 24}:00 hr`;
    } else if (index === 0) {
      hour = "Current";
    } else {
      hour = `${newHour}:00 hr`;
    }
    return hour;
  }

  let content;

  if (!weather) {
    content = <div>Loading...</div>;
  } else if (weather.length === 0) {
    content = <div>Loading...</div>;
  }else {
    content = (
      <HourlyWrapper>
        <Slider {...settings}>
          {weather.map((hour, index) => {
            return (
              <HourlyContent key={Math.floor(Math.random() * 87)}>
                <img
                  src={
                    "http://openweathermap.org/img/w/" +
                    `${!hour ? null : hour.weather[0].icon}` +
                    ".png"
                  }
                  alt="weather icon"
                  className="neg-marbottom icon"
                />
                <h3>
                  {hour.temp}
                  <sup>o</sup>
                </h3>
                <p>{displayHour(index)}</p>
              </HourlyContent>
            );
          })}
        </Slider>
      </HourlyWrapper>
    );
  }
  return (
    <Fragment>
      <JournalMain>{content}</JournalMain>
    </Fragment>
  );
};

const mapStateToProps = ({ weather }) => ({
  weather: weather.forecast.hourly,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(HourlyWeather);
