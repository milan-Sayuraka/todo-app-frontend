import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// GET all todos
export const fetchTodosAPI = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api.get(`/todos?${query}`);
};

// CREATE a new todo
export const createTodoAPI = (todo: any) => api.post('/todos', todo);

// UPDATE a todo
export const updateTodoAPI = (id: string, updatedTodo: any) => api.put(`/todos/${id}`, updatedTodo);

// DELETE a todo
export const deleteTodoAPI = (id: string) => api.delete(`/todos/${id}`);

export default api;
