import { FaFacebookF, FaHeart, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-100 via-white to-red-100 text-gray-700 py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:underline">Become a Donor</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Branding
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                Design
              </Link>
            </li>
            <li>
              <Link className="hover:underline"> Marketing</Link>
            </li>
          </ul>
        </div>
        {/* Useful Links */}

        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <p className="text-sm">
            We are dedicated to saving lives by connecting blood donors with
            those in need. Join us in making a difference in the community.
          </p>
        </div>
        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-gray-700 hover:text-gray-500 text-2xl">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-500 text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-500 text-2xl">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="md:mt-20 mt-8  text-center text-sm text-gray-600 border">
        <p>
          Made with <FaHeart className="inline text-red-400" /> by Blood
          Donation Community. © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
