import * as actions from "./houseTypes";

const initialState = {
  loading: false,
  error: null,
  chores: [],
};

const houseReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_CHORE_START:
      return {
        ...state,
        loading: true,
      };
    case actions.ADD_CHORE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case actions.ADD_CHORE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.GET_CHORE_START:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_CHORE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        chores: payload,
      };
    case actions.GET_CHORE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.COMPLETE_CHORE_START:
      return {
        ...state,
        loading: true,
      };
    case actions.COMPLETE_CHORE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actions.COMPLETE_CHORE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state;
  }
};

export default houseReducer;
