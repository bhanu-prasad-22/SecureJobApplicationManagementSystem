import { useState } from "react";
import API from "../services/api";

function AgentOnboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    skills: "",
    location: "",
    resumeText: ""
  });

  const handleNext = () => setStep(step + 1);

  const handleSubmit = async () => {
    setLoading(true); // Show a "Processing" spinner
    try {
      const response = await API.post("/profiles", formData);

      // If the backend returns 200, it means the Webhook was also triggered
      alert("AI Agent Initialized! Check your email for your personalized roadmap.");

      onComplete(); // Redirect to the main Dashboard
    } catch (error) {
      console.error("Agent failed to initialize", error);
      alert("Initialization failed. Check if the Backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10 border-t-4 border-blue-600">

        {/* Step 1: Technical Foundation */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Node 1: Skill Extraction</h2>
            <p className="text-slate-500">List your core tech stack (Java, Python, React, etc.)</p>
            <textarea
              className="w-full h-32 p-4 bg-slate-100 rounded-2xl border-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
            />
            <button onClick={handleNext} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700">Next Stage</button>
          </div>
        )}

        {/* Step 2: Geographic Context */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Node 2: Location Mapping</h2>
            <p className="text-slate-500">Where are you located? (Focus on Tier-2/3 Cities for SDG-8)</p>
            <input
              className="w-full p-4 bg-slate-100 rounded-2xl border-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Hyderabad, Suryapet..."
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
            <button onClick={handleSubmit} className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-green-700">Initialize Agentic Loop</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default AgentOnboarding;