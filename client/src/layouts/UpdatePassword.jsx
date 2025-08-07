import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearMessage,
  updateUserPassword,
} from "@/features/updatePassword/updatePassSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpdatePassword = () => {
  const { user } = useSelector((state) => state.login);

  const id = user?._id;
  // console.log(id);

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.updateUserPass
  );

  const [isUpdate, setIsUpdate] = useState({
    oldPass: "",
    newPass: "",
    confirmNewPass: "",
  });

  const dispatch = useDispatch();

  // store password
  const handleChange = (e) => {
    const { id, value } = e.target;
    setIsUpdate((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(isUpdate);
    const { oldPass, newPass, confirmNewPass } = isUpdate;
    const updatedData = {
      oldPass,
      newPass,
      confirmNewPass,
    };
    dispatch(updateUserPassword({ updatedData, id }));
  };

  // timer for error/success message
  useEffect(() => {
    if (isSuccess || isError) {
      const timeout = setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, isError, dispatch]);

  // clear input after update
  useEffect(() => {
    if (isSuccess) {
      setIsUpdate({
        oldPass: "",
        newPass: "",
        confirmNewPass: "",
      });
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-2">
      <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-xl shadow-2xl p-8 md:p-10 max-w-md w-full flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-white mb-2 text-center">
          Update Your Password
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Change your password below.
        </p>

        {/* success/error/loading message */}
        <div className="mb-4 w-full text-center min-h-[24px]">
          {isError && <p className="text-red-600 font-semibold">{isError}</p>}
          {isLoading && <p className="text-blue-600">Processing...</p>}
          {isSuccess && (
            <p className="text-green-700 font-semibold">{isSuccess}</p>
          )}
        </div>

        {/* update password input */}
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <Label htmlFor="oldPass">Old Password</Label>
            <Input
              id="oldPass"
              type="password"
              value={isUpdate.oldPass}
              onChange={handleChange}
              required
              placeholder="Enter old password"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="newPass">New Password</Label>
            <Input
              id="newPass"
              type="password"
              value={isUpdate.newPass}
              onChange={handleChange}
              required
              placeholder="Enter new password"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="confirmNewPass">Confirm New Password</Label>
            <Input
              id="confirmNewPass"
              type="password"
              value={isUpdate.confirmNewPass}
              onChange={handleChange}
              required
              placeholder="Confirm new password"
            />
          </div>
          <div className="mt-4">
            <Button
              className="w-full py-2 px-4 rounded bg-green-600 text-white font-semibold text-center hover:bg-green-700 transition"
              type="submit"
            >
              Update
            </Button>
          </div>
          <div className="mt-4">
            <Link
              to="/"
              className="text-gray-600 hover:underline text-center dark:text-gray-300 block"
            >
              Go Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
