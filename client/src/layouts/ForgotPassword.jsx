import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPass } from "@/features/forgotPassword/forgotPassSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  // handle change
  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  // submit email
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("This is email~", email);
    dispatch(forgotPass({ email }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-2">
      <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-xl shadow-2xl p-8 md:p-10 max-w-md w-full flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-white mb-2 text-center">
          Forgot Password
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        {/* error/success/loading message */}
        <div className="mb-4 w-full text-center min-h-[24px]">
          {isLoading && <p className="text-blue-600">Processing...</p>}
          {isError && <p className="text-red-600 font-semibold">{isError}</p>}
          {isSuccess && (
            <p className="text-green-700 font-semibold">{isSuccess}</p>
          )}
        </div>

        {/* take user email */}
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-4">
            <Button
              className="w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold text-center hover:bg-blue-700 transition"
              type="submit"
            >
              Send Reset Link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
