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
import NotificationCheck from "./contexts/NotificationCheck";

function App() {
  const [user, setUser] = useState({});
  const [fullLoading, setFullLoading] = useState(false);
  const [canOrder, setCanOrder] = useState(false);
  let token = localStorage.getItem("token");

  const [hasNotifications, setHasNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const checkUnread = async () => {
    setFullLoading(true);
    await axios
      .get(`http://localhost:8000/api/hasunread`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.message) {
          setHasUnread(true);
        } else {
          setHasUnread(false);
        }
      });
    setFullLoading(false);
  };
  const countNotifications = async () => {
    setFullLoading(true);
    await axios
      .get(`http://localhost:8000/api/countnotifications`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setNotificationCount(res.data.count);
        console.log(res.data.count);
      });
    setFullLoading(false);
  };

  const checkNotification = async () => {
    setFullLoading(true);
    await axios
      .get(`http://localhost:8000/api/hasnotifications`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.message) {
          setHasNotifications(true);
        } else {
          setHasNotifications(false);
        }
      });
    setFullLoading(false);
  };
  const getNotifications = async () => {
    setFullLoading(true);
    await axios
      .get(`http://localhost:8000/api/notifications`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setNotifications(res.data);
      });
    setFullLoading(false);
  };

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
      })
      .catch((err) => {
        setCanOrder(false);
      });
  };
  window.onunload = function () {
    sessionStorage.clear();
  };
  useEffect(() => {
    fetchUser();
    getNotifications();
    checkNotification();
    checkUnread();
    countNotifications();
    canOrderFood();
    console.log(canOrder);
  }, []);

  return (
    <FullLoadingContext.Provider value={[fullLoading, setFullLoading]}>
      <UserContext.Provider value={[user, fetchUser, setUser]}>
        <CanOrderFood.Provider value={[canOrder, canOrderFood, setCanOrder]}>
          <NotificationCheck.Provider
            value={[
              notificationCount,
              hasNotifications,
              setHasNotifications,
              hasUnread,
              setHasUnread,
            ]}
          >
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
          </NotificationCheck.Provider>
        </CanOrderFood.Provider>
      </UserContext.Provider>
    </FullLoadingContext.Provider>
  );
}

export default App;
