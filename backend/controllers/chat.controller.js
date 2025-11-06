import { Chat } from "../models/chat.models.js";
import { User } from "../models/user.models.js";
import httpStatus from "http-status";

export const getChatStats = async (req, res) => {
    const totalChats = await Chat.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(httpStatus.OK).json({
      success: true,
      totalChats,
      totalUsers,
    });
};
