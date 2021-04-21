import React, { Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import JournalMain from "../../components/layout/Journal/JournalMain/JournalMain";
import WeatherPage from "./WeatherPage";

const DetailsWrapper = styled.div`
  background-color: var(--color-white);
`;

const DetailsInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StyledTable = styled.table`
  width: 100%;
`;

const CurrentDetails = ({ data }) => {
  let content;
  if (!data) {
    content = <div>Loading...</div>;
  } else if (data.length === 0) {
    content = <div>Loading...</div>;
  }else {
    content = (
      <DetailsWrapper>
        <DetailsInfo>
          <div className="section1">
            <StyledTable>
              <tbody>
                <tr>
                  <td>
                    <h6>High/Low</h6>
                  </td>
                  <td>
                    <p>
                      {data.daily[0].temp.max}/{data.daily[0].temp.min}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Humidity</h6>
                  </td>
                  <td>
                    <p>{data.current.humidity} %</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Pressure</h6>
                  </td>
                  <td>
                    <p>{data.current.pressure} hPa</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Visibility</h6>
                  </td>
                  <td>
                    <p>{data.current.visibility} m</p>
                  </td>
                </tr>
              </tbody>
            </StyledTable>
          </div>

          <div className="section2">
            <StyledTable>
              <tbody>
                <tr>
                  <td>
                    <h6>Wind</h6>
                  </td>
                  <td>
                    <p>{data.current.wind_speed} mi/hr</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Wind Direction</h6>
                  </td>
                  <td>
                    <p>
                      {data.current.wind_deg}
                      <sup>o</sup> deg
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Sunrise</h6>
                  </td>
                  <td>
                    <p>
                      {new Date(
                        data.current.sunrise * 1000
                      ).toLocaleTimeString()}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Sunset</h6>
                  </td>
                  <td>
                    <p>
                      {new Date(
                        data.current.sunset * 1000
                      ).toLocaleTimeString()}
                    </p>
                  </td>
                </tr>
              </tbody>
            </StyledTable>
          </div>
        </DetailsInfo>
      </DetailsWrapper>
    );
  }
  return (
    <Fragment>
      <JournalMain>{content}</JournalMain>
    </Fragment>
  );
};

const mapStateToProps = ({ weather }) => ({
  data: weather.forecast,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(CurrentDetails);
