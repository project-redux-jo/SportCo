import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Share2, Heart, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchStadiums ,fetchselectedCourt} from '../../redux/StaduimsSlice';

const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState(24);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const selectedStadium=useSelector((state)=>state.courtInfo.selectedCourt);
  

  // Sample images array - replace with your actual images
  const images = [
    selectedStadium.image,
    'public/img/christian-moller-gO4Wi9srUv8-unsplash.jpg',
    'public/img/clarence-e-hsu-iFy6Nx6-mRQ-unsplash.jpg',
    'public/img/imagelogin.png'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{selectedStadium.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center">
              <span className="text-[#5D8736] font-bold">★ 4.8</span>
              <span className="text-gray-600 ml-1">(17 Reviews)</span>
            </div>
            <div className="flex items-center text-[#5D8736]">
              <MapPin size={16} className="mr-1" />
              <span>{selectedStadium.location}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 rounded-md border border-[#A9C46C] text-[#5D8736] hover:bg-[#A9C46C]/10">
            <Heart size={18} className="mr-2" />
            Save
          </button>
          <button className="flex items-center px-4 py-2 rounded-md border border-[#A9C46C] text-[#5D8736] hover:bg-[#A9C46C]/10">
            <Share2 size={18} className="mr-2" />
            Share
          </button>
        </div>
      </div>

      {/* Stadium Info */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h2 className="font-semibold">{selectedStadium.name}</h2>
              <p className="text-sm text-gray-600">On SportCo Since Feb 2023</p>
            </div>
            {/* <WhatsApp className="ml-auto text-[#5D8736]" size={24} /> */}
          </div>

          <div className="flex gap-6 text-sm text-gray-600 mb-4">
        
            <div>
              <span className="font-semibold text-gray-800">Venue Type:</span> Outdoor
            </div>
            <div>
              <span className="font-semibold text-gray-800">Opening Hours:</span> 04:00 PM - 04:00 AM
            </div>
          </div>

          {/* Image Slider */}
          <div className="relative rounded-lg overflow-hidden h-[400px] bg-gray-100">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Stadium view ${index + 1}`}
                className={`absolute w-full h-full object-cover transition-opacity duration-300 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Book a Field on Private Padel Area</h3>
          <p className="text-gray-600 mb-6">Select date and duration to show available slots</p>

          {/* Calendar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">February 2025</h4>
              <div className="flex gap-2">
                <button className="p-1 rounded hover:bg-gray-100">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-sm font-medium py-2">{day}</div>
              ))}
              {Array(31).fill(null).map((_, i) => (
                <button
                  key={i}
                  className={`py-2 rounded-full text-sm
                    ${selectedDate === i + 1 ? 'bg-[#5D8736] text-white' : 'hover:bg-[#A9C46C]/10'}
                  `}
                  onClick={() => setSelectedDate(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selection */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Match Duration</h4>
            <div className="flex gap-3">
              {[60, 90, 120].map(duration => (
                <button
                  key={duration}
                  className={`flex-1 py-2 rounded-md text-sm border
                    ${selectedDuration === duration 
                      ? 'bg-[#5D8736] text-white border-[#5D8736]' 
                      : 'border-[#A9C46C] text-[#5D8736] hover:bg-[#A9C46C]/10'}
                  `}
                  onClick={() => setSelectedDuration(duration)}
                >
                  {duration} Mins
                </button>
              ))}
            </div>
          </div>

          <button className="w-full py-3 bg-[#A9C46C] text-white rounded-md hover:bg-[#5D8736] transition-colors">
            SHOW AVAILABLE SLOTS
          </button>
        </div>
      </div>

      {/* Location Section with Embedded Map */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Stadium Location</h3>
        <div className="h-[300px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13520.757186793946!2d36.08463895472782!3d32.09116923332071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b7003e2d66907%3A0xaa93aa6eca2e58b8!2sNew%20Zarqa%2C%20Zarqa!5e0!3m2!1sen!2sjo!4v1739300970770!5m2!1sen!2sjo"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-4 bg-white p-3 rounded-lg shadow-sm">
          <p className="font-medium mb-1">21°49'14.6"N 39°04'59.5"E</p>
          <p className="text-sm text-gray-600 mb-2">R5CM+77M Al Sawari, Jeddah Saudi Arabia</p>
          <a 
            href="#" 
            className="text-[#5D8736] text-sm flex items-center hover:underline"
          >
            <ExternalLink size={14} className="mr-1" />
            View larger map
          </a>
        </div>
      </div>
    </div>
  );
};

export default Reservation;