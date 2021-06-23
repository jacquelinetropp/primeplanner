import * as actions from "./budgetTypes";

const initialState = {
  loading: false,
  error: null,
  budget: [],
  max: [],
  resetBudget: {
    loading: false,
    error: null
  }
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
    case actions.DELETE_BUDGET_START:
      return {
        ...state,
        loading: true
      }
    case actions.DELETE_BUDGET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      }
    case actions.DELETE_BUDGET_FAIL: 
    return {
      ...state,
      loading: false,
      error: payload
    }
    case actions.GET_MAX_START:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_MAX_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        max: payload,
      };
    case actions.GET_MAX_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.RESET_BUDGET_START:
      return {
        ...state,
        resetBudget: {
          ...state.resetBudget,
          loading: true
        }
      }
      case actions.RESET_BUDGET_SUCCESS:
        return {
          ...state,
          resetBudget: {
            ...state.resetBudget,
            loading: false,
            error: false
          }
        }
        case actions.RESET_BUDGET_FAIL:
          return {
            ...state,
            resetBudget: {
              ...state.resetBudget,
              loading: false,
              error: payload
            }
          }
    default:
      return state;
  }
};

export default budgetReducer;
