import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b p-4 px-10 flex justify-between items-center rounded-xl mb-6">
      <div className="flex items-center space-x-2">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          {/* Fixed SVG Path */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">JobTracker <span className="text-blue-600">AI</span></h1>
      </div>

      <div className="flex items-center space-x-6">
        <span className="text-sm text-gray-500 font-medium">Agent Active: BhanuPrasad</span>
        <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;