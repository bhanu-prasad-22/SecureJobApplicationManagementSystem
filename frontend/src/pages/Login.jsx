//state loop follows 4 step pattern

 //  1.Input: User types in a box (onChange).

 //  2.Capture: React saves that typing into a state variable (setEmail).

 //  3.Submit: User clicks a button, triggering handleSubmit.

 //  4.Response: The axios call sends the state to Spring Boot and waits for a "Success" (redirect to Dashboard) or "Failure" (show an alert).

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 1. ADD THIS STATE:
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      // NOTE: Ensure your backend returns an object with a 'token' field.
      // If your backend just returns the string directly, use: localStorage.setItem("token", res.data);
      localStorage.setItem("token", res.data.token || res.data);

      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-600">Login</h2>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Container */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-gray-500 hover:text-blue-600 font-medium text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded font-bold transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;