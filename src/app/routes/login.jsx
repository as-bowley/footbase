import React from "react";
import "@/components/LoginPage/styles/LoginPage.css";
import AuthForm from "@/components/auth/auth-form";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Footbase</h1>
          <p className="text-gray-600 mt-2">Your ultimate football companion</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
