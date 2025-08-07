import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearMessage,
  resetPass,
} from "@/features/resetPassword/restPassSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const ResetPassword = () => {
  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state.resetPassword
  );

  const navigate = useNavigate();

  const { token } = useParams();

  const dispatch = useDispatch();

  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPass({ token, password }));
  };

  // clear notification
  useEffect(() => {
    if (isSuccess || isError || isLoading) {
      const timeout = setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isSuccess, isError, isLoading, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-2 py-4">
      <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-xl shadow-2xl p-6 md:p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-xl font-bold text-blue-700 dark:text-white mb-1 mt-2">
          Reset Password
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-center text-sm">
          Enter your new password below to reset your account.
        </p>

        {/* error/success/loading message */}
        <div className="w-full mb-2 min-h-[24px] text-center">
          {isLoading && (
            <p className="text-blue-600 dark:text-blue-300 text-sm">
              Loading...
            </p>
          )}
          {isError && (
            <p className="text-red-500 text-sm font-semibold">{isError}</p>
          )}
          {isSuccess && (
            <p className="text-green-600 dark:text-green-400 text-sm font-semibold">
              {isSuccess}
            </p>
          )}
        </div>

        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <Label htmlFor="password">New Password</Label>
            <Input
              placeholder="Enter a new password"
              id="password"
              type="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            className="w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold text-center hover:bg-blue-700 transition"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
