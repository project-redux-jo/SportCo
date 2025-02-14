import React, { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Calendar, Clock } from 'lucide-react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchStadiums ,fetchselectedCourt} from '../../redux/StaduimsSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Stadiums = () => {
  const url = 'https://redux-project-791e5-default-rtdb.firebaseio.com/Stadiums.json';
  const [stadiums, setStadiums] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [availability, setSelectedAvailability] = useState('All');
  const FinalStadiums=useSelector((state)=>state.courtInfo.courts);
  const selectedStadium=useSelector((state)=>state.courtInfo.selectedCourt);
const dispatch=useDispatch();



    useEffect(() => {
    async function getData() {
     
        const response = await axios.get(url);
        const data = response.data;
        const sentData=[];
        // console.log(data);
        const Stadiums_array=Object.values(data);
      
        Stadiums_array.map((d)=>{
if(d.status==="Approved"){
  sentData.push(d);
}
        })
        dispatch(fetchStadiums(sentData));
     
    }
    getData();
  }, [FinalStadiums]);
  function getStadiumData(stadium){
dispatch(fetchselectedCourt(stadium))

////////////// محمود ضافها
// useEffect(() => {
//   async function getData() {
//       try {
//           const response = await axios.get(url);
//           const data = response.data;

//           if (data) {
//               const Stadiums_array = Object.values(data);
//               dispatch(fetchStadiums(Stadiums_array));
//           }
//       } catch (error) {
//           console.error(" فشل تحميل البيانات من Firebase:", error);
//       }
//   }

//   getData();
// }, [FinalStadiums]);




  }
// console.log(FinalStadiums);
// console.log(selectedStadium);


  const locations = ['All', ...new Set(FinalStadiums.map(stadium => stadium.location))];
  const ava = ['All', ...new Set(FinalStadiums.map(stadium => stadium.available))];

  const filteredStadiums = FinalStadiums.filter(stadium => {
    // const matchesSearch = stadium.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearch = typeof stadium?.name === "string" && stadium.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = selectedLocation === 'All' || stadium.location === selectedLocation;
    const matchesPriceRange = priceRange === 'All' || 
      (priceRange === '0-20' && stadium.price <= 20) ||
      (priceRange === '20-40' && stadium.price > 20 && stadium.price <= 40) ||
      (priceRange === '40+' && stadium.price > 40);
    const availabile = availability === 'All' || stadium.available === availability;
    
    return matchesSearch && matchesLocation && matchesPriceRange && availabile;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Stadium</h1>
          <p className="mt-2 text-gray-600">Browse and book available stadiums in your area</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative pt-5">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " size={20} />
              <input
                type="text"
                placeholder="Search stadiums..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
              <select
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <label className="block text-sm font-medium text-gray-700">
            Price Range
          </label>
              <select
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="All">All Prices</option>
                <option value="0-20">$0 - $20/hr</option>
                <option value="20-40">$20 - $40/hr</option>
                <option value="40+">$40+/hr</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <label className="block text-sm font-medium text-gray-700">
            Availability
          </label>
              <select
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500"
                value={availability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
              >
                {ava.map(av => (
                  <option key={av} value={av}>{av}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stadium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStadiums.map(stadium => (
            <div key={stadium.id} className="group bg-white rounded-2xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
              {/* Image Container */}
             
              <div className="relative h-64 overflow-hidden">
                <div className="w-full h-full transform transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={stadium.image}
                    alt={stadium.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#686D76]/90 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{stadium.name}</h3>
                  <div className="flex items-center gap-2 text-white/90">
                    <MapPin size={16} />
                    <span className="text-sm">{stadium.location}</span>
                  </div>
                </div>
              </div>
             

              {/* Content Container */}
              <div className="p-6">
                {/* Price and Availability Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{stadium.available}</span>
                  </div>
                  <div className="bg-[#E1F0DA] px-4 py-2 rounded-lg">
                    <span className="text-xl font-bold text-[#5D8736]">${stadium.price}</span>
                    <span className="text-sm font-normal text-[#809D3C]">/hr</span>
                  </div>
                </div>

                {/* Features/Amenities */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-900">
                    <Calendar size={18} className="text-gray-400" />
                    <span className="text-sm">Available 7 days a week</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Clock size={18} className="text-gray-400" />
                    <span className="text-sm">Flexible booking hours</span>
                  </div>
                </div>

                {/* Book Now Button */}
                <Link to={"/reservation"}>
                <button className="w-full bg-[#5D8736] text-white py-3 rounded-xl font-semibold 
                                 transition-all duration-300 hover:bg-[#809D3C]
                                 focus:ring-4 focus:ring-[#A9C46C]/ cursor-pointer"
                                 onClick={() => { getStadiumData(stadium) }}>
                  Book Now
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {FinalStadiums.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl">No stadiums found matching your criteria</div>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stadiums;