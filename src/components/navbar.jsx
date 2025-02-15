import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, UserCircle, Heart, LogOut } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user); // Get user from Redux

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
          Sport Co.
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li>
            <Link to="/" className="hover:text-gray-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="hover:text-gray-300 transition">
              About Us
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

        {/* Buttons + Wishlist + Profile + Logout Icons */}
        <div className="hidden md:flex items-center space-x-6">
          {!user ? (
            <>
              <Link to="/login">
                <button className="bg-[#A3C178] text-[#334D19] px-5 py-2 rounded-lg hover:bg-[#89A15E] transition cursor-pointer">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-[#DDEEB2] text-[#334D19] px-5 py-2 rounded-lg hover:bg-[#C5D994] transition cursor-pointer">
                  Sign up
                </button>
              </Link>{" "}
              {/* Show For Stadium Owners, Login & Signup if NOT logged in */}
              <Link to="/SignUpLord">
                <button className=" text-[#f7f7f7] hover:text-[#334D19] px-5 py-2 rounded-lg hover:bg-[#bbff84] transition cursor-pointer">
                  For Stadium Owners
                </button>
              </Link>
            </>
          ) : (
            <div className="flex space-x-4">
              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="text-white hover:text-gray-300 transition"
              >
                <Heart size={28} />
              </Link>
              {/* User Profile Icon */}
              <Link
                to="/UserProfile"
                className="text-white hover:text-gray-300 transition"
              >
                <UserCircle size={32} />
              </Link>
              {/* Logout Button */}
              <Link
                to="/logout"
                className="text-white hover:text-gray-300 transition"
              >
                <LogOut size={28} />
              </Link>
            </div>
          )}
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
          <Link to="/aboutus" className="block text-white hover:text-gray-300">
            About Us
          </Link>
          <Link to="/stadiums" className="block text-white hover:text-gray-300">
            Stadiums
          </Link>
          <Link to="/contact" className="block text-white hover:text-gray-300">
            Contact
          </Link>

          {!user ? (
            <>
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
            </>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="text-white hover:text-gray-300 transition flex items-center space-x-2"
              >
                <Heart size={28} />
                <span>Wishlist</span>
              </Link>
              {/* User Profile Icon */}
              <Link
                to="/UserProfile"
                className="text-white hover:text-gray-300 transition flex items-center space-x-2"
              >
                <UserCircle size={32} />
                <span>Profile</span>
              </Link>
              {/* Logout Button */}
              <Link
                to="/logout"
                className="text-white hover:text-gray-300 transition flex items-center space-x-2"
              >
                <LogOut size={28} />
                <span>Logout</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
