import React, { useEffect, useState } from "react";

function Chat() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      console.log("JWT token", token);
      const decodedJwt = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded Jwt", decodedJwt);
      setUserId(decodedJwt.id);
      setUsername(decodedJwt.user);
      //   const avatarUrl = "https://i.pravatar.cc/100?img=50";
      setAvatar(decodedJwt.avatar);
    } else {
      console.log("No token found");
    }
  }, []);
  return (
    <div>
      <h1>
        Welcome to chatify, {username} <img src={avatar} />
      </h1>
    </div>
  );
}

export default Chat;
