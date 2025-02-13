import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useSelector } from "react-redux";

const localizer = momentLocalizer(moment);

const LandlordCalendar = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/landlord/bookings?landlordId=${currentUser.uid}`
      );
      const bookings = response.data;
      
      const calendarEvents = bookings.map((booking) => ({
        id: booking.id,
        title: `Booked: ${booking.propertyName}`,
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
        allDay: true,
        status: "booked",
      }));

      setEvents(calendarEvents);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleSelectSlot = async (slotInfo) => {
    const { start, end } = slotInfo;
    const isBooked = events.some(
      (event) =>
        moment(start).isBetween(event.start, event.end, null, "[]") ||
        moment(end).isBetween(event.start, event.end, null, "[]")
    );

    if (isBooked) {
      alert("This date range is already booked.");
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: "Available",
      start,
      end,
      allDay: true,
      status: "available",
    };

    try {
      await axios.post("http://localhost:5000/api/landlord/availability", {
        landlordId: currentUser.uid,
        startDate: start,
        endDate: end,
        status: "available",
      });

      setEvents([...events, newEvent]);
    } catch (error) {
      console.error("Error saving availability:", error);
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = event.status === "available" ? "#50b83c" : "#3174ad";
    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        color: "white",
        border: "none",
      },
    };
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Landlord Availability Calendar</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          selectable
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventStyleGetter}
          defaultView="month"
        />
      </div>
    </div>
  );
};

export default LandlordCalendar;
