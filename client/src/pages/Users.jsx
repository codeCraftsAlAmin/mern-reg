import ActionUser from "@/components/actionsUser/ActionUser";
import Debouncing from "@/components/debouncing/Debouncing";
import DeleteUser from "@/components/delUser/DeleteUser";
import Paginations from "@/components/paginations/Paginations";
import {
  clearSuccessMessage,
  getAllUsers,
} from "@/features/users/allUsersSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const { isError, isSuccess, isLoading, users } = useSelector(
    (state) => state.users
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // initial load
    dispatch(getAllUsers());
  }, [dispatch]);

  // to handle error/success message
  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-2">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-white mb-2 text-center">
          All Users
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Search, manage, and take action on users below
        </p>

        {/* loading message */}
        {isLoading && <p className="text-blue-600 mb-2">Loading users...</p>}

        {/* error/success messages */}
        {isError && (
          <p className="font-semibold mb-2 text-red-500 dark:text-red-400">
            {isError}
          </p>
        )}
        {isSuccess && (
          <p className="font-semibold mb-2 text-green-600 dark:text-green-400">
            {isSuccess}
          </p>
        )}

        {/* search box */}
        <div className="w-full mb-4">
          <Debouncing />
        </div>

        {/* users info */}
        <div className="w-full flex flex-col gap-3">
          {users && users.length > 0 ? (
            users.map((user) => (
              <div
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-transparent rounded-lg shadow p-4 hover:shadow-md transition border border-blue-100 dark:border-gray-800"
                key={user._id}
              >
                {/* show all users */}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base">
                    {user.email}
                  </h3>
                </div>

                {/* delete user and actions  */}
                <div className="flex gap-3 items-center">
                  <DeleteUser userId={user._id} />
                  <ActionUser
                    userId={user._id}
                    userIsAdmin={user.isAdmin}
                    userIsBanned={user.isBanned}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No users found.</p>
          )}
        </div>

        {/* pagination */}
        <div className="mt-6 w-full flex justify-center">
          <Paginations />
        </div>
      </div>
    </div>
  );
};

export default Users;
