import { createStore, applyMiddleware, combineReducers } from 'redux';
import { todoReducer } from './reducers/todoReducer';
import { thunk } from 'redux-thunk';


const rootReducer = combineReducers({
  todos: todoReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
