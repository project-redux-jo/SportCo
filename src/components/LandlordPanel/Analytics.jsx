// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import ReactApexChart from "react-apexcharts";
// import api from "../../api";
// const Analytics = () => {
//   // Get the current user from Redux store
//   const currentUser = useSelector((state) => state.Land.user);

//   // State to manage analytics data
//   const [analyticsData, setAnalyticsData] = useState([]);

//   // Fetch analytics data from the backend on component mount
//   useEffect(() => {
//     if (currentUser) {
//       fetchAnalyticsData();
//     }
//   }, [currentUser]);

//   // Fetch analytics data for the landlord's properties
//   const fetchAnalyticsData = async () => {
//     try {
//       const response = await api.get(
//         `/Stadiums${currentUser.uid}`
//       );
//       setAnalyticsData(response.data);
//     } catch (error) {
//       console.error("Error fetching analytics data:", error);
//     }
//   };

//   // Prepare data for the charts
//   const propertyNames = analyticsData.map((property) => property.name);
//   const viewsData = analyticsData.map((property) => property.views);
//   const bookingsData = analyticsData.map((property) => property.bookings);
//   const revenueData = analyticsData.map((property) => property.revenue);

//   // Chart options for views
//   const viewsChartOptions = {
//     chart: {
//       type: "bar",
//     },
//     xaxis: {
//       categories: propertyNames,
//     },
//     title: {
//       text: "Property Views",
//     },
//   };

//   // Chart options for bookings
//   const bookingsChartOptions = {
//     chart: {
//       type: "bar",
//     },
//     xaxis: {
//       categories: propertyNames,
//     },
//     title: {
//       text: "Property Bookings",
//     },
//   };

//   // Chart options for revenue
//   const revenueChartOptions = {
//     chart: {
//       type: "line",
//     },
//     xaxis: {
//       categories: propertyNames,
//     },
//     title: {
//       text: "Property Revenue",
//     },
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Analytics</h1>

//       {/* Key Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold">Total Views</h3>
//           <p className="text-2xl font-bold">
//             {viewsData.reduce((total, views) => total + views, 0)}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold">Total Bookings</h3>
//           <p className="text-2xl font-bold">
//             {bookingsData.reduce((total, bookings) => total + bookings, 0)}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold">Total Revenue</h3>
//           <p className="text-2xl font-bold">
//             ${revenueData.reduce((total, revenue) => total + revenue, 0)}
//           </p>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="space-y-6">
//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <ReactApexChart
//             options={viewsChartOptions}
//             series={[{ name: "Views", data: viewsData }]}
//             type="bar"
//             height={350}
//           />
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <ReactApexChart
//             options={bookingsChartOptions}
//             series={[{ name: "Bookings", data: bookingsData }]}
//             type="bar"
//             height={350}
//           />
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <ReactApexChart
//             options={revenueChartOptions}
//             series={[{ name: "Revenue", data: revenueData }]}
//             type="line"
//             height={350}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analytics;



import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Analytics = () => {

  const currentUser = useSelector((state) => state.Land.user);
  

  const [stadiums, setStadiums] = useState([]);
  const [bookings, setBookings] = useState([]);

  
  useEffect(() => {
    if (currentUser) {
      fetchStadiumsData();
      fetchBookingsData();
    }
  }, [currentUser]);



  useEffect(() => {
    if (stadiums.length > 0) {
      fetchBookingsData();
    }
  }, [stadiums]);
 
  const fetchStadiumsData = async () => {
    try {
      const response = await axios.get(
        `https://redux-project-791e5-default-rtdb.firebaseio.com/Stadiums.json`
      );
      const data = response.data;
      
      if (data) {
        
        const filteredStadiums = Object.values(data).filter(
          (stadium) => stadium.landlordId === currentUser.uid
        );
        setStadiums(filteredStadiums);
      }
    } catch (error) {
      console.error("Error fetching stadiums data:", error);
    }
  };

  const fetchBookingsData = async () => {
    try {
      const response = await axios.get(
        `https://redux-project-791e5-default-rtdb.firebaseio.com/payments.json`
      );
      const data = response.data;

      if (data && stadiums.length > 0) {
     
        const filteredBookings = Object.values(data).filter((booking) =>
          stadiums.some((stadium) => stadium.name === booking.pitchName)
        );
        setBookings(filteredBookings);
      }
    } catch (error) {
      console.error("Error fetching bookings data:", error);
    }
  };

  //  الإحصائيات

  const validBookings = bookings.filter(booking => booking.status !== "cancelled");

  const totalViews = stadiums.reduce((total, stadium) => total + (stadium.views || 0), 0);
  const totalBookings = validBookings.length;
  const totalRevenue = validBookings.reduce((total, booking) => {
    return total + (Number(booking.price) || 0); 
  }, 0);
  
  
  const propertyNames = stadiums.map((stadium) => stadium.name);
  const viewsData = stadiums.map((stadium) => stadium.views || 0);
  const bookingsData = stadiums.map(
    (stadium) => validBookings.filter((booking) => booking.pitchName === stadium.name).length
  );
  const revenueData = stadiums.map(
    (stadium) => bookings
      .filter((booking) => booking.pitchName === stadium.name)
      .reduce((total, booking) => total + (booking.price || 0), 0)
  );

 
  const chartOptions = (title) => ({
    chart: { type: "bar" },
    xaxis: { categories: propertyNames },
    title: { text: title },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Analytics Dashboard</h1>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">👁️ Total Views</h3>
          <p className="text-2xl font-bold">192</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">📅 Total Bookings</h3>
          <p className="text-2xl font-bold">{totalBookings}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">💰 Total Revenue</h3>
          <p className="text-2xl font-bold">
  ${isNaN(totalRevenue) ? "0.00" : totalRevenue.toFixed(2)}
</p>
        </div>
      </div>

      {/* المخططات البيانية */}
      <div className="space-y-6">
        {/* <div className="bg-white p-4 rounded-lg shadow-md">
          <ReactApexChart
            options={chartOptions("Property Views")}
            series={[{ name: "Views", data: viewsData }]}
            type="bar"
            height={350}
          />
        </div> */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ReactApexChart
            options={chartOptions("Property Bookings")}
            series={[{ name: "Bookings", data: bookingsData }]}
            type="bar"
            height={350}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ReactApexChart
            options={chartOptions("Property Revenue")}
            series={[{ name: "Revenue", data: revenueData }]}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
