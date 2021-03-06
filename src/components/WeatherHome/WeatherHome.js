import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { MinIcon } from "../UI/Wrappers/Wrappers";

import * as actions from "../../store/actions/actions";
import LoadingCircle from "../Loading/Loading";

const WeatherWrapper = styled.div`
  grid-column: 3/5;
  border-radius: 5px;
  border-bottom: 1px solid var(--color-grayDark);
  border-right: 1px solid var(--color-grayDark);
  height: ${({ isOpen }) => (isOpen ? "100%" : "min-content")};
  position: relative;

  @media only screen and (max-width: 768px) {
    grid-column: 1/-1;
  }
`;

const Header = styled.h2`
  font-size: ${({ isOpen }) => (isOpen ? "3rem" : "1.2rem")};
`;

const MinimizeWrapper = styled.div``;

const WeatherHeader = styled.div`
  background-color: var(--color-gray);
  height: 100%;
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
  width: 60px;
`;

const WeatherHome = ({ getWeather, data, loading, lat, lng }) => {
  useEffect(() => {
    if ((lat, lng)) {
      getWeather(lat, lng);
    }
  }, [lat, lng]);

  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

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
      <WeatherWrapper isOpen={isOpen}>
        <MinimizeWrapper>
          <MinIcon onClick={togglePopup} />
        </MinimizeWrapper>
        <WeatherHeader>
          <Header isOpen={isOpen} className="center">
            Current Weather
          </Header>
          {isOpen && (
            <Fragment>
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
                    <h6 className="padding-xs">
                      {data.current.weather[0].main}
                    </h6>
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
            </Fragment>
          )}
        </WeatherHeader>
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
