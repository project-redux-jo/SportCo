// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const localizer = momentLocalizer(moment);

// const LandlordCalendar = () => {
//   const currentUser = useSelector((state) => state.auth.user);
//   const [events, setEvents] = useState([]);

  

//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get(
//         `https://redux-project-791e5-default-rtdb.firebaseio.com/payments.json`
//       );
  
//       const data = response.data;
//       if (!data) {
//         console.log("❌ لا توجد حجوزات متاحة.");
//         return;
//       }
  
//       // تصفية الحجوزات الخاصة بهذا المالك فقط
//       const filteredBookings = Object.values(data).filter(
//         (booking) => booking.landlordId === currentUser.uid
//       );
  
//       // تحويل الحجوزات إلى تنسيق متوافق مع التقويم
//       const calendarEvents = filteredBookings.map((booking) => ({
//         id: booking.id || Date.now(),
//         title: `Booked: ${booking.pitchName || "Unknown"}`,
//         start: new Date(booking.startDate),
//         end: new Date(booking.endDate),
//         allDay: true,
//         status: "booked",
//       }));
  
//       setEvents(calendarEvents);
//     } catch (error) {
//       console.error("❌ خطأ أثناء جلب الحجوزات:", error);
//     }
//   };
  
//   const handleSelectSlot = async (slotInfo) => {
//     const { start, end } = slotInfo;
  
//     // التأكد من أن الحجز الجديد لا يتداخل مع حجوزات أخرى
//     const isBooked = events.some(
//       (event) =>
//         moment(start).isBetween(event.start, event.end, null, "[]") ||
//         moment(end).isBetween(event.start, event.end, null, "[]")
//     );
  
//     if (isBooked) {
//       alert("⚠️ هذا التاريخ محجوز بالفعل.");
//       return;
//     }
  
//     const newEvent = {
//       id: Date.now(),
//       title: "Available",
//       start,
//       end,
//       allDay: true,
//       status: "available",
//     };
  
//     try {
//       // إرسال البيانات إلى Firebase بدلاً من API المحلي
//       await axios.post("https://redux-project-791e5-default-rtdb.firebaseio.com/availability.json", {
//         landlordId: currentUser.uid,
//         startDate: start.toISOString(),
//         endDate: end.toISOString(),
//         status: "available",
//       });
  
//       setEvents([...events, newEvent]);
//     } catch (error) {
//       console.error("❌ خطأ أثناء حفظ التوافر:", error);
//     }
//   };

  

//   const eventStyleGetter = (event) => {
//     let backgroundColor = "#3174ad"; 
  
//     if (event.status === "available") {
//       backgroundColor = "#50b83c"; 
//     } else if (event.status === "booked") {
//       backgroundColor = "#FF5733"; 
//     }
//     useEffect(() => {
//       if (currentUser) {
//         fetchBookings();
//       }
//     }, [currentUser]);
//     return {
//       style: {
//         backgroundColor,
//         borderRadius: "4px",
//         color: "white",
//         border: "none",
//         padding: "5px",
//       },
//     };
//   };
  

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Landlord Availability Calendar</h1>
//       <div className="bg-white p-4 rounded-lg shadow-lg">
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: 600 }}
//           selectable
//           onSelectSlot={handleSelectSlot}
//           eventPropGetter={eventStyleGetter}
//           defaultView="month"
//         />
//       </div>
//     </div>
//   );
// };

// export default LandlordCalendar;




//////////////////////////////////////////




// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const localizer = momentLocalizer(moment);

// const LandlordCalendar = () => {
//   const currentUser = useSelector((state) => state.auth.user);
//   const [events, setEvents] = useState([]);
//   const [stadiums, setStadiums] = useState([]);

//   useEffect(() => {
//     if (currentUser) {
//       fetchStadiums();
//     }
//   }, [currentUser]);

//   // Fetch stadiums owned by the landlord
//   const fetchStadiums = async () => {
//     try {
//       const response = await axios.get(
//         `https://redux-project-791e5-default-rtdb.firebaseio.com/Stadiums.json`
//       );

//       const data = response.data;
//       if (!data) {
//         console.log("❌ No stadiums found.");
//         return;
//       }

//       // Filter stadiums owned by the logged-in landlord
//       const landlordStadiums = Object.keys(data)
//         .map((key) => ({
//           id: key,
//           ...data[key],
//         }))
//         .filter((stadium) => stadium.landlordId === currentUser?.uid);

//       setStadiums(landlordStadiums);

//       // Fetch bookings after loading stadiums
//       fetchBookings(landlordStadiums);
//     } catch (error) {
//       console.error("❌ Error fetching stadiums:", error);
//     }
//   };

//   // Fetch bookings for the landlord's stadiums
//   const fetchBookings = async (landlordStadiums) => {
//     try {
//       const response = await axios.get(
//         `https://redux-project-791e5-default-rtdb.firebaseio.com/payments.json`
//       );

//       const data = response.data;
//       if (!data) {
//         console.log("❌ No bookings found.");
//         return;
//       }

//       // Filter bookings for the landlord's stadiums
//       const filteredBookings = Object.keys(data)
//         .map((key) => ({
//           id: key,
//           ...data[key],
//         }))
//         .filter((booking) =>
//           landlordStadiums.some((stadium) => stadium.name === booking.pitchName)
//         );

//       // Convert bookings to calendar events
//       const calendarEvents = filteredBookings.map((booking) => ({
//         id: booking.id,
//         title: `📌 Booked: ${booking.pitchName || "Unknown"}`,
//         start: booking.startDate ? new Date(booking.startDate) : new Date(),
//         end: booking.endDate ? new Date(booking.endDate) : new Date(),
//         allDay: true,
//         status: "booked",
//       }));

//       setEvents(calendarEvents);
//     } catch (error) {
//       console.error("❌ Error fetching bookings:", error);
//     }
//   };

//   // Handle selecting a date range
//   const handleSelectSlot = async (slotInfo) => {
//     const { start, end } = slotInfo;

//     // Ensure the landlord has at least one stadium before allowing availability
//     if (stadiums.length === 0) {
//       alert("⚠️ You don't own any stadiums.");
//       return;
//     }

//     // Check if the selected date range is already booked
//     const isBooked = events.some(
//       (event) =>
//         moment(start).isBetween(event.start, event.end, null, "[]") ||
//         moment(end).isBetween(event.start, event.end, null, "[]")
//     );

//     if (isBooked) {
//       alert("⚠️ This date range is already booked.");
//       return;
//     }

//     const newEvent = {
//       id: Date.now(),
//       title: "🟢 Available",
//       start,
//       end,
//       allDay: true,
//       status: "available",
//     };

//     try {
//       // Save availability to Firebase
//       await axios.post("https://redux-project-791e5-default-rtdb.firebaseio.com/availability.json", {
//         landlordId: currentUser.uid,
//         startDate: start.toISOString(),
//         endDate: end.toISOString(),
//         status: "available",
//       });

//       setEvents([...events, newEvent]);
//     } catch (error) {
//       console.error("❌ Error saving availability:", error);
//     }
//   };

//   // Customize event styles
//   const eventStyleGetter = (event) => {
//     let backgroundColor;

//     if (event.status === "available") {
//       backgroundColor = "#50b83c"; // Green for available dates
//     } else if (event.status === "booked") {
//       backgroundColor = "#FF5733"; // Red for confirmed bookings
//     } else {
//       backgroundColor = "#3174ad"; // Default blue
//     }

//     return {
//       style: {
//         backgroundColor,
//         borderRadius: "4px",
//         color: "white",
//         border: "none",
//         padding: "5px",
//       },
//     };
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">📅 Landlord Booking Calendar</h1>
//       <div className="bg-white p-4 rounded-lg shadow-lg">
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: 600 }}
//           selectable
//           onSelectSlot={handleSelectSlot}
//           eventPropGetter={eventStyleGetter}
//           defaultView="month"
//         />
//       </div>
//     </div>
//   );
// };

// export default LandlordCalendar;



//////////////////////////////
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
  const [stadiums, setStadiums] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchStadiums();
    }
  }, [currentUser]);

  // جلب الملاعب التي يملكها المالك الحالي

  const fetchStadiums = async () => {

    try {
      const response = await axios.get(
        `https://redux-project-791e5-default-rtdb.firebaseio.com/Stadiums.json`
      );

      const data = response.data;
      if (!data) {
        console.log("❌ No stadiums found.");
        return;
      }

      // تصفية الملاعب حسب المالك الحالي
      const landlordStadiums = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .filter((stadium) => stadium.landlordId === currentUser?.uid);

      setStadiums(landlordStadiums);

      // جلب الحجوزات بعد تحميل الملاعب
      fetchBookings(landlordStadiums);
    } catch (error) {
      console.error("❌ Error fetching stadiums:", error);
    }
  };

  // جلب الحجوزات الخاصة بملاعب المالك
  
  const fetchBookings = async (landlordStadiums) => {
    try {
      const response = await axios.get(
        `https://redux-project-791e5-default-rtdb.firebaseio.com/payments.json`
      );

   
      const data = response.data; 
    
      if (!data) {
        console.log("❌ No bookings found.");
        return;
      }
 
      // تصفية الحجوزات حسب ملاعب المالك

  
    

      const filteredBookings = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .filter((booking) =>
          landlordStadiums.some((stadium) => stadium.name === booking.pitchName &&

      booking.status === 'Approve' )

        );
     
      // تحويل الحجوزات إلى أحداث التقويم
  
      const calendarEvents = filteredBookings.map((booking) => ({
        id: booking.id,
        title: `📌 Booked: ${booking.pitchName || "Unknown"}`,
        start: new Date(booking.date), // فقط استخدام تاريخ الحجز
        end: new Date(booking.date), // بدون فترة زمنية
        allDay: true,
        status: "booked",
      }));
    
      setEvents(calendarEvents);
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
    }
  };

  // تخصيص نمط الأحداث في التقويم
  const eventStyleGetter = (event) => {
    let backgroundColor;

    if (event.status === "booked") {
      backgroundColor = "#FF5733"; // أحمر للحجوزات المؤكدة
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        color: "white",
        border: "none",
        padding: "5px",
      },
    };
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📅 Landlord Booking Calendar</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          eventPropGetter={eventStyleGetter}
          defaultView="month"
        />
      </div>
    </div>
  );
};

export default LandlordCalendar;
