import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api"; 
import { setLandlordApplications, updateLandlordApplication } from "../../redux/landlordApplicationSlice";

const LandlordApplications = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.landlordApplications.applications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch landlord applications from Firebase
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await api.get("/Landlords.json");
        if (response.data) {
          const applicationsArray = Object.keys(response.data).map(id => ({
            id,
            ...response.data[id],
          }));
          dispatch(setLandlordApplications(applicationsArray));
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [dispatch]);

  // Approve or Reject an application
  const handleAction = async (id, status) => {
    setLoading(true);
    try {
      await api.patch(`/Landlords/${id}.json`, { status });
      dispatch(updateLandlordApplication({ id, status }));
    } catch (error) {
      console.error(`Error updating application:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (application) => {
    setSelectedApplication(application);
  };

  // Filter applications by status
  const filteredApplications = applications.filter(app => {
    if (filterStatus === "all") return true;
    return app.status.toLowerCase() === filterStatus.toLowerCase();
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Landlord Applications</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-gray-600 mb-4">Loading applications...</p>}

      {/* Filter Dropdown */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="filterStatus" className="mr-2 text-gray-700">Filter by Status:</label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Items Per Page Dropdown */}
        <div>
          <label htmlFor="itemsPerPage" className="mr-2 text-gray-700">Items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentApplications.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 text-gray-700">{app.name}</td>
                <td className="px-6 py-4 text-gray-700">{app.email}</td>
                <td className="px-6 py-4 text-gray-700">{app.phoneNumber}</td>
                <td className="px-6 py-4 text-gray-700">{app.status}</td>
                <td className="px-6 py-4 flex justify-center space-x-2">
                  <button 
                    onClick={() => handlePreview(app)} 
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Preview
                  </button>
                  {app.status.toLowerCase() === "pending" && (
                    <>
                      <button 
                        onClick={() => handleAction(app.id, "Approved")}
                        disabled={loading}
                        className={`px-3 py-1 text-white rounded ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleAction(app.id, "Rejected")}
                        disabled={loading}
                        className={`px-3 py-1 text-white rounded ${loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"}`}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <nav className="inline-flex rounded-md shadow-sm">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-gray-300 rounded-md mx-1 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>

      {/* Preview Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3 transform transition-all duration-300 scale-95">
            <div className="border-b pb-3 mb-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Application Preview</h3>
              <button onClick={() => setSelectedApplication(null)} className="text-gray-500 hover:text-gray-700 text-3xl focus:outline-none">
                &times;
              </button>
            </div>

            {/* Image Display */}
            {selectedApplication?.profileImage && (
              <div className="mb-4 flex justify-center">
                <img 
                  src={selectedApplication.profileImage} 
                  alt="Landlord Application" 
                  className="w-100 h-40 object-cover border border-gray-300 shadow-md" 
                />
              </div>
            )}

            <div className="flex flex-col items-center">
              <div className="text-center">
                <p className="mb-2"><strong>Name:</strong> {selectedApplication.name}</p>
                <p className="mb-2"><strong>Email:</strong> {selectedApplication.email}</p>
                <p className="mb-2"><strong>Phone:</strong> {selectedApplication.phoneNumber}</p>
                <p className="mb-2"><strong>Status:</strong> {selectedApplication.status}</p>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button 
                onClick={() => setSelectedApplication(null)} 
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LandlordApplications;