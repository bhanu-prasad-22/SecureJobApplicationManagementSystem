import { useState } from "react";
import API from "../services/api";

function AddJobModal({ isOpen, onClose, onJobAdded }) {
  const [formData, setFormData] = useState({
    companyName: "",
    positionTitle: "",
    status: "APPLIED", // Matches your backend Enum/String
    location: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/applications", formData);
      onJobAdded(); // Refresh the list in the parent
      onClose();    // Close the modal
      setFormData({ companyName: "", positionTitle: "", status: "APPLIED" ,location: ""});
    } catch (error) {
      alert("Failed to add job. Ensure you are logged in.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Track New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border w-full p-2 rounded"
            placeholder="Company Name"
            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            required
          />
          <input
            className="border w-full p-2 rounded"
            placeholder="Position (e.g. Java Dev)"
            onChange={(e) => setFormData({...formData, positionTitle: e.target.value})}
            required
          />
          <select
            className="border w-full p-2 rounded"
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEWING">Interviewing</option>
            <option value="OFFERED">Offered</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <input
            className="border w-full p-2 rounded"
            placeholder="Location (eg.Remote)"
            value={formData.location}
            onChange={(e) => setFormData({...formData,location:e.target.value})}
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJobModal;