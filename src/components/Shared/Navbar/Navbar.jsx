import Container from "../Container";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import { RiMenuFold2Fill } from "react-icons/ri";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import {
  FaBlog,
  FaDonate,
  FaHandHoldingUsd,
  FaHome,
  FaInfoCircle,
  FaSearch,
  FaTachometerAlt,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="sticky top-0 w-full bg-gradient-to-r from-red-100 via-white to-red-100 z-10 shadow-md">
        {menu && (
          <div className="bg-gradient-to-b from-red-50 to-white text-gray-800 p-6 z-50 fixed top-0 left-0 min-h-screen w-64 shadow-2xl transition-transform duration-300">
            {/* Close Button */}
            <div className="flex justify-end">
              <IoCloseSharp
                onClick={() => setMenu(false)}
                className="text-3xl text-red-500 cursor-pointer hover:text-red-600 transition"
              />
            </div>

            {/* Navigation Links */}
            <nav className="mt-8">
              <div className="flex flex-col gap-6 text-lg font-medium">
                <Link
                  onClick={() => setMenu(false)}
                  to="/"
                  className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition"
                >
                  <FaHome className="text-xl" /> Home
                </Link>

                {user && (
                  <Link
                    onClick={() => setMenu(false)}
                    to="/funding"
                    className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition"
                  >
                    <FaHandHoldingUsd className="text-xl" /> Funding
                  </Link>
                )}

                <Link
                  onClick={() => setMenu(false)}
                  to="/search"
                  className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition"
                >
                  <FaSearch className="text-xl" /> Search
                </Link>

                {user && (
                  <Link
                    onClick={() => setMenu(false)}
                    to="/dashboard"
                    className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition"
                  >
                    <FaTachometerAlt className="text-xl" /> Dashboard
                  </Link>
                )}

                <Link
                  onClick={() => setMenu(false)}
                  to="/blood"
                  className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition"
                >
                  <FaDonate className="text-xl" /> Blood Donation
                </Link>

                <Link
                  onClick={() => setMenu(false)}
                  to="/blogs"
                  className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition"
                >
                  <FaBlog className="text-xl" /> Blogs
                </Link>

                <Link
                  onClick={() => setMenu(false)}
                  to="/about"
                  className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition"
                >
                  <FaInfoCircle className="text-xl" /> About
                </Link>
              </div>
            </nav>
          </div>
        )}

        <div className="py-4 border-b border-red-200">
          <Container>
            <div className="flex  items-center justify-between gap-3 md:gap-0">
              {/* Logo */}
              <Link
                className="text-2xl hidden md:block font-extrabold text-red-500 hover:text-red-600 transition"
                to="/"
              >
                RedRay
              </Link>
              <RiMenuFold2Fill
                onClick={() => setMenu(true)}
                className="block md:hidden font-extrabold text-2xl"
              />
              {/* Navigation Links */}

              <div className=" hidden md:block">
                <div className="flex gap-6 ">
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-red-500 transition font-semibold"
                  >
                    Home
                  </Link>
                  {user && (
                    <Link
                      to="/funding"
                      className="text-gray-700 hover:text-red-500 transition font-semibold"
                    >
                      Funding
                    </Link>
                  )}
                  <Link
                    to="/search"
                    className="text-gray-700 hover:text-red-500 transition font-semibold"
                  >
                    Search
                  </Link>
                  {user && (
                    <Link
                      to="/dashboard"
                      className="text-gray-700 hover:text-red-500 transition font-semibold"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/blood"
                    className="text-gray-700 hover:text-red-500 transition font-semibold"
                  >
                    Blood Donation
                  </Link>
                  <Link
                    to="/blogs"
                    className="text-gray-700 hover:text-red-500 transition font-semibold"
                  >
                    Blogs
                  </Link>
                  <Link
                    to="/about"
                    className="text-gray-700 hover:text-red-500 transition font-semibold"
                  >
                    About
                  </Link>
                </div>
              </div>
              {/* User Actions */}
              {user ? (
                <div className="flex gap-4 items-center">
                  <div className="border-4 h-10 w-10 border-red-300 rounded-full">
                    <img
                      className="rounded-full w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      src={user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                    />
                  </div>
                  <button
                    onClick={logOut}
                    className="px-4 py-2 bg-white text-red-600 rounded-md hover:bg-red-200 transition font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-white text-red-600 rounded-md hover:bg-red-200 transition font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition font-semibold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Navbar;
