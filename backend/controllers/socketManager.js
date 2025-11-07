import { Server } from "socket.io";
import { Chat } from "../models/chat.models.js";

let connections = {};
let timeOnline = {};

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
    console.log("A user connected:", socket.id);

    socket.on("join-call", async (room) => {
      if (!connections[room]) connections[room] = [];
      connections[room].push(socket.id);
      timeOnline[socket.id] = new Date();

      console.log(`User ${socket.id} joined room: ${room}`);

      // Send chat history from MongoDB
      const previousMessages = await Chat.find({ room }).sort({ createdAt: 1 });
      previousMessages.forEach((msg) => {
        io.to(socket.id).emit("chat-message", msg.message, msg.sender);
      });
    });

    socket.on("chat-message", async (message, sender) => {
      const room = "global-chat"; // fixed shared chat room
      if (connections[room]) {
        // Save to MongoDB
        await Chat.create({ sender, message, room });

        // Broadcast message
        connections[room].forEach((id) => {
          io.to(id).emit("chat-message", message, sender);
        });
        console.log(`[${room}] ${sender}: ${message}`);
      }
    });

    socket.on("disconnect", () => {
      Object.entries(connections).forEach(([room, users]) => {
        if (users.includes(socket.id)) {
          connections[room] = users.filter((id) => id !== socket.id);
          if (connections[room].length === 0) delete connections[room];
        }
      });
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};