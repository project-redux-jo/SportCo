import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const BookingComponent = () => {
  const [selectedDuration, setSelectedDuration] = useState('90');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const timeSlots = [
    { time: '12:00 AM', price: '25 JD' },
    { time: '12:30 AM', price: '25 JD' },
    { time: '01:00 AM', price: '25 JD' },
    { time: '01:30 AM', price: '25 JD' },
    { time: '01:00 PM', price: '25 JD' },
    { time: '01:30 PM', price: '25 JD' },
    { time: '02:00 PM', price: '25 JD' },
    { time: '02:30 PM', price: '25 JD' },
  ];

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  return (
    
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg  ">
         <h2 className="text-lg text-center font-bold mb-4">Reservation Details</h2>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Select a Date</h3>
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handlePrevDay}
            className="text-green-600 flex items-center"
          >
            <ChevronLeft className="w-5 h-5" />
            Past day
          </button>
          
          <span className="text-green-600 font-medium">
            {formatDate(selectedDate)}
          </span>

          <button
            onClick={handleNextDay}
            className="text-gray-600 flex items-center"
          >
            Next day
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <h3 className="text-lg font-medium">Duration</h3>
          <button
            className={`px-6 py-2 rounded-md ${
              selectedDuration === '90'
                ? 'bg-green-600 text-white'
                : 'border border-green-600 text-green-600'
            }`}
            onClick={() => setSelectedDuration('90')}
          >
            90 Mins
          </button>
          <button
            className={`px-6 py-2 rounded-md ${
              selectedDuration === '120'
                ? 'bg-green-600 text-white'
                : 'border border-green-600 text-green-600'
            }`}
            onClick={() => setSelectedDuration('120')}
          >
            120 Mins
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Pitch 1 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              ⚽
            </div>
            <span className="text-green-600 font-medium">7 V 7</span>
            <span className="font-medium">Pitch 1</span>
          </div>

          <div className="space-y-4">
            <h4 className="text-gray-600">Morning Slots</h4>
            <div className="grid grid-cols-1 gap-4">
              {timeSlots.slice(0, 4).map((slot, index) => (
                <button
                  key={index}
                  className="p-4 border rounded-lg hover:border-green-600 text-center"
                >
                  <div className="font-medium">{slot.time}</div>
                  <div className="text-gray-600">{slot.price}</div>
                </button>
              ))}
            </div>

            <h4 className="text-gray-600">Evening slots</h4>
            <div className="grid grid-cols-1 gap-4">
              {timeSlots.slice(4).map((slot, index) => (
                <button
                  key={index}
                  className="p-4 border rounded-lg hover:border-green-600 text-center"
                >
                  <div className="font-medium">{slot.time}</div>
                  <div className="text-gray-600">{slot.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pitch 2 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              ⚽
            </div>
            <span className="text-green-600 font-medium">7 V 7</span>
            <span className="font-medium">Pitch 2</span>
          </div>

          <div className="space-y-4">
            <h4 className="text-gray-600">Morning Slots</h4>
            <div className="grid grid-cols-1 gap-4">
              {timeSlots.slice(0, 4).map((slot, index) => (
                <button
                  key={index}
                  className="p-4 border rounded-lg hover:border-green-600 text-center"
                >
                  <div className="font-medium">{slot.time}</div>
                  <div className="text-gray-600">{slot.price}</div>
                </button>
              ))}
            </div>

            <h4 className="text-gray-600">Evening slots</h4>
            <div className="grid grid-cols-1 gap-4">
              {timeSlots.slice(4).map((slot, index) => (
                <button
                  key={index}
                  className="p-4 border rounded-lg hover:border-green-600 text-center"
                >
                  <div className="font-medium">{slot.time}</div>
                  <div className="text-gray-600">{slot.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingComponent;