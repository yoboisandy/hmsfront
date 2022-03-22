import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const naviagte = useNavigate();

  useEffect(() => {
    localStorage.setItem("token", "");
    naviagte("/login");
  });

  return null;
}

export default Logout;
