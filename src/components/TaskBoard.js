import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Column from "./Column";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsAddingTask(true);
    setIsModalOpen(true);
  };

  const handleUpdateTask = (updatedTask) => {
    if (isAddingTask) {
      const newTask = { ...updatedTask, id: Date.now().toString() };
      setTasks((prev) => [...prev, newTask]);
    } else {
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    }
    setIsModalOpen(false);
  };

  const moveTask = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const onEditTask = (task) => {
    setEditingTask(task);
    setIsAddingTask(false);
    setIsModalOpen(true);
  };

  const onDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      // Delete the task from the UI state
      setTasks((prev) => {
        const updatedTasks = prev.filter((task) => task.id !== taskId);
        // Update localStorage with the new task list
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    }
  };

  // Load tasks from localStorage on initial load
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Persist tasks in localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Task Management</h1>
        <button
          className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {["To Do", "In Progress", "Done"].map((status) => (
          <Column
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            moveTask={moveTask}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
      {isModalOpen && (
        <Modal
          task={editingTask}
          isAddingTask={isAddingTask}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default TaskBoard;
