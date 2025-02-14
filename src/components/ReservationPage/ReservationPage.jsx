import React, { useState } from 'react';
import { MapPin,  Heart, ChevronLeft, ChevronRight, ExternalLink, } from 'lucide-react';
import { useDispatch,useSelector } from 'react-redux';
// import { fetchStadiums ,fetchselectedCourt} from '../../redux/StaduimsSlice';
import {addToWishlist} from '../../redux/wishlistSlice';
import Swal from "sweetalert2";
import Bookingcard from './bookingcard';



const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState(24);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const selectedStadium=useSelector((state)=>state.courtInfo.selectedCourt);
  const dispatch=useDispatch();

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
  function saveTime(time){
     setSelectedDuration(time);
     console.log(selectedDuration);
  }
  function saveDate(date){
    setSelectedDate(date);
    console.log(selectedDate);
  }
  function addToSavedItems(){
    dispatch(addToWishlist(selectedStadium));
       Swal.fire({
            icon: "success",
            title: "Succesfull!",
            text: "Your item is added to your saved list.",
          });
  }

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
          <button className="flex items-center px-4 py-2 rounded-md border border-[#A9C46C] text-[#5D8736] hover:bg-[#A9C46C]/10" onClick={addToSavedItems}>
            <Heart size={18} className="mr-2" />
            Save
          </button>
          
        </div>
      </div>

      {/* Stadium Info */}
      <div className="grid grid-cols-10 gap-8 mb-8">
        <div className="col-span-6">
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

           {/* Booking Section  اضافه كارد للحجز */}
           <div className="bg-white rounded-lg  shadow-sm  col-span-4"> 
<Bookingcard/>
        </div>
      </div>
      <div className="mb-12">
    <h3 className="text-lg font-semibold mb-4">Stadium Tour</h3>
    <div className="relative rounded-lg overflow-hidden h-[400px] bg-gray-100">
      <iframe
        className="w-full h-full absolute top-0 left-0"
        src="https://www.youtube.com/embed/9h0EErTCNE8?si=Qqxwyw2bruesBsU9" // Replace YOUR_VIDEO_ID with actual YouTube video ID
        title="Stadium Tour"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    
   
    </div>
    <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
      <h4 className="font-medium mb-2">About this video</h4>
      <p className="text-gray-600 text-sm">
        Take a virtual tour of our state-of-the-art stadium facilities. This video showcases our premium courts, 
        amenities, and the overall atmosphere you can expect during your visit.
      </p>
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