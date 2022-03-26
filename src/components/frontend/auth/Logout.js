import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";

function Logout() {
  const naviagte = useNavigate();
  const [user, fetchUser, setUser] = useContext(UserContext);
  setUser({});

  useEffect(() => {
    localStorage.setItem("token", "");
    naviagte("/login");
  });

  return null;
}

export default Logout;
