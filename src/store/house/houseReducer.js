import * as actions from "./houseTypes";

const initialState = {
  loading: false,
  error: null,
  chores: [],
  workouts: {
    loading: false,
    error: null,
    workoutList: [],
  },
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
        loading: false,
      };
    case actions.COMPLETE_CHORE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actions.ADD_WORKOUT_START:
      return {
        ...state,
        workouts: {
          ...state.workouts,
          loading: true,
        },
      };
    case actions.ADD_WORKOUT_SUCCESS:
      return {
        ...state,
        workouts: {
          ...state.workouts,
          loading: false,
          error: false,
        },
      };
    case actions.ADD_WORKOUT_FAIL:
      return {
        ...state,
        workouts: {
          ...state.workouts,
          loading: false,
          error: payload,
        },
      };
    case actions.GET_WORKOUT_START:
      return {
        ...state,
        workouts: {
          ...state.workouts,
          loading: true,
        },
      };
    case actions.GET_WORKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        workouts: {
          ...state.workouts,
          loading: false,
          error: false,
          workoutList: payload
        },
  
      };
    case actions.GET_WORKOUT_FAIL:
      return {
        ...state,
        workouts: {
          ...state.workouts,
          loading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default houseReducer;
