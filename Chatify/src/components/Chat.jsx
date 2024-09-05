import React, { useEffect, useState } from "react";
import styles from "./chat.module.css";
import SideNav from "./SideNav";

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
  const handleDelete = (msgID) => {
    const token = sessionStorage.getItem("userToken");
    fetch(`https://chatify-api.up.railway.app/messages/${msgID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        console.log(`Message with ID ${msgID} deleted successfully.`);
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== msgID)
        );
      });
  };
  return (
    <div className={styles.wrapper}>
      <SideNav />
      <div className={styles.chatContainer}>
        <h1 className={styles.chatHeader}>
          Welcome to Chatify, {username}
          {avatar && <img src={avatar} style={{ width: "100px" }} />}
        </h1>
        <h2 className={styles.messagesHeader}>Messages</h2>
        <ul className={styles.messageList}>
          {[...fakeChat, ...messages].map((message, index) => (
            <li
              key={index}
              className={`${styles.messageItem} ${
                messages.some((msg) => msg.id === message.id)
                  ? styles.realMessage
                  : styles.fakeMessage
              }`}
            >
              {(message.avatar || avatar) && (
                <img
                  src={message.avatar || avatar}
                  alt={`${message.username}'s avatar`}
                  className={styles.avatar}
                />
              )}
              <div
                className={`${styles.messageBubble} ${
                  messages.some((msg) => msg.id === message.id)
                    ? styles.realBubble
                    : styles.fakeBubble
                }`}
              >
                {message.text}
              </div>
              {messages.some((msg) => msg.id === message.id) && (
                <button
                  onClick={() => handleDelete(message.id)}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSendMessage} className={styles.formContainer}>
          <input
            type="text"
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
            placeholder="Write your message"
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
