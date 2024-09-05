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
    <div className={styles.sideNavContainer}>
      <div className={styles.hamburgerMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <div className={styles.sideNav}>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideNav;
