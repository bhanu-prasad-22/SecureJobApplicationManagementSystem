import { useEffect, useState } from "react";
import API from "../services/api";

function AIAgentInsights() {
  const [insight, setInsight] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const res = await API.get("/agent/analyze");
      setInsight(res.data);
    };
    fetchAnalysis();
  }, []);

  if (!insight) return <div className="p-10 text-center animate-pulse">Agent is thinking...</div>;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* The Summary Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">AI Career Agent Prediction</h2>
        <p className="text-2xl font-semibold leading-tight">"{insight.summary}"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Outlook Card */}
        <div className="bg-white p-6 rounded-2xl border-2 border-blue-100 shadow-sm">
          <h3 className="font-bold text-blue-800 mb-3 underline">Geographic Context (SDG-8)</h3>
          <p className="text-gray-600">{insight.localMarketOutlook}</p>
        </div>

        {/* Skill Gap Card */}
        <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-100 shadow-sm">
          <h3 className="font-bold text-red-800 mb-3">Skill Gaps Identified</h3>
          <ul className="list-disc ml-5 text-red-700">
            {insight.skillGaps.map(gap => <li key={gap}>{gap}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AIAgentInsights;