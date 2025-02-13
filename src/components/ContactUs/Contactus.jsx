// import { useState } from "react";

// export default function Contactus() {
//   const [darkMode, setDarkMode] = useState(false);

//     const [userData, setUserData] = useState({
//       Name: "",
//       Email: "",
//       Message:"",
//     });
// let name,value
//     const data =(e)=>{
//      name = e.target.name;
//      value=e.target.value;
// setUserData ( {...userData, [name]:value});

//     }

//     const send=async(e)=>{
//       const { Name, Email, Message } = userData;
//       e.preventDefault()
//       const option ='POST'
//       headers:{
//         'Content-type':'aplication/json'
//            boby:JSON.stringify({

//         Name, Email, Message
//       })
//       }
//   const res=fetch('')
//     }
//   return (
//     <div
//       className={
//         darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
//       }
//     >
//       <div className="xl:container mx-auto mb-32">
//         {/* زر التبديل بين الوضع الفاتح والداكن */}
//         <div className="flex justify-end p-4">
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="bg-gray-800 text-white px-4 py-2 rounded-lg dark:bg-gray-200 dark:text-gray-900"
//           >
//             {darkMode ? "Light Mode" : "Dark Mode"}
//           </button>
//         </div>

//         <div
//           className="flex justify-center items-center"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(0, 0, 0, 1) 40%, rgba(128, 157, 60, 1) 100%)",
//             height: "250px",
//           }}
//         >
//           <h1 className="text-5xl sm:text-7xl text-white uppercase">Contact</h1>
//         </div>

//         <div className="flex justify-center px-4 my-10">
//           <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 -mt-24 py-10 md:py-12 px-6 md:px-8 w-full max-w-2xl">
//             <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
//               Contact us
//             </h2>
//             <form className="space-y-6 ">
//               <div>
//                 <label className="text-gray-700 dark:text-gray-300 text-lg">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="Name"
//                   value={userData.Name}
//                   className="w-full mt-2 p-4 text-lg h-14 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Enter your name"
//                   onChange={data}
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 text-lg">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="Email"
//                   value={userData.Email}
//                   className="w-full mt-2 p-4 text-lg h-14 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="example@email.com"
//                   onChange={data}
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 text-lg">
//                   Message
//                 </label>
//                 <textarea
//                   name="Message"
//                   value={userData.Message}
//                   rows="6"
//                   className="w-full mt-2 p-4 text-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Write your message here..."
//                   onChange={data}
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-green-600 text-white py-4 text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300"
//                 onClick={send}
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import axios from "axios";

// export default function Contactus() {

//   const [userData, setUserData] = useState({
//     Name: "",
//     Email: "",
//     Message: "",
//   });

//   const data = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const send = async (e) => {
//     e.preventDefault();
//     const { Name, Email, Message } = userData;

//     try {
//       const response = await axios.post(
//         "https://contact-d8d7d-default-rtdb.firebaseio.com/user.json",
//         {
//           Name,
//           Email,
//           Message,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Message sent successfully!");
//         setUserData({ Name: "", Email: "", Message: "" });
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       alert("Failed to send message. Please try again later.");
//     }
//   };

//   return (
//     <div
   
//     >
//       <div className="xl:container mx-auto mb-32">
       
//         <div
//           className="flex justify-center items-center"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(0, 0, 0, 1) 40%, rgba(128, 157, 60, 1) 100%)",
//             height: "250px",
//           }}
//         >
//           <h1 className="text-5xl sm:text-7xl text-white uppercase">Contact</h1>
//         </div>

//         <div className="flex justify-center px-4 my-10">
//           <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 -mt-24 py-10 md:py-12 px-6 md:px-8 w-full max-w-2xl">
//             <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
//               Contact us
//             </h2>
//             <form className="space-y-6 ">
//               <div>
//                 <label className="text-gray-700 dark:text-gray-300 text-lg">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="Name"
//                   value={userData.Name}
//                   className="w-full mt-2 p-4 text-lg h-14 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Enter your name"
//                   onChange={data}
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 text-lg">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="Email"
//                   value={userData.Email}
//                   className="w-full mt-2 p-4 text-lg h-14 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="example@email.com"
//                   onChange={data}
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 text-lg">
//                   Message
//                 </label>
//                 <textarea
//                   name="Message"
//                   value={userData.Message}
//                   rows="6"
//                   className="w-full mt-2 p-4 text-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Write your message here..."
//                   onChange={data}
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-green-600 text-white py-4 text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300"
//                 onClick={send}
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactUs() {
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
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our services? We're here to help. Contact us through any of the following channels or fill out the form.
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
                  <p className="text-gray-600">123 Sports Street, City Center</p>
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
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7F3B] focus:border-transparent transition"
                    placeholder="Your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7F3B] focus:border-transparent transition"
                  placeholder="Message subject"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
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