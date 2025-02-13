import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/sliceAuth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser());
    setTimeout(() => {
      navigate("/login");
    }, 2000); // Redirect after 2 seconds
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Logging out...</h2>
        <p className="text-gray-600 mt-2">You will be redirected to login.</p>
      </div>
    </div>
  );
};

export default Logout;
