import React from "react";
import { useDrag } from "react-dnd";

function TaskCard({ task, onDelete, onEditTask }) {
  const [, drag] = useDrag({
    type: "TASK",
    item: { id: task.id },
  });

  return (
    <div
      ref={drag}
      className="bg-white p-5 rounded-lg shadow-lg mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
    >
      <h3 className="font-semibold text-xl text-gray-800 mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{task.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        <span className="font-medium text-gray-700">Due:</span> {task.dueDate}
      </p>
      <div className="flex justify-between items-center gap-2">
        <button
          className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200"
          onClick={onEditTask}
        >
          Edit
        </button>
        <button
          className="px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors duration-200"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
