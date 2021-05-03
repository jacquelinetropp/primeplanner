import * as actions from "./todosTypes";

const initialState = {
  error: null,
  loading: false,
  deleteTodo: {
    error: null,
    loading: false,
  },
  completeTodo: {
    error: null,
    loading: false,
  },
  currentTodos: [],
  allTodos: [],
};

const todosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_TODO_START:
      return { ...state, loading: true };

    case actions.GET_TODO_SUCCESS:
      return { ...state, loading: false, error: false, currentTodos: payload };

    case actions.GET_TODO_FAIL:
      return { ...state, loading: false, error: payload };
    case actions.ADD_TODO_START:
      return { ...state, loading: true };

    case actions.ADD_TODO_SUCCESS:
      return { ...state, loading: false, error: false };

    case actions.ADD_TODO_FAIL:
      return { ...state, loading: false, error: payload };

    case actions.DELETE_TODO_START:
      return {
        ...state,
        deleteTodo: {
          ...state.deleteTodo,
          loading: true,
        },
      };

    case actions.DELETE_TODO_SUCCESS:
      return {
        ...state,
        deleteTodo: {
          ...state.deleteTodo,
          loading: false,
          error: false,
        },
      };

    case actions.DELETE_TODO_FAIL:
      return {
        ...state,
        deleteTodo: {
          ...state.deleteTodo,
          loading: false,
          error: payload,
        },
      };
    case actions.COMPLETE_TODO_START:
      return {
        ...state,
        completeTodo: {
          ...state.completeTodo,
          loading: true,
        },
      };
    case actions.COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        completeTodo: {
          ...state.completeTodo,
          loading: false,
          error: false,
        },
      };

    case actions.COMPLETE_TODO_FAIL:
      return {
        ...state,
        completeTodo: {
          ...state.completeTodo,
          loading: false,
          error: payload,
        },
      };

    case actions.GET_ALL_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        allTodos: payload,
      };

    default:
      return state;
  }
};

export default todosReducer;
