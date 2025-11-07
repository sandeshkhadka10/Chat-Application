import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="w-screen h-screen bg-cover bg-no-repeat text-white overflow-x-hidden"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Navbar */}
      <nav className="flex justify-between items-center px-5 py-4 relative">
        <h2 className="text-2xl font-semibold">Meetly</h2>

        {/* Hamburger icon */}
        <div
          className="flex flex-col gap-1.5 cursor-pointer md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-white rounded"></span>
          <span className="w-6 h-0.5 bg-white rounded"></span>
          <span className="w-6 h-0.5 bg-white rounded"></span>
        </div>

        {/* Navlist (Desktop + Mobile) */}
        <div
          className={`${
            menuOpen
              ? "flex flex-col absolute top-16 right-5 bg-black bg-opacity-90 px-6 py-4 rounded-lg space-y-3"
              : "hidden"
          } md:flex md:flex-row md:static md:space-x-6 md:bg-transparent md:p-0`}
        >
          <p
            onClick={() => navigate("/joiningasguest")}
            className="cursor-pointer hover:text-orange-400 transition"
          >
            Join as Guest
          </p>
          <p
            onClick={() => navigate("/auth")}
            className="cursor-pointer hover:text-orange-400 transition"
          >
            Register
          </p>
          <p
            onClick={() => navigate("/auth")}
            className="cursor-pointer hover:text-orange-400 transition"
          >
            Login
          </p>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex justify-between items-center px-12 h-[80vh] gap-8 md:flex-row flex-col mt-6 md:mt-0">
        {/* Left side text */}
        <div className="text-2xl md:text-3xl space-y-4 text-left">
          <h1>
            <span className="text-orange-400">Chat</span> with anyone
          </h1>
          <p className="text-lg text-gray-200">Free to speech</p>
          <div
            role="button"
            className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-2xl w-fit transition"
          >
            <Link to="/auth" className="text-white text-lg font-medium">
              Get Started
            </Link>
          </div>
        </div>

        {/* Right side image */}
        <div>
          <img
            src="/doubleMobile.png"
            alt="Double Mobile Photo"
            className="h-[60vh] max-w-full object-contain md:h-[65vh]"
          />
        </div>
      </div>
    </div>
  );
}
