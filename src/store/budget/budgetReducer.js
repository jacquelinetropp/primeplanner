import * as actions from "./budgetTypes";

const initialState = {
  loading: false,
  error: null,
  budget: [],
  max: null,
};

const budgetReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_BUDGET_START:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_BUDGET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        budget: payload,
      };
    case actions.GET_BUDGET_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.ADD_BUDGET_START:
      return {
        ...state,
        loading: true,
      };
    case actions.ADD_BUDGET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case actions.ADD_BUDGET_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.SET_BUDGET_START:
      return { ...state, loading: true };
    case actions.SET_BUDGET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case actions.SET_BUDGET_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.GET_MAX_START:
      return {
        loading: true,
      };
    case actions.GET_MAX_SUCCESS:
      return {
        loading: false,
        error: false,
        max: payload,
      };
    case actions.GET_MAX_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default budgetReducer;
