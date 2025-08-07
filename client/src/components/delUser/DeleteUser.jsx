import { deleteUser, getAllUsers } from "@/features/users/allUsersSlice";
import React from "react";
import { useDispatch } from "react-redux";

const DeleteUser = ({ userId }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // handle delete user
  const handleDelete = async () => {
    setLoading(true);
    await dispatch(deleteUser(userId));
    dispatch(getAllUsers()); // refresh users
    setLoading(false);
    setShowModal(false);
  };

  return (
    <>
      {/* initial delete button */}
      <button
        className="px-3 py-1 rounded bg-red-100 text-red-600 font-semibold text-xs hover:bg-red-200 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
        onClick={() => setShowModal(true)}
        title="Delete user"
      >
        Delete
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-80 max-w-full border border-red-200 dark:border-red-700 flex flex-col items-center relative">
            <div className="text-red-600 dark:text-red-400 text-lg font-bold mb-2">
              Delete User
            </div>
            <div className="text-gray-700 dark:text-gray-200 text-sm mb-4 text-center">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </div>
            <div className="flex gap-3 w-full mt-2">
              <button
                className="flex-1 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Cancel
              </button>

              {/* main delete button */}
              <button
                className="flex-1 py-1 rounded bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>

            {/* cross icon */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600 text-lg font-bold bg-transparent border-none focus:outline-none"
              onClick={() => setShowModal(false)}
              aria-label="Close"
              disabled={loading}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUser;
