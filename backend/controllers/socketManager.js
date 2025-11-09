import { Server } from "socket.io";
import { Chat } from "../models/chat.models.js";

// Store connected users in memory
const activeUsers = new Set();
let connections = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    socket.on("join-call", async (room, username) => {
      if (!connections[room]) connections[room] = [];
      connections[room].push(socket.id);
      socket.username = username;

      console.log(`${username} joined ${room}`);
      activeUsers.add(username); // Add user to active list

      // Send previous messages
      const previousMessages = await Chat.find({ room }).sort({ createdAt: 1 });
      previousMessages.forEach((msg) => {
        io.to(socket.id).emit("chat-message", msg.message, msg.sender);
      });

      // Broadcast updated active user list to all clients
      io.emit("active-users", Array.from(activeUsers));
    });

    socket.on("chat-message", async (message, sender) => {
      const room = "global-chat";
      if (connections[room]) {
        await Chat.create({ sender, message, room });
        connections[room].forEach((id) => {
          io.to(id).emit("chat-message", message, sender);
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      if (socket.username) {
        activeUsers.delete(socket.username); // Remove from active list
        io.emit("active-users", Array.from(activeUsers)); // update clients
      }

      Object.entries(connections).forEach(([room, users]) => {
        if (users.includes(socket.id)) {
          connections[room] = users.filter((id) => id !== socket.id);
          if (connections[room].length === 0) delete connections[room];
        }
      });
    });
  });

  return io;
};

// Export activeUsers so controller can use it
export { activeUsers };
