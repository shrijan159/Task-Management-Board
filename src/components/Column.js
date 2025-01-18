import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

function Column({ status, tasks, moveTask, onEditTask, onDeleteTask }) {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`p-6 rounded-lg shadow-lg transition-transform duration-300 ${
        isOver ? "bg-blue-200 scale-105" : "bg-blue-100"
      }`}
    >
      <h2 className="font-bold text-2xl text-gray-800 mb-6">{status}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => onDeleteTask(task.id)}
            onEditTask={() => onEditTask(task)}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-sm text-gray-500 text-center">No tasks here.</p>
        )}
      </div>
    </div>
  );
}

export default Column;
