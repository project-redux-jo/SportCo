import React, { useState } from 'react';
import Calendar from "./Calendar";
import BookingComponent from './Bookinginfo';

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg relative w-full max-w-5xl max-h-[90vh] flex flex-col">
        <button 
          onClick={onClose} 
          className="absolute top-3 right-20 text-gray-500 hover:text-gray-800 z-10"
          
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
}


const Bookingcard = () => {
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const durations = [
    { value: 45, label: "45 min" },
    { value: 90, label: "1.5 hours" },
  ];

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-2">Book a Field</h1>
      <p className="text-gray-500 mb-6">Select date and duration to show available slots</p>
      
      <div className="mb-6">
      <Calendar/>
        <div className="space-y-4">
          <h3 className="font-medium">Match Duration</h3>
          <div className="flex gap-4">
            {durations.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSelectedDuration(value)}
                className={`
                  flex-1 py-2 px-4 rounded
                  ${selectedDuration === value 
                    ? 'bg-green-600 text-white' 
                    : 'border border-green-600 text-green-600'}
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
     onClick={() => setIsOpen(true)}       
     className="w-full mt-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          SHOW AVAILABLE SLOTS
        </button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <BookingComponent/>
  </Modal>

      </div>
    </div>
  );
};

export default Bookingcard;
