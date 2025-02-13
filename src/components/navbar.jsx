import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#5B7F3B] p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-white font-bold text-lg"
        >
          <img
            src="/img/Logo.png"
            alt="Logo"
            className="w-20 h-20 object-contain"
          />
          Soccer Co.
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li>
            <Link to="/" className="hover:text-gray-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Aboutus" className="hover:text-gray-300 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/stadiums" className="hover:text-gray-300 transition">
              Stadiums
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Buttons + "For Owners" Link */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/login">
            <button className="bg-[#A3C178] text-[#334D19] px-5 py-2 rounded-lg hover:bg-[#89A15E] transition cursor-pointer">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-[#DDEEB2] text-[#334D19] px-5 py-2 rounded-lg hover:bg-[#C5D994] transition cursor-pointer">
              Sign up
            </button>
          </Link>
          <Link
            to="/SignUpLord"
            className="text-white font-medium hover:text-gray-300 transition"
          >
            For Owners
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#6B8E3B] mt-2 p-4 space-y-4 text-center">
          <Link to="/" className="block text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="block text-white hover:text-gray-300">
            About
          </Link>
          <Link to="/stadiums" className="block text-white hover:text-gray-300">
            Stadiums
          </Link>
          <Link to="/contact" className="block text-white hover:text-gray-300">
            Contact
          </Link>
          <Link to="/login">
            <button className="bg-[#A3C178] text-[#334D19] w-full px-5 py-2 rounded-lg hover:bg-[#89A15E] transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-[#DDEEB2] text-[#334D19] w-full px-5 py-2 rounded-lg hover:bg-[#C5D994] transition">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
