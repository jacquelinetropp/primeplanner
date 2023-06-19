import * as actions from './weatherTypes';

const initialState = {
    errors: null,
    loading: false,
    forecast: []

}

export default (state= initialState, {type, payload}) => {
    switch(type) {
        case actions.WEATHER_START:
            return {...state, loading: true};
        case actions.WEATER_SUCCESS: 
            return {...state, loading: false, errors: false, forecast: payload};
        case actions.WEATHER_FAIL: 
            return {...state, loading: false, errors: payload}
        
        default: return state;
    }
}