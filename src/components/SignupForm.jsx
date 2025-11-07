import React, { useState } from "react";
import {useForm } from "react-hook-form";
import CustomField from "./CustomField";
import api from "./api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignupForm() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    watch,
    reset
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
      setLoader(true);
      try {
        // http://localhost:9090/api/auth/register
        const {data : response} = await api.post(
          'http://localhost:9090/api/auth/register',
          data
        );
        console.log("BACKED_RESPONSE: ", response);
        reset();
        toast.success("Registeration Successfull")
        navigate("/login");
      } catch (error) {
        console.log(error);
        toast.error("Registeration Failed")
      } finally {
        setLoader(false);
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
          Create Account
        </h2>

        <CustomField
          name="username"
          label="Username"
          placeholder="John Doe"
          control={control}
          rules={{ required: "Username is required" }}
        />

        <CustomField
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          }}
        />

        <CustomField
          name="password"
          type="password"
          label="Password"
          placeholder="Enter password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />

        <CustomField
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Re-enter password"
          control={control}
          rules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          }}
        />

        <button
          type="submit"
          disabled={loader}
          className={`w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all font-medium ${
            loader && "opacity-70 cursor-not-allowed"
          }`}
        >
          {loader ? "Loading..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
