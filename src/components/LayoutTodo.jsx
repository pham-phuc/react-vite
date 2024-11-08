import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadTasksFromLocalStorage } from '../features/todos/todoSlice';
import TodoApp from './todoApp/TodoApp';

const LayoutTodo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('todos')) || [];
    dispatch(loadTasksFromLocalStorage(storedTasks));
  }, [dispatch]);

  return <TodoApp />;
};

export default LayoutTodo;
