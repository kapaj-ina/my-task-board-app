import { BrowserRouter, Routes, Route } from "react-router-dom";
import TasksBoard from "./components/TasksBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/board/:boardId" element={<TasksBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
