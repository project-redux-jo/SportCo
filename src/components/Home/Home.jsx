import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol, faStar, faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  MapPin,
  BadgePercent,
  CreditCard,
  CalendarCheck,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import { Link as ScrollLink } from "react-scroll";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Home() {
  const locations = [
    {
      id: 1,
      name: "Al-Qudis - soccer field",
      position: [32.0784409, 36.072574],
    },
    {
      id: 2,
      name: "Petra soccer field",
      position: [32.08336976603278, 36.081933847826285],
    },
    {
      id: 3,
      name: "Bolywood soccer field",
      position: [32.110474812696, 36.090716838817514],
    },
    {
      id: 4,
      name: "Municipal Stadium",
      position: [32.054181432072866, 36.08836619659992],
    },
    {
      id: 5,
      name: "Golden Ball Stadium Penta",
      position: [32.04704880147237, 36.09512434593029],
    },
  ];
  return (
    <div>
      <main className="flex flex-col ">
        <motion.section
          className="relative w-full h-[50vh] " // Added padding to prevent content from hiding under navbar
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Hero Section */}
          <section className="relative w-full h-[50vh] ">
            <img
              src="/img/HeroHomePage.png"
              alt="Hero"
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
              <h1 className="text-2xl md:text-4xl font-extrabold drop-shadow-lg">
                Booking Sport Venues Has Never Been Easier
              </h1>
              <p className="text-lg md:text-xl mt-3 mb-5 font-light tracking-wide">
                Find Fields Near You In Jordan
              </p>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <ScrollLink
                  to="features"
                  smooth={true}
                  duration={600}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-green-400 to-green-700 text-white text-lg font-semibold rounded-full shadow-lg transition hover:scale-105 cursor-pointer"
                >
                  Know More
                </ScrollLink>
              </motion.div>
            </div>
          </section>
        </motion.section>

        <motion.section
          id="features"
          className="py-16 bg-gradient-to-b from-white to-[#F5FAF7]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Important Features Section */}
          <section
            id="features"
            className="py-16 bg-gradient-to-b from-white to-[#F5FAF7]"
          >
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900">
                Important <span className="text-[#A9C46C]">Features</span> of
                the App:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12 text-center">
                <div className="flex flex-col items-center">
                  <FontAwesomeIcon
                    icon={faFutbol}
                    size="2x"
                    className="text-[#A9C46C] mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Choose your favorite playgrounds
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Get detailed information and easily book multiple
                    playgrounds.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin size={40} className="text-[#A9C46C] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Exact location
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Use location services to easily find playgrounds nearby.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <BadgePercent size={40} className="text-[#A9C46C] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Exclusive offers
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Benefit from exclusive offers and discounts when booking
                    your playgrounds.
                  </p>
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row justify-center items-center gap-10 mx-auto">
                  <div className="flex flex-col items-center">
                    <CreditCard size={40} className="text-[#A9C46C] mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      Secure and multiple payment
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Multiple payment options.
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <CalendarCheck size={40} className="text-[#A9C46C] mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      Easy booking management
                    </h3>
                    <p className="text-gray-600 mt-2">
                      An application that makes it easy for playground owners to
                      manage bookings.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    size="2x"
                    className="text-[#A9C46C] mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Customer Reviews & Ratings
                  </h3>
                  <p className="text-gray-600 mt-2">
                    See what other players and venue owners say about their
                    experiences.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </motion.section>

        {/* Special & Unique Experience Section */}
        <motion.section
          id="experience"
          className="py-16 bg-gradient-to-b from-white to-[#F5FAF7]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Enjoy a special experience
                </h2>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-[#A9C46C] mr-2"
                    />{" "}
                    Benefit from the smart playground booking application.
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-[#A9C46C] mr-2"
                    />{" "}
                    Experience an efficient and distinctive booking process
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-[#A9C46C] mr-2"
                    />{" "}
                    Book your favorite playgrounds instantly
                  </li>
                </ul>
              </div>
              <motion.img
                src="/img/player1.png"
                alt="Player 1"
                className="w-full max-w-sm mx-auto"
                whileHover={{ scale: 1.1 }}
              />
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 mt-16">
              <motion.img
                src="/img/player2.png"
                alt="Player 2"
                className="w-full max-w-sm mx-auto"
                whileHover={{ scale: 1.1 }}
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Enjoy a unique experience
                </h2>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-[#A9C46C] mr-2"
                    />{" "}
                    Get comprehensive information about playgrounds and book
                    quickly.
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-[#A9C46C] mr-2"
                    />{" "}
                    Unique booking experience and precise sports organization.
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-[#A9C46C] mr-2"
                    />{" "}
                    Book playgrounds flexibly and browse nearby location maps.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center"
          style={{
            backgroundImage: "url('/img/AboutSectionHomePage.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            About <span className="text-blue-500">WEBSITE</span>
          </h2>
          <p className="max-w-2xl text-gray-700 mt-4 leading-relaxed mb-6">
            Proball is an easy-to-use app for booking badminton courts. You can
            search for available courts and easily book your preferred one.
          </p>

          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/about"
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-lg font-semibold rounded-full shadow-lg transition hover:scale-105"
            >
              Know More
            </Link>
          </motion.div>
        </motion.section>
        <motion.section
          className="py-16 bg-[#F5FAF7] text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <span className="text-green-500">•</span> Book Your Game Within
            Minutes <span className="text-green-500">•</span>
          </h2>

          {/* Steps Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Step 1 - Find */}
            <motion.div
              className="flex flex-col items-center p-6 bg-green-50 hover:bg-green-100 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin size={50} className="text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Find</h3>
              <p className="text-gray-600">A nearby Stadium</p>
            </motion.div>

            {/* Step 2 - Select */}
            <motion.div
              className="flex flex-col items-center p-6 bg-green-50 hover:bg-green-100  rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <CalendarDays size={50} className="text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Select</h3>
              <p className="text-gray-600">
                Date, time, duration, and pitch size
              </p>
            </motion.div>

            {/* Step 3 - Pay */}
            <motion.div
              className="flex flex-col items-center p-6 bg-green-50 hover:bg-green-100  rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <CreditCard size={50} className="text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Pay</h3>
              <p className="text-gray-600">The booking amount online or cash</p>
            </motion.div>
          </div>
        </motion.section>
        {/* 📍 Map Section */}
        <motion.section
          className="py-16 bg-[#F5FAF7] text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Find Stadiums Near You
          </h2>

          {/* 🗺️ Map Component */}
          <div className="w-full max-w-4xl mx-auto mt-6 h-[400px]">
            <MapContainer
              center={[31.963158, 35.930359]} // Centered on Amman
              zoom={8} // Adjust zoom level to show all markers
              style={{ height: "100%", width: "100%", borderRadius: "10px" }}
            >
              {/* Tile Layer - OpenStreetMap */}
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* Loop Through Locations & Render Markers */}
              {locations.map((location) => (
                <Marker key={location.id} position={location.position}>
                  <Popup>
                    <strong>{location.name}</strong> <br />
                    Available for bookings.
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default Home;
