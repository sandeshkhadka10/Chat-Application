import { Chat } from "../models/chat.models.js";
import { activeUsers } from "./socketManager.js";
import httpStatus from "http-status";

export const getChatStats = async (req, res) => {
  try {
    const totalChats = await Chat.countDocuments();
    const totalUsers = activeUsers.size;

    res.status(httpStatus.OK).json({
      success: true,
      totalChats,
      totalUsers,
      activeUsernames: Array.from(activeUsers),
    });
  } catch (err) {
    console.error("Error fetching chat stats:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to get chat statistics",
    });
  }
};
