import RegistrationForm from "@/layouts/RegistrationForm";
import Login from "@/layouts/Login";
import Home from "@/pages/Home";
import React from "react";
import VerifyUser from "@/layouts/VerifyUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "@/pages/Error";
import UserInterface from "@/pages/UserProfile";
import Users from "@/pages/Users";
import UpdatePassword from "@/layouts/UpdatePassword";
import ForgotPassword from "@/layouts/ForgotPassword";
import ResetPassword from "@/layouts/ResetPassword";

const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-user" element={<VerifyUser />} />
        <Route path="/user-profile" element={<UserInterface />} />
        <Route path="/users" element={<Users />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
