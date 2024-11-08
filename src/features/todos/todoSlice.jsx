import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: []
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, newText } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) task.text = newText;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    moveTask: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedTask] = state.tasks.splice(fromIndex, 1);
      state.tasks.splice(toIndex, 0, movedTask);
    },
    loadTasksFromLocalStorage: (state, action) => {
      state.tasks = action.payload;
    }
  }
});

export const { addTask, editTask, deleteTask, toggleComplete, moveTask, loadTasksFromLocalStorage } = todoSlice.actions;
export default todoSlice.reducer;
