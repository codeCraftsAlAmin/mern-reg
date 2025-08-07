import React, { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserData } from "@/features/login/loginSlice";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  // get email from register slice
  const { email } = useSelector((state) => state.register);

  // get error or success message
  const { isError, isLoggedIn } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // store login info
  const [loginUser, setLoginUser] = React.useState({
    email: email || "",
    password: "",
  });

  // get input value
  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginUser((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // submit the value to the backend
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginUser;

    const userData = {
      email,
      password,
    };
    dispatch(loginUserData(userData));
  };

  // handle toast and navigation
  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    if (isLoggedIn) {
      navigate("/user-profile");
    }
  }, [isError, isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-2">
      <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-xl shadow-2xl p-8 md:p-10 max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-white mb-2">
          Login Your Account
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Welcome back! Please login to continue.
        </p>

        {/* toast message */}
        <Toaster position="top-right" richColors />

        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter email"
              value={loginUser.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter password"
              value={loginUser.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <Button
              className="w-full py-2 px-4 rounded bg-green-600 text-white font-semibold text-center hover:bg-green-700 transition"
              type="submit"
            >
              Login
            </Button>
          </div>

          <div className="flex justify-center mt-3">
            <NavLink
              to="/forgot-password"
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              Forgot Password?
            </NavLink>
          </div>

          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="text-blue-600 hover:underline font-semibold"
              >
                Register
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
