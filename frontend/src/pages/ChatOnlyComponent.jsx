import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router";

const server_url = "http://localhost:8000";
const ROOM_ID = "global-chat";

export default function ChatOnlyComponent() {
  const socketRef = useRef();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [askForUsername, setAskForUsername] = useState(true);

  // New: chat stats
  const [stats, setStats] = useState({ totalChats: 0, totalUsers: 0 });

  // Fetch chat stats from backend
  const fetchStats = async () => {
    try {
      const res = await fetch(`${server_url}/api/chat/stats`);
      const data = await res.json();
      if (data.success) {
        setStats({
          totalChats: data.totalChats,
          totalUsers: data.totalUsers,
        });
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchStats(); // Fetch on load
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const connectToSocketServer = () => {
    socketRef.current = io(server_url, { secure: false });

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-call", ROOM_ID);
      console.log("Connected to chat server:", socketRef.current.id);
    });

    socketRef.current.on("chat-message", (data, sender) => {
      setMessages((prev) => [...prev, { sender, data }]);
      // Update total chats count live
      setStats((prev) => ({ ...prev, totalChats: prev.totalChats + 1 }));
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  };

  const connect = () => {
    if (!username.trim()) {
      setUsernameError("Username is required");
      return;
    }
    setAskForUsername(false);
    connectToSocketServer();
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    socketRef.current.emit("chat-message", message, username);
    setMessage("");
  };

  const leaveRoom = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {askForUsername ? (
        <div className="text-center bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Enter Chat Room</h2>
          <div className="flex gap-3 justify-center mb-2">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={connect}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Connect
            </button>
          </div>
          {usernameError && (
            <p className="text-red-500 text-sm mt-2">{usernameError}</p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-5">
          {/* Chat header with stats */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">Chat Room</h2>
              <p className="text-sm text-gray-500">
                Total Chats: {stats.totalChats} | Users: {stats.totalUsers}
              </p>
            </div>
            <button
              onClick={leaveRoom}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Leave
            </button>
          </div>

          <div className="border border-gray-300 rounded-md h-80 overflow-y-auto p-3 mb-4">
            {messages.length > 0 ? (
              messages.map((item, index) => (
                <div key={index} className="mb-2">
                  <strong className="text-gray-800">{item.sender}</strong>
                  <p className="text-gray-700 text-sm break-words">
                    {item.data}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-10">
                No messages yet...
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
