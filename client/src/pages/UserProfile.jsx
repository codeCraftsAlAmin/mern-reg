import { Button } from "@/components/ui/button";
import { clearUserData } from "@/features/login/loginSlice";
import api, { stopProactiveRefresh } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import UpdateUser from "../layouts/UpdateUser";

const UserProfile = () => {
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  // handle log out
  const handleClick = async () => {
    try {
      await api.post("/logout", {});
      dispatch(clearUserData());
      stopProactiveRefresh(); // stop refresh loop on logout
      navigate("/login");
    } catch (error) {
      console.log("Logout Failed", error);
    }
  };

  // handle profile
  React.useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (
        !document.getElementById("profile-dropdown")?.contains(e.target) &&
        !document.getElementById("profile-avatar")?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  if (!user) return null;

  return (
    <>
      <div className="fixed top-2 right-2 z-50 sm:top-4 sm:right-4">
        <div className="relative inline-block text-left">
          {/* initial image button -- to open profile view*/}
          <img
            id="profile-avatar"
            src={user.image}
            alt="user profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-200 dark:border-blue-700 bg-transparent cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            onClick={() => setOpen((prev) => !prev)}
          />

          {open && (
            <div
              id="profile-dropdown"
              className="absolute right-0 mt-2 w-56 sm:w-64 bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-blue-200 dark:border-blue-700 p-3 sm:p-4 flex flex-col items-center space-y-2 shadow-md backdrop-blur-md"
            >
              {/* user image */}
              <img
                src={user.image}
                alt="user profile"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-blue-200 dark:border-blue-700 mb-2 bg-white dark:bg-gray-900"
              />

              {/* user name */}
              <p className="font-bold text-blue-700 dark:text-blue-300 text-sm sm:text-base text-center">
                {user.name}
              </p>

              {/* user email */}
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 break-all text-center">
                {user.email}
              </p>

              {/* log out button */}
              <Button
                className="w-full mt-2 text-xs sm:text-sm rounded-full bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-800 transition-all"
                onClick={handleClick}
              >
                Log Out
              </Button>

              {/* cross button */}
              <button
                className="absolute top-2 right-2 text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 text-xl font-bold bg-transparent border-none focus:outline-none transition-all"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <UpdateUser />
      </div>
    </>
  );
};

export default UserProfile;
