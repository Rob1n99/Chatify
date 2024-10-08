import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [avatar, setAvatar] = useState("");
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

  const handleRegister = (e) => {
    e.preventDefault();

    fetch("https://chatify-api.up.railway.app/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        csrfToken: csrfToken,
        avatar: avatar,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log("Registration failed", data.error);
          setError(data.error);
        } else {
          console.log("Registration successfull");
          navigate("/Login");
        }
      });
  };
  return (
    <div className={styles.mainContainer}>
      <form className={styles.container} onSubmit={handleRegister}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <label>Choose Avatar</label>
        <input
          type="text"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

        <button className={styles.registerBtn} type="submit">
          Register
        </button>
        {error && <p>{error}</p>}
        <Link className={styles.link} to="/login">
          Login
        </Link>
      </form>
    </div>
  );
}

export default Register;
