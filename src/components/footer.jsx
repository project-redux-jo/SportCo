import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-50 text-center text-surface/75 dark:bg-neutral-700 dark:text-white/75 lg:text-left">
      {/* Social Media Section */}
      <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-white/10 lg:justify-between">
        {/* Social Icons */}
        <div className="flex justify-center space-x-6">
          <a
            href="#!"
            className="text-gray-600 dark:text-white hover:text-gray-800"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#!"
            className="text-gray-600 dark:text-white hover:text-gray-800"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#!"
            className="text-gray-600 dark:text-white hover:text-gray-800"
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            href="#!"
            className="text-gray-600 dark:text-white hover:text-gray-800"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#!"
            className="text-gray-600 dark:text-white hover:text-gray-800"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="#!"
            className="text-gray-600 dark:text-white hover:text-gray-800"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Our Company
            </h6>
            <p>
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          {/* Products Section */}
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Fields
            </h6>
            <p className="mb-4">
              <Link to="#">Soccer</Link>
            </p>
            <p className="mb-4">
              <Link to="#">BasketBall</Link>
            </p>
            <p className="mb-4">
              <Link to="#">Padel</Link>
            </p>
            <p>
              <Link to="#">Volley Ball</Link>
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Useful links
            </h6>
            <p className="mb-4">
              <Link to="#">Pricing</Link>
            </p>
            <p className="mb-4">
              <Link to="#">Settings</Link>
            </p>
            <p className="mb-4">
              <Link to="#">Orders</Link>
            </p>
            <p>
              <Link to="#">Help</Link>
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <i className="fas fa-home mr-2"></i>Zarqa, Jordan
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <i className="fas fa-envelope mr-2"></i> info@soccerco.com
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <i className="fas fa-phone mr-2"></i> + 962 7 9698 1362
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <i className="fas fa-print mr-2"></i> + 962 7 8750 7215
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black/5 p-6 text-center">
        <span>© 2025 Copyright:</span>
        <a className="font-semibold" href="">
          Soccer Co.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
