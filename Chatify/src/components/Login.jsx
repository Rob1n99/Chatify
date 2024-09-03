import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://chatify-api.up.railway.app/csrf", {
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCsrfToken(data.csrfToken);
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with user...", {
      username,
      password,
      csrfToken,
    });

    fetch("https://chatify-api.up.railway.app/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({
        username: username,
        password: password,
        csrfToken: csrfToken,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          sessionStorage.setItem("userToken", data.token);

          const decodedJwt = JSON.parse(atob(data.token.split(".")[1]));
          console.log("Decoded JWT:", decodedJwt);

          localStorage.setItem("userId", decodedJwt.id);
          localStorage.setItem("username", decodedJwt.user);
          console.log(data.token);
          setError("");
          setSuccess("Logging in...");
          setTimeout(() => {
            navigate("/Chat");
          }, 3000);
        }
      });
  };
  return (
    <div className={styles.mainContainer2}>
      <form className={styles.container} onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.loginBtn} type="submit">
          Login
        </button>
        {error && <p className="error">{error}</p>}
        {success && (
          <p style={{ color: "white", textAlign: "center" }}>{success}</p>
        )}
      </form>
    </div>
  );
}

export default Login;
