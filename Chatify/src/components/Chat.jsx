import React, { useEffect, useState } from "react";

function Chat() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState("");

  const [fakeChat, setFakeChat] = useState([
    {
      text: "Tja tja, hur mår du?",
      avatar: "https://i.pravatar.cc/100?img=14",
      username: "Johnny",
      conversationId: null,
    },
    {
      text: "Hallå!! Svara då!!",
      avatar: "https://i.pravatar.cc/100?img=14",
      username: "Johnny",
      conversationId: null,
    },
    {
      text: "Sover du eller?! 😴",
      avatar: "https://i.pravatar.cc/100?img=14",
      username: "Johnny",
      conversationId: null,
    },
  ]);
  const fetchMessages = () => {
    const token = sessionStorage.getItem("userToken");
    if (token) {
      fetch("https://chatify-api.up.railway.app/messages?", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched messages", data);
          setMessages(data);
        });
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    if (token) {
      console.log("JWT token", token);
      const decodedJwt = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded Jwt", decodedJwt);
      setUserId(decodedJwt.id);
      setUsername(decodedJwt.user);
      setAvatar(decodedJwt.avatar);
      fetchMessages();
    } else {
      console.log("No token found");
    }
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("userToken");
    if (token) {
      fetch("https://chatify-api.up.railway.app/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          text: sendMessage,
          avatar: avatar,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("New message", data);
          setSendMessage("");
          fetchMessages();
        });
    }
  };

  return (
    <div>
      <h1>
        Welcome to chatify, {username}{" "}
        <img src={avatar} style={{ width: "100px" }} />
      </h1>
      <h2>Messages</h2>
      <ul>
        {[...fakeChat, ...messages].map((messages, index) => (
          <li key={index}>
            <img
              src={messages.avatar || avatar}
              alt={`${messages.username}'s avatar`}
              style={{ width: "30px", borderRadius: "50%" }}
            />

            {messages.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          placeholder="write your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
