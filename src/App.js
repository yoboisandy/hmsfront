import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/admin/Admin";
import Frontend from "./components/frontend/Frontend";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/admin/*" element={<Admin />} />
        <Route exact path="/*" element={<Frontend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
