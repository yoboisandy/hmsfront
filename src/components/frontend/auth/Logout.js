import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CanOrderFood from "../../../contexts/CanOrderFood";
import UserContext from "../../../contexts/UserContext";

function Logout() {
  const naviagte = useNavigate();
  const [user, fetchUser, setUser] = useContext(UserContext);
  const [setCanOrder, canOrderFood] = useContext(CanOrderFood);
  setUser({});
  // setCanOrder(false);
  useEffect(() => {
    canOrderFood();
    localStorage.setItem("token", "");
    naviagte("/login");
  });

  return null;
}

export default Logout;
