import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./sideNav.module.css";

function SideNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("userToken");

    navigate("/login");
  };

  return (
    <div className={styles.sideNav}>
      <button onClick={handleLogout} className={styles.logoutBtn}>
        Logout
      </button>
    </div>
  );
}

export default SideNav;
