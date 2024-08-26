import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [userId, setUserId] = useState();
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
    console.log("Logging in with user...", { username, password, csrfToken });

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
          localStorage.setItem("userToken", data.token);
          console.log(data.token);
          setError("");
          setSuccess("Login successful...");
          setTimeout(() => {
            navigate("/Chat");
          }, 3000);
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default Login;
