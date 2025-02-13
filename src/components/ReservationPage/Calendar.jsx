import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchPaymentDataByDate } from '../../redux/paymentSlice'; // Adjust the import path as needed

function Calendar() {
  const dispatch = useDispatch();
  const paymentData = useSelector((state) => state.payment.paymentData);

  useEffect(() => {
    dispatch(fetchPaymentDataByDate());
  }, [dispatch]);

  // Transform payment data into calendar events
  const getEvents = () => {
    if (!paymentData?.data) return [];
    
    // Convert Firebase data object into array of events
    return Object.values(paymentData.data).map(payment => ({
      title: 'Booked',
      date: payment.date,
      className: 'highlighted-day'
    }));
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "prev,next",
          center: "title",
          end: "",
        }}
        height={"50vh"}
        events={getEvents()}
        eventClassNames="highlighted-day"
      />
      <style>
        {`
          .highlighted-day {
            background-color: red !important;
            color: white !important;
          }
        `}
      </style>
    </div>
  );
}

export default Calendar;