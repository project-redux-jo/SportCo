import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";

const Analytics = () => {
  // Get the current user from Redux store
  const currentUser = useSelector((state) => state.auth.user);

  // State to manage analytics data
  const [analyticsData, setAnalyticsData] = useState([]);

  // Fetch analytics data from the backend on component mount
  useEffect(() => {
    if (currentUser) {
      fetchAnalyticsData();
    }
  }, [currentUser]);

  // Fetch analytics data for the landlord's properties
  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/analytics?landlordId=${currentUser.uid}`
      );
      setAnalyticsData(response.data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  // Prepare data for the charts
  const propertyNames = analyticsData.map((property) => property.name);
  const viewsData = analyticsData.map((property) => property.views);
  const bookingsData = analyticsData.map((property) => property.bookings);
  const revenueData = analyticsData.map((property) => property.revenue);

  // Chart options for views
  const viewsChartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: propertyNames,
    },
    title: {
      text: "Property Views",
    },
  };

  // Chart options for bookings
  const bookingsChartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: propertyNames,
    },
    title: {
      text: "Property Bookings",
    },
  };

  // Chart options for revenue
  const revenueChartOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: propertyNames,
    },
    title: {
      text: "Property Revenue",
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Views</h3>
          <p className="text-2xl font-bold">
            {viewsData.reduce((total, views) => total + views, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-2xl font-bold">
            {bookingsData.reduce((total, bookings) => total + bookings, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">
            ${revenueData.reduce((total, revenue) => total + revenue, 0)}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ReactApexChart
            options={viewsChartOptions}
            series={[{ name: "Views", data: viewsData }]}
            type="bar"
            height={350}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ReactApexChart
            options={bookingsChartOptions}
            series={[{ name: "Bookings", data: bookingsData }]}
            type="bar"
            height={350}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ReactApexChart
            options={revenueChartOptions}
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