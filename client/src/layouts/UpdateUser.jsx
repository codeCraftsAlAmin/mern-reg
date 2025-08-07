import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearMessage,
  updateUserInfo,
} from "@/features/updateUser/updateUserSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpdateUser = () => {
  const { user } = useSelector((state) => state.login);

  const { isSuccess, isError, isLoading } = useSelector(
    (state) => state.updateUserInfo
  );

  const id = user?._id;

  const [updateUser, setUpdateUser] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  const dispatch = useDispatch();

  // store update info
  const handleChange = (e) => {
    const { id, value, type, files } = e.target;

    setUpdateUser((prev) => ({
      ...prev,
      [id]: type === "file" ? files[0] : value,
    }));
  };

  // submit new info
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, address, image } = updateUser;

    const updatedData = {
      name,
      phone,
      address,
      image,
    };

    dispatch(updateUserInfo({ updatedData, id }));
    // console.log({ updatedData, id });
  };

  // handle success/error message
  useEffect(() => {
    if (isSuccess || isError) {
      const timeout = setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isSuccess, isError, dispatch]);

  // clear form after successfull update
  useEffect(() => {
    if (isSuccess) {
      setUpdateUser({
        name: "",
        phone: "",
        address: "",
        image: "",
      });
    }
  }, [isSuccess]);

  // Check if at least one field is filled
  const isAnyFieldFilled = Object.entries(updateUser).some(([key, value]) =>
    key === "image" ? value : value && value.toString().trim() !== ""
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-2">
      <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 rounded-xl shadow-2xl p-8 md:p-10 max-w-md w-full flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-white mb-2 text-center">
          Update Your Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Edit your information below and save changes.
        </p>

        {/* loading, success and error message */}
        <div className="mb-4 w-full text-center min-h-[24px]">
          {isLoading && <p className="text-blue-600">Processing...</p>}
          {isSuccess && (
            <p className="text-green-700 font-semibold">{isSuccess}</p>
          )}
          {isError && <p className="text-red-600 font-semibold">{isError}</p>}
        </div>

        {/* update form */}
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter name"
              value={updateUser.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="number"
              id="phone"
              value={updateUser.phone}
              placeholder="Enter phone"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              value={updateUser.address}
              placeholder="Enter address"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="image">Image</Label>
            <Input type="file" id="image" onChange={handleChange} />
          </div>

          <div className="mt-4">
            <Button
              className={`w-full py-2 px-4 rounded font-semibold text-center transition ${
                isAnyFieldFilled
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              type="submit"
              disabled={!isAnyFieldFilled}
            >
              Update
            </Button>
          </div>
        </form>

        <div className="flex flex-col gap-2 w-full mt-6">
          <Link
            to="/update-password"
            className="text-blue-600 hover:underline text-center font-semibold"
          >
            Update password?
          </Link>
          <Link
            to="/"
            className="text-gray-600 hover:underline text-center dark:text-gray-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
