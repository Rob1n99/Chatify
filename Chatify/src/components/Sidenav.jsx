import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidenav.css"; // Stilar för Sidenav-komponenten

function Sidenav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Ta bort användarens token från localStorage
    sessionStorage.removeItem("userToken");
    // Navigera till inloggningssidan
    navigate("/login");
  };

  return (
    <div className="sidenav">
      <button onClick={handleLogout} className="logout-button">
        Logga ut
      </button>
    </div>
  );
}

export default Sidenav;
