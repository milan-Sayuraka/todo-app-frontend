import { FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE, CREATE_TODO_REQUEST, CREATE_TODO_SUCCESS, CREATE_TODO_FAILURE, UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE, DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE } from '../actions/todoActions';

interface TodoState {
  loading: boolean;
  todos: any[];
  error: string | null;
}

const initialState: TodoState = {
  loading: false,
  todos: [],
  error: null,
};

export const todoReducer = (state = initialState, action: any): TodoState => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
    case CREATE_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
    case DELETE_TODO_REQUEST:
      return { ...state, loading: true };

    case FETCH_TODOS_SUCCESS:
      return { ...state, loading: false, todos: action.payload };

    case CREATE_TODO_SUCCESS:
      return { ...state, loading: false, todos: [...state.todos, action.payload] };

    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };

    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case FETCH_TODOS_FAILURE:
    case CREATE_TODO_FAILURE:
    case UPDATE_TODO_FAILURE:
    case DELETE_TODO_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};
