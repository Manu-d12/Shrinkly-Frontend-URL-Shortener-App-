import React, { useContext, useState } from "react";
import { set, useForm } from "react-hook-form";
import CustomField from "./CustomField";
import api from "./api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../contextApi/ContextApi";

export default function LoginPage() {
  const [loader, setLoader] = useState(false);
  const {setToken} = useContext(AppContext);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });


  const onSubmit = async (data) => {
      debugger;
      setLoader(true);
      try {
        const {data : response} = await api.post(
          'http://localhost:9090/api/auth/login',
          data
        );
        console.log(response.token);
        localStorage.setItem('JWT_TOKEN', response.token);
        setToken(response.token);
        navigate("/");
        toast.success("Login Success")
        reset();
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
          Login here
        </h2>

        <CustomField
          name="username"
          label="Username"
          placeholder="John Doe"
          control={control}
          rules={{ required: "Username is required" }}
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
        <button
          type="submit"
          disabled={loader}
          className={`w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all font-medium ${
            loader && "opacity-70 cursor-not-allowed"
          }`}
        >
          {loader ? "Loading..." : "Log in"}
        </button>
         <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-3">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
}
