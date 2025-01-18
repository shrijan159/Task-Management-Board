import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskBoard from "./components/TaskBoard";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <TaskBoard />
      </div>
    </DndProvider>
  );
};

export default App;
