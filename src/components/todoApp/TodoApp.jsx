import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../features/todos/todoSlice";
import TaskItem from "./TaskItem";
import { v4 as uuidv4 } from "uuid";

const TodoApp = () => {
  const tasks = useSelector((state) => state.todos.tasks);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask({ id: uuidv4(), text: newTask, completed: false }));
      setNewTask("");
    }
  };

  return (
    <div>
      <input
        className="p-[10px] border border-blue-400 w-[300px] rounded-lg focus:outline-none focus:border-blue-500 "
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button className="bg-[#3498db] p-[11px] ml-[5px] rounded-lg hover:bg-[#2980b9] text-[#fff]" onClick={handleAddTask}>
        Add Task
      </button>

      <ul className="pt-[30px]">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            totalTasks={tasks.length}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
