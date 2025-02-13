import React from 'react';

const DashboardOverview = () => {
  // Static data for now; later, replace with dynamic data.
  const stats = [
    { label: 'Total Bookings', count: 150 },
    { label: 'Total Listings', count: 40 },
    { label: 'Total Landlords', count: 25 },
    { label: 'Total Users', count: 300 },
  ];

  // Sample static feedback data; later, this could be replaced with dynamic content.
  const feedbacks = [
    { id: 1, message: 'Great service! I loved my experience.', name: 'John Doe' },
    { id: 2, message: 'The booking process was so smooth and straightforward.', name: 'Jane Smith' },
    { id: 3, message: 'Friendly staff and prompt assistance.', name: 'Alice Johnson' },
    { id: 4, message: 'I will definitely use this platform again!', name: 'Bob Brown' },
  ];

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
                <p className="text-gray-700 italic">"{feedback.message}"</p>
                <p className="text-sm text-gray-500 mt-2 text-right">- {feedback.name}</p>
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