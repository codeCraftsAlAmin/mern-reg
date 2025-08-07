import { getAllUsers, userActions } from "@/features/users/allUsersSlice";
import React from "react";
import { useDispatch } from "react-redux";

const ActionUser = ({ userId, userIsAdmin, userIsBanned }) => {

  const dispatch = useDispatch();
  
  // user actions
  const handleUserAction = async (id, action) => {
    await dispatch(userActions({ id, action }));
    dispatch(getAllUsers()); // refresh users
  };

  return (
    <div className="flex gap-2">
      {/* user ban/unban */}
      <button
        className={`px-3 py-1 rounded font-semibold text-xs transition focus:outline-none focus:ring-2 focus:ring-blue-200 
          bg-blue-100 text-blue-700 hover:bg-blue-200
        `}
        onClick={() => handleUserAction(userId, userIsBanned ? "unban" : "ban")}
        title={userIsBanned ? "Unban user" : "Ban user"}
      >
        {userIsBanned ? "Unban" : "Ban"}
      </button>

      {/* user make admin/remive admin */}
      <button
        className={`px-3 py-1 rounded font-semibold text-xs transition focus:outline-none focus:ring-2 focus:ring-green-200 
          bg-green-100 text-green-700 hover:bg-green-200
        `}
        onClick={() =>
          handleUserAction(userId, userIsAdmin ? "removeAdmin" : "makeAdmin")
        }
        title={userIsAdmin ? "Remove admin" : "Make admin"}
      >
        {userIsAdmin ? "Remove Admin" : "Make Admin"}
      </button>
    </div>
  );
};

export default ActionUser;
