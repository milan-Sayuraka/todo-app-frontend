import { Dispatch } from 'redux';
import {
  fetchTodosAPI,
  createTodoAPI,
  updateTodoAPI,
  deleteTodoAPI,
} from '../../services/api';

// Action types
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

export const CREATE_TODO_REQUEST = 'CREATE_TODO_REQUEST';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export const CREATE_TODO_FAILURE = 'CREATE_TODO_FAILURE';

export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

// Fetch Todos
export const fetchTodos = (params = {}) => async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_TODOS_REQUEST });
    try {
      const response = await fetchTodosAPI(params);
      dispatch({ type: FETCH_TODOS_SUCCESS, payload: response.data });
    } catch (error: any) {
      dispatch({ type: FETCH_TODOS_FAILURE, error: error.message });
    }
  };
  

// Create Todo
export const createTodo = (todo: any) => async (dispatch: Dispatch) => {
  dispatch({ type: CREATE_TODO_REQUEST });
  try {
    const response = await createTodoAPI(todo);
    dispatch({ type: CREATE_TODO_SUCCESS, payload: response.data });
  } catch (error: any) {
    dispatch({ type: CREATE_TODO_FAILURE, error: error.message });
  }
};

// Update Todo
export const updateTodo = (id: string, updatedTodo: any) => async (dispatch: Dispatch) => {
  dispatch({ type: UPDATE_TODO_REQUEST });
  try {
    const response = await updateTodoAPI(id, updatedTodo);
    dispatch({ type: UPDATE_TODO_SUCCESS, payload: response.data });
  } catch (error: any) {
    dispatch({ type: UPDATE_TODO_FAILURE, error: error.message });
  }
};

// Delete Todo
export const deleteTodo = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_TODO_REQUEST });
  try {
    await deleteTodoAPI(id);
    dispatch({ type: DELETE_TODO_SUCCESS, payload: id });
  } catch (error: any) {
    dispatch({ type: DELETE_TODO_FAILURE, error: error.message });
  }
};
