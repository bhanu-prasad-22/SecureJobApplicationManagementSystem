import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "./services/api";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AgentOnboarding from "./components/AgentOnboarding";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check profile status on load
  useEffect(() => {
    const checkProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await API.get("/profiles/me");
        if (res.data) setHasProfile(true);
      } catch (err) {
        setHasProfile(false);
      } finally {
        setLoading(false);
      }
    };
    checkProfile();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold">Initializing Agent...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {/* If no profile, show Onboarding. If yes, show Dashboard */}
              {!hasProfile ? (
                <AgentOnboarding onComplete={() => setHasProfile(true)} />
              ) : (
                <Dashboard />
              )}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;