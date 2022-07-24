import axiosInstance from "../../helpers/instance";
import React, { useContext, useEffect, useState } from "react";
import NotificationCheck from "../../contexts/NotificationCheck";
import NotificationCard from "./components/NotificationCard";
import Spinner from "./components/Spinner";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [setHasNotifications] = useContext(NotificationCheck);

  const fetchNotifications = async () => {
    setLoading(true);
    await axiosInstance
      .get(`http://localhost:8000/api/notifications`)
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.log("something went wrong");
      });
    setLoading(false);
  };

  const markAllAsRead = async () => {
    await axiosInstance
      .get(`http://localhost:8000/api/notifications/markallasread`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        fetchNotifications();
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchNotifications();
    setLoading(false);
  }, []);

  return (
    <div>
      {/* {loading && <Spinner />} */}
      {/* {!loading && ( */}
      <div>
        {/* <div>Your Bookings</div> */}
        <div className="bg-indigo-900 h-72 bg-cover bg-center bg-[url('https://technext.github.io/royal/image/about_banner.jpg')] bg-blend-soft-light bg-fixed flex items-center justify-center">
          <div className="text-white ">
            {/* <div className="border-l-4 border-indigo-500 w-6/12 mx-auto"></div> */}
            <h2 className="text-6xl font-semibold tracking-wider border-l-8 border-indigo-500 pl-3 text-center flex items-center">
              <span>Notifications</span>
            </h2>
          </div>
        </div>
        <div className="my-10">
          <div className="flex w-9/12 justify-end mx-auto">
            <span
              className="text-blue-700 underline cursor-pointer"
              onClick={markAllAsRead}
            >
              Mark All as Read <i className="fas fa-check-circle" />
            </span>
          </div>
          {notifications.map((el) => {
            return (
              <NotificationCard
                {...el}
                fetchNotifications={fetchNotifications}
              />
            );
          })}
          {notifications.length === 0 && (
            <div className="w-full">
              <div className="mx-auto text-white font-semibold tracking-widest w-1/2 text-center text-2xl p-3 bg-yellow-400">
                No Unread Notifications
              </div>
            </div>
          )}
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Notifications;
