import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import * as actions from "../../store/actions/actions";
import LoadingCircle from "../Loading/Loading";

const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h2`
  font-size: 1.5rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const StyledImage = styled.img`
  height: 30px;
  width: 30px;
`;

const WeatherHome = ({ getWeather, data, loading, lat, lng }) => {
  useEffect(() => {
    if ((lat, lng)) {
      getWeather(lat, lng);
    }
  }, [lat, lng]);

  let content;
  if (loading || !data) {
    content = (
      <WeatherWrapper>
        <LoadingCircle />
      </WeatherWrapper>
    );
  } else if (data.length === 0) {
    content = (
      <WeatherWrapper>
        <h6> No Content</h6>
      </WeatherWrapper>
    );
  } else {
    const iconurl =
      "http://openweathermap.org/img/w/" +
      `${!data ? null : data.current.weather[0].icon}` +
      ".png";
    content = (
      <WeatherWrapper>
        <Header className="center">Current Weather</Header>
        <Info>
          <StyledImage className="icon" src={iconurl} alt="weather symbol" />
          <p>
            {" "}
            {data.current.temp}
            <sup>o</sup>
          </p>
        </Info>
      </WeatherWrapper>
    );
  }

  return <Fragment>{content}</Fragment>;
};

const mapStateToProps = ({ weather, firebase }) => ({
  data: weather.forecast,
  loading: weather.loading,
  lat: firebase.profile.lat,
  lng: firebase.profile.lng,
});

const mapDispatchToProps = {
  getWeather: actions.getWeather,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherHome);
