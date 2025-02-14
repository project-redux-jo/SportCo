import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ContactUs() {
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Message: "",
  });

  // Retrieve user data from localStorage when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData((prevData) => ({
        ...prevData,
        Name: user.fullName || "",
        Email: user.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const send = async (e) => {
    e.preventDefault();
    const { Name, Email, Subject, Message } = userData;

    try {
      const response = await axios.post(
        "https://redux-project-791e5-default-rtdb.firebaseio.com/feedbacks.json",
        {
          Name,
          Email,
          Subject,
          Message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Show SweetAlert success message
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setUserData({ Name: "", Email: "", Subject: "", Message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to send message. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-[#5B7F3B]">
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 h-full flex items-center justify-center"
        >
          <h1 className="text-3xl md:text-6xl font-bold text-white text-center">
            Contact Us
          </h1>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-8">
                Have questions about our services? We are here to help. Contact
                us through any of the following channels or fill out the form.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-[#5B7F3B] rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Our Location</h3>
                  <p className="text-gray-600">
                    123 Sports Street, City Center
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-[#5B7F3B] rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone Number</h3>
                  <p className="text-gray-600">+1 (234) 567-8900</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-[#5B7F3B] rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Address</h3>
                  <p className="text-gray-600">contact@sportsvenue.com</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-[#5B7F3B] rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Working Hours</h3>
                  <p className="text-gray-600">Mon - Fri: 9:00 AM - 10:00 PM</p>
                  <p className="text-gray-600">Sat - Sun: 10:00 AM - 8:00 PM</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send us a Message
            </h3>
            <form className="space-y-6" onSubmit={send}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="Name"
                    value={userData.Name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7F3B] focus:border-transparent transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="Email"
                    value={userData.Email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7F3B] focus:border-transparent transition"
                    placeholder="Your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="subject">
                  Subject
                </label>
                <select
                  id="subject"
                  name="Subject"
                  value={userData.Subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7F3B] focus:border-transparent transition"
                >
                  <option value="">Select a subject</option>
                  <option value="Pitch Rental Inquiry">Pitch Rental Inquiry</option>
                  <option value="Pricing Information">Pricing Information</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Feedback/Suggestions">Feedback/Suggestions</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="Message"
                  value={userData.Message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7F3B] focus:border-transparent transition"
                  placeholder="Your message"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-[#5B7F3B] text-white py-3 px-6 rounded-lg hover:bg-[#4A6830] transition duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}