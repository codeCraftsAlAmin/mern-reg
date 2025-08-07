import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-10 max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-white mb-2">
          Welcome to MERN Registration App
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          A simple and secure registration system built with the MERN stack. Get
          started below!
        </p>
        <div className="flex flex-col gap-4 w-full">
          {/* register button */}
          <Link
            to="/register"
            className="w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold text-center hover:bg-blue-700 transition"
          >
            Register
          </Link>

          {/* login button */}
          <Link
            to="/login"
            className="w-full py-2 px-4 rounded bg-green-600 text-white font-semibold text-center hover:bg-green-700 transition"
          >
            Login
          </Link>

          {/* user button */}
          <Link
            to="/users"
            className="w-full py-2 px-4 rounded bg-gray-200 text-gray-800 font-semibold text-center hover:bg-gray-300 transition dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
