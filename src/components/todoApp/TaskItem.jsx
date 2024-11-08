import { useDispatch } from "react-redux";
import {
  deleteTask,
  toggleComplete,
  moveTask,
} from "../../features/todos/todoSlice";
import { CheckCircleOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { UndoOutlined } from "@ant-design/icons";
import { UpOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
const TaskItem = ({ task, index, totalTasks }) => {
  const dispatch = useDispatch();

  return (
    <li className="w-[700px] py-[20px]">
    <label>{index + 1} - </label>
      <span
        className="w-[200px] inline-block"
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.text}
      </span>
      <button
        className="px-[15px] "
        onClick={() => dispatch(toggleComplete(task.id))}
      >
        {task.completed ? <UndoOutlined className="text-[18px] text-yellow-500 text-2xl hover:text-yellow-700 cursor-pointer" /> : <CheckCircleOutlined className="text-[18px] text-green-500 text-2xl hover:text-green-700 cursor-pointer" />}
      </button>
      <button className="px-[15px] " onClick={() => dispatch(deleteTask(task.id))}>
        <DeleteOutlined className="text-[18px] text-red-500 text-2xl hover:text-red-700 cursor-pointer" />
      </button>

      {/* Move task up/down */}
      {index > 0 && (
        <button
          className="px-[15px]"
          onClick={() =>
            dispatch(moveTask({ fromIndex: index, toIndex: index - 1 }))
          }
        >
          <UpOutlined className="text-[18px] text-blue-500 text-2xl hover:text-blue-700 cursor-pointer" />
        </button>
      )}
      {index < totalTasks - 1 && (
        <button
          className="px-[15px]"
          onClick={() =>
            dispatch(moveTask({ fromIndex: index, toIndex: index + 1 }))
          }
        >
          <DownOutlined className="text-[18px] text-blue-500 text-2xl hover:text-blue-700 cursor-pointer" />
        </button>
      )}
    </li>
  );
};

export default TaskItem;
