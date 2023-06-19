import * as actions from "./weatherTypes";

export const getWeather = (lat, lng) => async (dispatch) => {
  dispatch({ type: actions.WEATHER_START });
  try {
    const APIKEY = "7fa77fe3445b5ebdef0bae325c71544c";
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=imperial&APPID=${APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => data);
    dispatch({ type: actions.WEATER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: actions.WEATHER_FAIL, payload: err });
  }
};
