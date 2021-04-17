import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import * as actions from "../../store/actions/actions";

const WeatherWrapper = styled.div`
  grid-column: 3/-1;
  background-color: #7ecf9a;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const WeatherHeader = styled.div`
  background-color: var(--color-second);
  height: calc(100% - 3rem);
  margin-top: 3rem;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 2rem;
  justify-items: center;
  text-align: center;
`;

const Info = styled.div`
  grid-column: 1/2;
`;

const Image = styled.div`
  grid-column: 2/-1;
  text-align: center;
  align-self: center;

  display: grid;
  justify-content: end;
`;

const StyledImage = styled.img`
  height: 60px;
`;

const WeatherHome = ({ getWeather, data, loading }) => {
  useEffect(() => {
    getWeather(41.957776, -87.655647);
  }, []);

  let content;
  if (loading && !data) {
    content = <div>Loading</div>;
  } else if (data.length === 0) {
    content = <div>no content</div>;
  } else {
    const iconurl =
      "http://openweathermap.org/img/w/" +
      `${!data ? null : data.current.weather[0].icon}` +
      ".png";
    content = (
      <WeatherWrapper>
        <WeatherHeader>
          <h2 className="center">Current Weather</h2>
          <p className="center">As of {new Date().toLocaleTimeString()}</p>
          <Content>
            <Info>
              <h1>
                {" "}
                {data.current.temp}
                <sup>o</sup>
              </h1>
              <h5>
                Feels like {data.current.feels_like}
                <sup>o</sup>
              </h5>

              <div className="flex">
                <h6 className="padding-xs">{data.current.weather[0].main}</h6>
                <p className="padding-xs">
                  {data.current.weather[0].description}
                </p>
              </div>
            </Info>
            <Image>
              <StyledImage
                className="icon"
                src={iconurl}
                alt="weather symbol"
              />
              <h5>
                {data.daily[0].temp.max} <sup>o</sup>/
              </h5>
              <h5>
                {data.daily[0].temp.min}
                <sup>o</sup>
              </h5>
            </Image>
          </Content>
        </WeatherHeader>
      </WeatherWrapper>
    );
  }

  return <Fragment>{content}</Fragment>;
};

const mapStateToProps = ({ weather }) => ({
  data: weather.forecast,
  loading: weather.loading,
});

const mapDispatchToProps = {
  getWeather: actions.getWeather,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherHome);
