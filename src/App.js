import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/admin/Admin";
import Frontend from "./components/frontend/Frontend";
import { useState, useEffect } from "react";
import UserContext from "./contexts/UserContext";
import FullLoadingContext from "./contexts/FullLoadingContext";
import FullSpinner from "./components/frontend/components/FullSpinner";

function App() {
  const [user, setUser] = useState({});
  const [fullLoading, setFullLoading] = useState(false);
  const fetchUser = async () => {
    setFullLoading(true);
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
    setFullLoading(false);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <FullLoadingContext.Provider value={[fullLoading, setFullLoading]}>
      <UserContext.Provider value={[user, fetchUser, setUser]}>
        {fullLoading && <FullSpinner />}
        <BrowserRouter>
          <Routes>
            {!fullLoading && (
              <>
                <Route exact path="/admin/*" element={<Admin />} />
                <Route exact path="/*" element={<Frontend />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </FullLoadingContext.Provider>
  );
}

export default App;
