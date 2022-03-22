import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/admin/Admin";
import Frontend from "./components/frontend/Frontend";
import { useState, useEffect } from "react";
import UserContext from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    let token = localStorage.getItem("token");
    await axios
      .get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setUser({ error: true, role: "" });
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={[user, fetchUser, setUser]}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin*" element={<Admin />} />
          <Route exact path="/*" element={<Frontend />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
