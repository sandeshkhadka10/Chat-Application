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

    // When user joins a room (meeting)
    socket.on("join-call", async (room) => {
      if (!connections[room]) connections[room] = [];
      connections[room].push(socket.id);
      timeOnline[socket.id] = new Date();

      // Notify existing users that a new user joined
      connections[room].forEach((id) => {
        if (id !== socket.id)
          io.to(id).emit("user-joined", socket.id, connections[room]);
      });

      // Send chat history from MongoDB to the newly joined user
      const previousMessages = await Chat.find({ room }).sort({ createdAt: 1 });
      previousMessages.forEach((msg) => {
        io.to(socket.id).emit("chat-message", msg.message, msg.sender, null);
      });
    });

    // Handle new chat messages
    socket.on("chat-message", async (message, sender) => {
      const [room, found] = Object.entries(connections).reduce(
        ([r, isFound], [key, value]) => {
          if (!isFound && value.includes(socket.id)) {
            return [key, true];
          }
          return [r, isFound];
        },
        ["", false]
      );

      if (found) {
        // Save chat in MongoDB
        await Chat.create({ sender, message, room });

        // Broadcast message to everyone in the same room
        connections[room].forEach((id) => {
          io.to(id).emit("chat-message", message, sender, socket.id);
        });

        console.log(`[${room}] ${sender}: ${message}`);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      Object.entries(connections).forEach(([room, users]) => {
        if (users.includes(socket.id)) {
          connections[room] = users.filter((id) => id !== socket.id);
          io.to(room).emit("user-left", socket.id);
          if (connections[room].length === 0) delete connections[room];
        }
      });
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};
