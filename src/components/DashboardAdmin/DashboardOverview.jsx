import React, { useEffect, useState } from "react";
import api from "../../api"; // Axios instance

const DashboardOverview = () => {
  const [stats, setStats] = useState([
    { label: 'Total Bookings', count: 0 },
    { label: 'Total Listings', count: 0 },
    { label: 'Total Landlords', count: 0 },
    { label: 'Total Users', count: 0 },
  ]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from Firebase collections
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch total bookings from payments collection
        const bookingsResponse = await api.get("/payments.json");
        const bookingsCount = bookingsResponse.data ? Object.keys(bookingsResponse.data).length : 0;

        // Fetch total listings from Stadiums collection
        const listingsResponse = await api.get("/Stadiums.json");
        const listingsCount = listingsResponse.data ? Object.keys(listingsResponse.data).length : 0;

        // Fetch total landlords from Landlords collection
        const landlordsResponse = await api.get("/Landlords.json");
        const landlordsCount = landlordsResponse.data ? Object.keys(landlordsResponse.data).length : 0;

        // Fetch total users from users collection
        const usersResponse = await api.get("/users.json");
        const usersCount = usersResponse.data ? Object.keys(usersResponse.data).length : 0;

        // Fetch feedbacks from feedbacks collection
        const feedbacksResponse = await api.get("/feedbacks.json");
        const feedbacksData = feedbacksResponse.data ? Object.keys(feedbacksResponse.data).map(id => ({
          id,
          ...feedbacksResponse.data[id],
        })) : [];

        // Update stats and feedbacks state
        setStats([
          { label: 'Total Bookings', count: bookingsCount },
          { label: 'Total Listings', count: listingsCount },
          { label: 'Total Landlords', count: landlordsCount },
          { label: 'Total Users', count: usersCount },
        ]);
        setFeedbacks(feedbacksData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <Sidebar/> */}
      <div className="bg-gray-100 p-6">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow p-6 flex flex-col items-center justify-center transition duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-gray-700">{stat.label}</h3>
              <p className="mt-4 text-4xl font-bold text-gray-900">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Customer Feedback Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Feedback</h2>
          <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <p className="text-gray-700 italic">"{feedback.Message}"</p>
                  <p className="text-sm text-gray-500 mt-2 text-right">- {feedback.Name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;