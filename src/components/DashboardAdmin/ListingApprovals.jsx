// import React, { useState } from 'react';

// const ListingApproval = () => {
//   // Sample static data; replace with dynamic API data as needed.
//   const [applications, setApplications] = useState([
//     {
//       id: 1,
//       landlordName: "John Doe",
//       pitchName: "Sunny Pitch",
//       email: "john@example.com",
//       phone: "0789176665",
//       date: "2025-01-15",
//       status: "Pending",
//       photo: "https://via.placeholder.com/150", // Replace with actual image URL
//       description: "A well-maintained pitch in a prime location.",
//     },
//     {
//       id: 2,
//       landlordName: "Jane Smith",
//       pitchName: "Moonlight Arena",
//       email: "jane@example.com",
//       phone: "0789178956",
//       date: "2025-01-17",
//       status: "Pending",
//       photo: "https://via.placeholder.com/150", // Replace with actual image URL
//       description: "A modern pitch with excellent facilities.",
//     },
//     // Add more sample applications here.
//   ]);

//   // State for tracking the currently previewed application.
//   const [selectedApplication, setSelectedApplication] = useState(null);

// //







//   // Approve an application.
//   const handleApprove = (id) => {
//     console.log(`Approving application id: ${id}`);
//     setApplications(
//       applications.map((app) =>
//         app.id === id ? { ...app, status: "Approved" } : app
//       )
//     );
//   };

//   // Reject an application.
//   const handleReject = (id) => {
//     console.log(`Rejecting application id: ${id}`);
//     setApplications(
//       applications.map((app) =>
//         app.id === id ? { ...app, status: "Rejected" } : app
//       )
//     );
//   };

//   // Open the preview modal.
//   const handlePreview = (application) => {
//     setSelectedApplication(application);
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard: Listing Approval</h1>

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Landlord
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Pitch Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Phone
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {applications.map((app) => (
//               <tr key={app.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                   {app.landlordName}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                   {app.pitchName}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                   {app.email}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                   {app.phone}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                   {app.date}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                   {app.status}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap flex justify-center space-x-2">
//                   <button
//                     onClick={() => handlePreview(app)}
//                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                   >
//                     Preview
//                   </button>
//                   {app.status === "Pending" && (
//                     <>
//                       <button
//                         onClick={() => handleApprove(app.id)}
//                         className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleReject(app.id)}
//                         className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                   {app.status !== "Pending" && (
//                     <span className="text-sm text-gray-500 uppercase">
//                       {app.status}
//                     </span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Normal Modal (rendered inline) */}
//       {selectedApplication && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
//           <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3">
//             <div className="flex justify-between items-center mb-4 border-b pb-3">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Listing Details
//               </h2>
//               <button
//                 onClick={() => setSelectedApplication(null)}
//                 className="text-gray-500 hover:text-gray-700 text-3xl focus:outline-none"
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="flex flex-col items-center">
//               <img
//                 src={selectedApplication.photo}
//                 alt={selectedApplication.pitchName}
//                 className="w-100 h-40 object-cover border border-gray-300 mb-4"
//               />
//               <div className="text-center">
//                 <p className="mb-2">
//                   <strong>Landlord:</strong> {selectedApplication.landlordName}
//                 </p>
//                 <p className="mb-2">
//                   <strong>Pitch Name:</strong> {selectedApplication.pitchName}
//                 </p>
//                 <p className="mb-2">
//                   <strong>Email:</strong> {selectedApplication.email}
//                 </p>
//                 <p className="mb-2">
//                   <strong>Phone:</strong> {selectedApplication.phone}
//                 </p>
//                 <p className="mb-2">
//                   <strong>Date:</strong> {selectedApplication.date}
//                 </p>
//                 <p className="mb-2">
//                   <strong>Status:</strong> {selectedApplication.status}
//                 </p>
//                 <p className="mb-2">
//                   <strong>Description:</strong> {selectedApplication.description}
//                 </p>
//               </div>
//             </div>
//             <div className="mt-6 text-right">
//               <button
//                 onClick={() => setSelectedApplication(null)}
//                 className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListingApproval;




import React, { useState, useEffect } from "react";
import axios from "axios";

const ListingApproval = () => {
  const [applications, setApplications] = useState([]);

  // **تحميل الملاعب التي حالتها "Pending" فقط**
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "https://redux-project-791e5-default-rtdb.firebaseio.com/Stadiums.json"
        );
        if (response.data) {
          const fetchedApps = Object.keys(response.data)
            .map((key) => ({ id: key, ...response.data[key] }))
            .filter((app) => app.status === "Pending"); // فقط الملاعب بانتظار الموافقة
          setApplications(fetchedApps);
        }
      } catch (error) {
        console.error("❌ فشل تحميل الطلبات:", error);
      }
    };

    fetchApplications();
  }, []);

  // **تحديث الحالة فقط بدلاً من نقل البيانات**
  const updateStatus = async (app, newStatus) => {
    try {
      await axios.patch(
        `https://redux-project-791e5-default-rtdb.firebaseio.com/Stadiums/${app.id}.json`,
        { status: newStatus }
      );

      // **تحديث الحالة محليًا**
      setApplications(applications.filter((a) => a.id !== app.id));
    } catch (error) {
      console.error("❌ فشل تحديث الحالة:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard: Listing Approval</h1>

      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="p-4">Landlord</th>
            <th className="p-4">Pitch Name</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="border-b">
              <td className="p-4">{app.landlordId}</td>
              <td className="p-4">{app.name}</td>
              <td className="p-4">{app.status}</td>
              <td className="p-4 flex justify-center space-x-2">
                <button
                  onClick={() => updateStatus(app, "Approved")}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(app, "Rejected")}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListingApproval;
