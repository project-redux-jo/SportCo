// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";

// const BookingManagement = () => {
//   // Get the current user from Redux store
//   const currentUser = useSelector((state) => state.auth.user);

//   // State to manage bookings
//   const [bookings, setBookings] = useState([]);

//   // Fetch bookings from the backend on component mount
//   useEffect(() => {
//     if (currentUser) {
//       fetchBookings();
//     }
//   }, [currentUser]);

//   // Fetch bookings for the landlord's properties
//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/bookings?landlordId=${currentUser.uid}`
//       );
//       setBookings(response.data);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     }
//   };

//   // Handle approving a booking
//   const handleApprove = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/bookings/${id}`, {
//         status: "approved",
//       });

//       // Update the UI
//       const updatedBookings = bookings.map((booking) =>
//         booking.id === id ? { ...booking, status: "approved" } : booking
//       );
//       setBookings(updatedBookings);

//       // Show success message
//       Swal.fire("Approved!", "The booking has been approved.", "success");
//     } catch (error) {
//       console.error("Error approving booking:", error);
//       Swal.fire("Error!", "Failed to approve the booking.", "error");
//     }
//   };

//   // Handle declining a booking
//   const handleDecline = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/bookings/${id}`, {
//         status: "declined",
//       });

//       // Update the UI
//       const updatedBookings = bookings.map((booking) =>
//         booking.id === id ? { ...booking, status: "declined" } : booking
//       );
//       setBookings(updatedBookings);

//       // Show success message
//       Swal.fire("Declined!", "The booking has been declined.", "success");
//     } catch (error) {
//       console.error("Error declining booking:", error);
//       Swal.fire("Error!", "Failed to decline the booking.", "error");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Booking Management</h1>

//       {/* List of Bookings */}
//       <div>
//         {bookings.length === 0 ? (
//           <p>No bookings found.</p>
//         ) : (
//           <div className="space-y-4">
//             {bookings.map((booking) => (
//               <div
//                 key={booking.id}
//                 className="border p-4 rounded-lg shadow-md"
//               >
//                 <h3 className="text-lg font-semibold">{booking.propertyName}</h3>
//                 <p className="text-gray-600">Booked by: {booking.userName}</p>
//                 <p className="text-gray-600">
//                   Dates: {new Date(booking.startDate).toLocaleDateString()} -{" "}
//                   {new Date(booking.endDate).toLocaleDateString()}
//                 </p>
//                 <p className="text-gray-600">Status: {booking.status}</p>
//                 <div className="mt-4 flex space-x-2">
//                   {booking.status === "pending" && (
//                     <>
//                       <button
//                         onClick={() => handleApprove(booking.id)}
//                         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleDecline(booking.id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                       >
//                         Decline
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingManagement;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";

// const BookingManagement = () => {
//   // Get current user from Redux
//   const currentUser = useSelector((state) => state.auth.user);

//   // Store booking data
//   const [bookings, setBookings] = useState([]);

//   // Fetch bookings on page load
//   useEffect(() => {
//     if (currentUser) {
//       fetchBookings();
//     }
//   }, [currentUser]);

//   // Fetch bookings for the current user (landlord)
//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get(
//         `https://redux-project-791e5-default-rtdb.firebaseio.com/payments.json`
//       );

//       const data = response.data;
//       if (!data) {
//         console.log("❌ No bookings available.");
//         return;
//       }

//       // Filter bookings for the current user only
//       const filteredBookings = Object.keys(data)
//         .map((key) => ({
//           id: key,
//           ...data[key], // Add booking data
//         }))
//         .filter((booking) => booking.landlordId === currentUser?.uid);

//       setBookings(filteredBookings);
//     } catch (error) {
//       console.error("❌ Error fetching bookings:", error);
//     }
//   };

//   // Approve booking function
//   const handleApprove = async (id) => {
//     try {
//       await axios.patch(
//         `https://redux-project-791e5-default-rtdb.firebaseio.com/payments/${id}.json`,
//         { status: "approved" }
//       );

//       // Update the state
//       const updatedBookings = bookings.map((booking) =>
//         booking.id === id ? { ...booking, status: "approved" } : booking
//       );
//       setBookings(updatedBookings);

//       // Success alert
//       Swal.fire("✅ Approved!", "Booking has been approved.", "success");
//     } catch (error) {
//       console.error("❌ Error approving booking:", error);
//       Swal.fire("❌ Error!", "Failed to approve booking.", "error");
//     }
//   };

//   // Decline booking function
//   const handleDecline = async (id) => {
//     try {
//       await axios.patch(
//         `https://redux-project-791e5-default-rtdb.firebaseio.com/payments/${id}.json`,
//         { status: "declined" }
//       );

//       // Update the state
//       const updatedBookings = bookings.map((booking) =>
//         booking.id === id ? { ...booking, status: "declined" } : booking
//       );
//       setBookings(updatedBookings);

//       // Success alert
//       Swal.fire("❌ Declined!", "Booking has been declined.", "success");
//     } catch (error) {
//       console.error("❌ Error declining booking:", error);
//       Swal.fire("❌ Error!", "Failed to decline booking.", "error");
//     }
//   };

//   // Cancel booking function
//   const handleCancel = async (id) => {
//     try {
//       await axios.patch(
//         `https://redux-project-791e5-default-rtdb.firebaseio.com/payments/${id}.json`,
//         { status: "cancelled" }
//       );

//       // Update the state
//       const updatedBookings = bookings.map((booking) =>
//         booking.id === id ? { ...booking, status: "cancelled" } : booking
//       );
//       setBookings(updatedBookings);

//       // Success alert
//       Swal.fire("🛑 Canceled!", "Booking has been canceled.", "success");
//     } catch (error) {
//       console.error("❌ Error canceling booking:", error);
//       Swal.fire("❌ Error!", "Failed to cancel booking.", "error");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Booking Management 📅</h1>

//       {/* Booking list */}
//       <div>
//         {bookings.length === 0 ? (
//           <p className="text-gray-600">No bookings available.</p>
//         ) : (
//           <div className="space-y-4">
//             {bookings.map((booking) => (
//               <div key={booking.id} className="border p-4 rounded-lg shadow-md bg-white">
//                 <h3 className="text-lg font-semibold">{booking.pitchName}</h3>
//                 <p className="text-gray-600">📌 Booked by: {booking.userName || "Unknown"}</p>
//                 <p className="text-gray-600">
//                   🗓️ Date: {new Date(booking.startDate).toLocaleDateString()} -{" "}
//                   {new Date(booking.endDate).toLocaleDateString()}
//                 </p>
//                 <p className={`text-gray-600 font-semibold ${booking.status === "approved" ? "text-green-600" : booking.status === "declined" ? "text-red-600" : "text-yellow-500"}`}>
//                   ⚡ Status: {booking.status}
//                 </p>
//                 <div className="mt-4 flex space-x-2">
//                   {booking.status === "pending" && (
//                     <>
//                       <button
//                         onClick={() => handleApprove(booking.id)}
//                         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//                       >
//                         ✅ Approve
//                       </button>
//                       <button
//                         onClick={() => handleDecline(booking.id)}
//                         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//                       >
//                         ❌ Decline
//                       </button>
//                     </>
//                   )}

//                   {/* Show Cancel button if booking is approved or declined */}
//                   {(booking.status === "approved" || booking.status === "declined") && (
//                     <button
//                       onClick={() => handleCancel(booking.id)}
//                       className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
//                     >
//                       🛑 Cancel Booking
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingManagement;




//////////////////
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const BookingManagement = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [bookings, setBookings] = useState([]);
  const [stadiums, setStadiums] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchStadiums();
    }
  }, [currentUser]);

  const fetchStadiums = async () => {
    try {
      const response = await axios.get(
        `https://redux-project-791e5-default-rtdb.firebaseio.com/Stadiums.json`
      );
      const data = response.data;
      if (!data) return;

      const landlordStadiums = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .filter((stadium) => stadium.landlordId === currentUser?.uid);

      setStadiums(landlordStadiums);
      fetchBookings(landlordStadiums);
    } catch (error) {
      console.error("❌ Error fetching stadiums:", error);
    }
  };

  const fetchBookings = async (landlordStadiums) => {
    try {
      const response = await axios.get(
        `https://redux-project-791e5-default-rtdb.firebaseio.com/payments.json`
      );
      const data = response.data;
      if (!data) return;

      const today = new Date();
      const filteredBookings = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .filter((booking) =>
          landlordStadiums.some((stadium) => stadium.name === booking.pitchName)&&
        new Date(booking.date) >= today 

        );

      setBookings(filteredBookings);
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.patch(
        `https://redux-project-791e5-default-rtdb.firebaseio.com/payments/${id}.json`,
        { status: "cancelled" }
      );

      setBookings((prev) => prev.map((booking) =>
        booking.id === id ? { ...booking, status: "cancelled" } : booking
      ));

      Swal.fire("🛑 Canceled!", "Booking has been canceled.", "success");
    } catch (error) {
      console.error("❌ Error canceling booking:", error);
      Swal.fire("❌ Error!", "Failed to cancel booking.", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Booking Management 📅</h1>
      <div>
        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings available.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border p-4 rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-semibold">{booking.pitchName}</h3>
                <p className="text-gray-600">📌 Booked by: {booking.email || "Unknown"}</p>
                <p className="text-gray-600">🗓️ Date: {new Date(booking.date).toLocaleDateString()}</p>
                <p className={`text-gray-600 font-semibold ${booking.status === "approved" ? "text-green-600" : booking.status === "declined" ? "text-red-600" : "text-yellow-500"}`}>
                  ⚡ Status: {booking.status}
                </p>
                {(booking.status !== "cancelled") && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  >
                    🛑 Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingManagement;
