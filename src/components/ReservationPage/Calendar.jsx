// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { fetchPaymentDataByDate } from '../../redux/paymentSlice'; // Adjust the import path as needed

// function Calendar() {
//   const dispatch = useDispatch();
//   const paymentData = useSelector((state) => state.payment.paymentData);
//   const selectedStadium = useSelector((state) => state.courtInfo.selectedCourt);
//   // useEffect(() => {
//   //   dispatch(fetchPaymentDataByDate());
//   // }, [dispatch]);

//   useEffect(() => {
//     if (selectedStadium?.name) {
//       dispatch(fetchPaymentDataByDate(selectedStadium.name));
//     }
//   }, [dispatch, selectedStadium]);



//   // Transform payment data into calendar events
//     const getEvents = () => {
//     if (!paymentData?.data) return [];
//     return Object.values(paymentData.data).map(payment => ({
//       title: 'Booked',
//       date: payment.date,
//       className: 'highlighted-day'
//     }));
//   };

//   return (
//     <div>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView={"dayGridMonth"}
//         headerToolbar={{
//           start: "prev,next",
//           center: "title",
//           end: "",
//         }}
//         height={"50vh"}
//         events={getEvents()}
//         eventClassNames="highlighted-day"
//       />
//       <style>
//         {`
//           .highlighted-day {
//             background-color: red !important;
//             color: white !important;
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default Calendar;

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
    const selectedStadium=useSelector((state)=>state.courtInfo.selectedCourt);

  useEffect(() => {
    dispatch(fetchPaymentDataByDate());
  }, [dispatch]);

  const getEvents = () => {
    if (!paymentData?.data) return [];
    
    return Object.values(paymentData.data).map(payment => {
      // console.log(payment.pitchName); 
      // console.log(payment.date); 
      // console.log(selectedStadium.name); 
      if (payment.pitchName === selectedStadium.name &&
        payment.status === 'Approve') {
        return {
          title: 'Booked',
          date: payment.date,
          className: 'highlighted-day'
        };
      }
      return null;  
    }).filter(event => event !== null);  
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