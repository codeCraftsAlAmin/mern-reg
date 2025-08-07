import React, { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/features/register/registerSlice";
import toast, { Toaster } from "react-hot-toast";

const RegistrationForm = () => {
  // get user info
  const { isSuccess, isError } = useSelector((state) => state.register);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newUser, setNewUser] = React.useState({
    name: "",
    email: "",
    password: "",
    image: null,
    address: "",
    phone: "",
  });

  // store new user info
  const handleChange = (e) => {
    const { id, value, type, files } = e.target;

    setNewUser((prev) => ({
      ...prev,
      [id]: type === "file" ? files[0] : value,
    }));
  };

  // submit new info
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, image, address, phone } = newUser;
    const userData = {
      name,
      email,
      password,
      image,
      address,
      phone,
    };

    dispatch(registerUser(userData));
  };

  // handle toastify & navigating
  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    if (isSuccess) {
      navigate("/verify-user");
    }
  }, [isError, isSuccess, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-2 pt-2 pb-4">
      <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-xl shadow-2xl p-4 md:p-6 max-w-md w-full flex flex-col items-center">
        <h1 className="text-xl font-bold text-blue-700 dark:text-white mb-1 mt-0.5">
          Create Account
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-center text-sm">
          Join us today and get started
        </p>

        {/* toast message */}
        <Toaster position="top-right" richColors />

        {/* register form */}
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter name"
              required
              value={newUser.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              value={newUser.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              value={newUser.password}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" onChange={handleChange} />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              placeholder="Enter address"
              required
              value={newUser.address}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="number"
              id="phone"
              placeholder="Enter phone"
              required
              value={newUser.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <Button
              className="w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold text-center hover:bg-blue-700 transition"
              type="submit"
            >
              Register
            </Button>
          </div>

          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-blue-600 hover:underline font-semibold"
              >
                Login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
