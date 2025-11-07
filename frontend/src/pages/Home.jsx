import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomeComponent() {
  const navigate = useNavigate();
  const { addToUserHistory, handleLogout } = useContext(AuthContext);

  const [meetingCode, setMeetingCode] = useState("");
  const [meetingCodeError, setMeetingCodeError] = useState("");

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) {
      setMeetingCodeError("Create or enter the meeting ID!");
      return;
    }
    setMeetingCodeError("");
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* ---------- NAVBAR ---------- */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h2 className="text-2xl font-semibold text-orange-500">Chatly</h2>

        <div className="flex items-center gap-4">
          <IconButton
            onClick={() => navigate("/history")}
            className="text-gray-700 hover:text-orange-500 transition"
          >
            <RestoreIcon />
            <p className="text-base ml-1">History</p>
          </IconButton>

          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{
              backgroundColor: "#f97316",
              "&:hover": { backgroundColor: "#ea580c" },
            }}
          >
            Logout
          </Button>
        </div>
      </nav>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex flex-col md:flex-row justify-center items-center flex-grow px-6 md:px-12 py-10 gap-12">
        {/* LEFT PANEL */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug text-gray-800">
            Fast, Secure, and Fun Chats for{" "}
            <span className="text-orange-500">Everyone</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full">
            <TextField
              onChange={(e) => setMeetingCode(e.target.value)}
              id="outlined-basic"
              label="Meeting ID"
              variant="outlined"
              className="bg-white rounded-md w-64 sm:w-80"
            />
            <Button
              onClick={handleJoinVideoCall}
              variant="contained"
              sx={{
                backgroundColor: "#f97316",
                "&:hover": { backgroundColor: "#ea580c" },
              }}
            >
              Join
            </Button>
          </div>

          {meetingCodeError && (
            <p className="text-red-500 text-sm mt-2">{meetingCodeError}</p>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/singleMobile.png"
            alt="Video call preview"
            className="w-3/4 sm:w-2/3 md:w-[45vw] max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-lg"
          />
        </div>
      </main>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default withAuth(HomeComponent);
