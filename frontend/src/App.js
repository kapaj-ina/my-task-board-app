import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./components/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/board/:boardId" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
