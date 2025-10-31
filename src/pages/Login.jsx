import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import authStore from "../store/authStore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const { loginAdmin, loading } = authStore();

  const handleSignIn = async () => {
    if (!username || !password)
      return alert("Please enter username and password.");

    await loginAdmin({ username, password });

    const { isLoggedIn, error } = authStore.getState();

    console.log(`isLoggedIn: ${isLoggedIn}`);

    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      alert(error || "Login failed.");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="text-3xl text-indigo-500 mb-1">🎓</div>
          <h1 className="text-xl font-bold">VIRTUAL LAB SIMULATOR</h1>
          <p className="text-sm text-gray-600 mt-1">Sign in your account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-600"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-500" />
              Remember
            </label>
            <Link
              to="/forgotPasswordAdmin"
              className="text-indigo-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full background-primary-color bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white py-2 rounded-md font-semibold"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-indigo-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
