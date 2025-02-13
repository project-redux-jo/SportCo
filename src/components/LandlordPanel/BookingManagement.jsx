import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const BookingManagement = () => {
  // Get the current user from Redux store
  const currentUser = useSelector((state) => state.auth.user);

  // State to manage bookings
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from the backend on component mount
  useEffect(() => {
    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser]);

  // Fetch bookings for the landlord's properties
  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bookings?landlordId=${currentUser.uid}`
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Handle approving a booking
  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, {
        status: "approved",
      });

      // Update the UI
      const updatedBookings = bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "approved" } : booking
      );
      setBookings(updatedBookings);

      // Show success message
      Swal.fire("Approved!", "The booking has been approved.", "success");
    } catch (error) {
      console.error("Error approving booking:", error);
      Swal.fire("Error!", "Failed to approve the booking.", "error");
    }
  };

  // Handle declining a booking
  const handleDecline = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, {
        status: "declined",
      });

      // Update the UI
      const updatedBookings = bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "declined" } : booking
      );
      setBookings(updatedBookings);

      // Show success message
      Swal.fire("Declined!", "The booking has been declined.", "success");
    } catch (error) {
      console.error("Error declining booking:", error);
      Swal.fire("Error!", "Failed to decline the booking.", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Booking Management</h1>

      {/* List of Bookings */}
      <div>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold">{booking.propertyName}</h3>
                <p className="text-gray-600">Booked by: {booking.userName}</p>
                <p className="text-gray-600">
                  Dates: {new Date(booking.startDate).toLocaleDateString()} -{" "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">Status: {booking.status}</p>
                <div className="mt-4 flex space-x-2">
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(booking.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecline(booking.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingManagement;