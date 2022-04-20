import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Frontend from "./components/frontend/Frontend";
import { useState, useEffect } from "react";
import UserContext from "./contexts/UserContext";
import FullLoadingContext from "./contexts/FullLoadingContext";
import FullSpinner from "./components/frontend/components/FullSpinner";
import Home from "./components/frontend/Home";
import CanOrderFood from "./contexts/CanOrderFood";

function App() {
  const [user, setUser] = useState({});
  const [fullLoading, setFullLoading] = useState(false);
  const [canOrder, setCanOrder] = useState(false);
  let token = localStorage.getItem("token");

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

  const canOrderFood = async () => {
    await axios
      .get(`http://localhost:8000/api/canorderfood`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data > 0) {
          setCanOrder(true);
        } else {
          setCanOrder(false);
        }
        // console.log(res.data);
      });
  };
  window.onunload = function () {
    sessionStorage.clear();
  };
  useEffect(() => {
    fetchUser();
    canOrderFood();
    console.log(canOrder);
  }, []);

  return (
    <FullLoadingContext.Provider value={[fullLoading, setFullLoading]}>
      <UserContext.Provider value={[user, fetchUser, setUser]}>
        <CanOrderFood.Provider value={canOrder}>
          {fullLoading && <FullSpinner />}
          <BrowserRouter>
            <Routes>
              {!fullLoading && (
                <>
                  <Route exact path="/dashboard/*" element={<Dashboard />} />
                  <Route exact path="/*" element={<Frontend />} />
                </>
              )}
            </Routes>
          </BrowserRouter>
        </CanOrderFood.Provider>
      </UserContext.Provider>
    </FullLoadingContext.Provider>
  );
}

export default App;
