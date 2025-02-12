import React from 'react'
import { motion } from 'framer-motion';
function Aboutus() {
  return (
    <>
    
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-96 bg-[#5B7F3B]">
        <div className="absolute inset-0 bg-black/40" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 h-full flex items-center justify-center"
        >
          <h1 className="text-3xl md:text-6xl font-bold text-white text-center">
            About Us
          </h1>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Making Sports Venue Booking Simple
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              We are a leading platform in the sports facility booking industry, dedicated to making sports venues and courts accessible to all sports enthusiasts. Through our platform, you can easily find and book the perfect venue at any time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-[#5B7F3B]">1000+</h3>
                <p className="mt-2 text-gray-600">Venues</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-[#5B7F3B]">50000+</h3>
                <p className="mt-2 text-gray-600">Happy Users</p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-64 md:h-96"
          >
            <img 
              src="public/img/pexels-photo-61143.webp"
              alt="Sports Venue" 
              className="rounded-lg shadow-xl w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Quick Booking",
              description: "Book your favorite venue in less than a minute with simple steps.",
              icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )
            },
            {
              title: "Sports Community",
              description: "Join our sports community and share your experience with others.",
              icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )
            },
            {
              title: "Secure Payment",
              description: "Pay securely using the latest electronic payment methods.",
              icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              )
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-[#5B7F3B] rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Us</h2>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#5B7F3B] text-white px-6 py-3 rounded-lg hover:bg-[#4A6830] transition duration-300"
            >
              Contact Us
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-[#5B7F3B] text-[#5B7F3B] px-6 py-3 rounded-lg hover:bg-[#5B7F3B] hover:text-white transition duration-300"
            >
              FAQ
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
 
    
    </>
  )
}

export default Aboutus