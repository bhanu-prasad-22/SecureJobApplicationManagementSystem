//state loop follows 4 step pattern

//  1.Input: User types in a box (onChange).

//  2.Capture: React saves that typing into a state variable (setEmail).

//  3.Submit: User clicks a button, triggering handleSubmit.

//  4.Response: The axios call sends the state to Spring Boot and waits for a "Success" (redirect to Dashboard) or "Failure" (show an alert).


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // 1. ADD THIS STATE:
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        email,
        password,
      });

      alert(res.data);
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data || "Registration failed";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Account</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2 font-medium text-gray-600">Email Address</label>
          <input
            type="email"
            placeholder="name@company.com"
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-4 mb-6">
          <label className="block text-gray-700 text-sm -mb-2 font-medium text-gray-600">Security</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password} // Added 'value' for controlled component best practice
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword} // Added 'value'
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-sm text-blue-500 font-semibold hover:text-blue-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️ Hide" : "👁️ Show"}
            </button>
          </div>
        </div>

        {/* 2. ADD THE BUTTON BACK: */}
        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded font-bold hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;