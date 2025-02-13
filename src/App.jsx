import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/Home/Home";
// import Aboutus from "./components/AboutUs/Aboutus";
// import SignUp from "./components/SignUp/SignUp"
import LoginPage from "./components/LogIn/Login";
import SignUp from "./components/SignUp/SignUp";
import ForgotPassword from "./components/LogIn/ForgotPassword";
import LoginLord from "./components/LoginLord/LoginLord";
import Stadiums from "./components/Stadiums/Stadiums";
import Reservation from "./components/ReservationPage/ReservationPage";
import Contactus from "./components/ContactUs/Contactus";
import Wishlist from "./components/Wishlist/Wishlist";
import SignUpLandlord from "./components/LoginLord/SignUpLord";
import Aboutus from "./components/AboutUs/Aboutus";

import UserProfile from "./components/UserProfile/UserProfile";
import Logout from "./components/Logout";

import AdminDashboard from "./components/DashboardAdmin/AdminDashboard";
// import PropertyManagement from "./components/LandlordPanel/PropertyManagement";
import LandDashboard from "./components/LandlordPanel/LandDashboard";

function App() {
  return (
    // <Router>
    //   <Navbar />
    //   <Routes>
    //     <Route path="/" element = {<Home />}></Route>
    //     <Route path="/aboutUs" element = {<Aboutus />}></Route>
    //     <Route path="/contactUs" element = {<Contactus />}></Route>
    //   </Routes>
    //   <Footer />
    // </Router>
    // <LoginPage/>
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Aboutus" element={<Aboutus />}></Route>
        <Route path="/SignUpLord" element={<SignUpLandlord />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/LoginLord" element={<LoginLord />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/stadiums" element={<Stadiums />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        <Route path="/LandDashboard/*" element={<LandDashboard />} />
        {/* <Routes path="/PropertyManagement" element={<PropertyManagement />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
