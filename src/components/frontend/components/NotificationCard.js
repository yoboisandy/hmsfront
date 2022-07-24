import axiosInstance from "../../../helpers/instance";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NotificationCard = ({
  created_at,
  data,
  id,
  read_at,
  fetchNotifications,
}) => {
  const theme = data.theme;

  const markAsRead = async (id) => {
    await axiosInstance
      .get(`http://localhost:8000/api/notifications/markasread/${id}`)
      .then((res) => {
        fetchNotifications();
      });
  };

  return (
    <div className="py-8">
      <div
        className={`flex ${
          !read_at && "bg-gray-200"
        } gap-3 mx-auto justify-between w-9/12 px-4 py-4 border-l-8  ${
          theme === "success" && "border-green-500"
        } ${theme === "error" && "border-red-500"} ${
          theme === "info" && "border-blue-500"
        }  shadow-xl rounded-lg`}
      >
        <div className="flex gap-6">
          <div className="flex items-center">
            {theme === "error" && (
              <i class="fas text-red-500 fa-2x fa-exclamation-circle"></i>
            )}
            {theme === "success" && (
              <i class="fas text-green-500 fa-2x fa-check-circle"></i>
            )}
            {theme === "info" && (
              <i class="fas text-blue-500 fa-2x fa-info-circle"></i>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-lg font-semibold">{data.message}</div>
            <div>
              <Link
                className={`text-white ${
                  theme === "success" && "bg-green-500"
                } ${theme === "error" && "bg-red-500"} ${
                  theme === "info" && "bg-blue-500"
                } p-1.5 rounded`}
                to={`${data.url}`}
              >
                {data["url-text"]}
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col  items-center ${
            read_at ? "justify-end" : "justify-around"
          }`}
        >
          {!read_at && (
            <span
              className="text-blue-700 underline cursor-pointer"
              onClick={() => markAsRead(id)}
            >
              Mark as read <i className="fas fa-check-circle" />
            </span>
          )}
          <div className="text-gray-600">{created_at}</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
