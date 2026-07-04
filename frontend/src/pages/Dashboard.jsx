import { useEffect, useState } from "react";
import API from "../services/api";
import AddJobModal from "../components/AddJobModal";
import Navbar from "../components/Navbar"
import AIAgentInsights from "../components/AIAgentInsights";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  //jobs(variable):current list of jobs. When you "Read" from the backend, you store the result here.
  //setJobs(Function):the only way to change that list.
   //When you call this, React says, "Oh, the data changed! I need to redraw the screen."
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {//It connects your UI to your Backend API automatically.
    fetchJobs();
  }, []);

  const fetchJobs = async (query = "") => {
    try {
      const res = await API.get(`/applications?company=${query}`);
      setJobs(res.data.content || []);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const deleteJob = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/applications/${id}`);
      fetchJobs(); // Refresh list
    }
  };

const updateStatus = async (id, newStatus) => {
  try {
    // API.put(url, data_body)
    await API.put(`/applications/${id}/status`, {
      status: newStatus
    });

    // Update local state so the table refreshes
    setJobs(prev => prev.map(job =>
      job.id === id ? { ...job, status: newStatus } : job
    ));

    console.log("Status updated to:", newStatus);
  } catch (error) {
    console.error("PUT Request failed:", error);
    alert("Failed to update status. Check if the backend is running.");
  }
};

  return (
    <div className="p-10 max-w-6xl mx-auto">
        <Navbar />
        {/* NEW AGENT LAYER */}
            <AIAgentInsights />

            {/* EXISTING TABLE LAYER */}
            <div className="mt-12">
               {/* ... your existing +Add Job button and table code ... */}
               </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">BhanuPrasad's Job Tracker</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-bold"
        >
          + Add Job
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search companies..."
            className="border p-2 rounded-lg w-64 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              fetchJobs(e.target.value); // Real-time filtering
            }}
          />
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold">Company</th>
              <th className="p-4 font-semibold">Position</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Actions</th>
              <th className="p-4 font -semibold">UpdateStatus</th>
              <th className="p-4 font-semibold">Location</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
             //map() takes every single "Job Object" in that list and "maps" it to a piece of HTML (like a <tr> table row).

             //key={job.id}: React needs this to keep track of which row is which.
             //If you delete ID #5, React uses the key to know exactly which row to remove from the screen without reloading the whole page.

              <tr key={job.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium">{job.companyName}</td>
                <td className="p-4">{job.positionTitle}</td>
                <td className="p-4" >
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    job.status === 'REJECTED' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="p-4">
                  <button onClick={() => deleteJob(job.id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
                <td className="p-4">
                  <select
                    value={job.status}
                    onChange={(e) => updateStatus(job.id, e.target.value)}
                    className={`p-1 rounded text-xs font-bold border focus:ring-2 focus:ring-blue-400 ${
                      job.status === 'REJECTED' ? 'bg-red-50 text-red-600 border-red-200' :
                      job.status === 'OFFERED' ? 'bg-green-50 text-green-600 border-green-200' :
                      'bg-blue-50 text-blue-600 border-blue-200'
                    }`}
                  >
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEWING">Interviewing</option>
                    <option value="OFFERED">Offered</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>
                <td className="p-4">
                    {job.location}
                    </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJobAdded={fetchJobs}
      />
    </div>
  );
}

export default Dashboard;