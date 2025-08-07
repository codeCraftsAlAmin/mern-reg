import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-blue-100 dark:border-blue-800 animate-fadein">
        {/* error message */}
        <div className="flex flex-col items-center mb-3">
          <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 animate-pulse select-none">
            404
          </div>
        </div>
        <h1 className="text-2xl font-bold text-blue-700 dark:text-white mb-2 tracking-tight">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm md:text-base">
          Sorry, the page you are looking for does not exist or an error has
          occurred.
          <br />
          Please check the URL or return to the homepage.
        </p>

        {/* navigate to home  */}
        <Link
          to={"/"}
          className="inline-block px-7 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-200 text-base mt-2"
        >
          Go Home
        </Link>
      </div>
      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein { animation: fadein 0.7s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
};

export default Error;
