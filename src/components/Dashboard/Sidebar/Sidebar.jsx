import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import MenuItem from "./Menu/MenuItem";
import useAuth from "../../../hooks/useAuth";
import AdminMenu from "./Menu/AdminMenu";
import { Link } from "react-router-dom";
import SellerMenu from "./Menu/SellerMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import { BiHome } from "react-icons/bi";
import { FaTint } from "react-icons/fa";
import useAdmin from "../../../hooks/useAdmin";
import { FaConnectdevelop } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [isAdmin] = useAdmin();

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gradient-to-r from-red-100 via-white to-red-100 text-gray-800 flex justify-between md:hidden shadow-md">
        <div className="block cursor-pointer p-4 font-bold">
          <Link className="text-2xl text-red-500 font-extrabold" to="/">
            RedRay
          </Link>
        </div>
        <button
          onClick={handleToggle}
          className="p-4 focus:outline-none focus:bg-red-200 hover:bg-red-200 rounded-md transition"
        >
          <AiOutlineBars className="h-6 w-6 text-red-500" />
        </button>
      </div>

      {/* Sidebar */}
      <div>
        <div
          className={`z-20 md:fixed flex flex-col justify-between bg-white shadow-xl w-64 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform ${
            isActive ? "-translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div>
            <div className="hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-red-50">
              <Link to="/">
                <h1 className="text-2xl font-extrabold text-red-500">RedRay</h1>
              </Link>
            </div>
            <div className="flex justify-end">
              <IoCloseSharp
                onClick={handleToggle}
                className=" block md:hidden text-2xl text-red-500"
              />
            </div>
            {/* Nav Items */}
            <nav className="mt-8 space-y-2">
              <CustomerMenu />
              <SellerMenu />

              {isAdmin === "admin" || isAdmin === "volunteer" ? (
                <AdminMenu />
              ) : (
                <MenuItem
                  setActive={setActive}
                  icon={BiHome}
                  label="Home"
                  address="/dashboard"
                />
              )}

              {(isAdmin === "admin" || isAdmin === "volunteer") && (
                <>
                  <MenuItem
                    icon={FaTint}
                    label="Blood Request"
                    address="/dashboard/bloodrequest"
                  />
                  <MenuItem
                    icon={FaConnectdevelop}
                    label="Content"
                    address="/dashboard/content-manage"
                  />
                </>
              )}
            </nav>
          </div>

          <div>
            <hr className="my-4 border-gray-300" />
            <MenuItem
              icon={FcSettings}
              label="Profile"
              address="/dashboard/profile"
            />
            <button
              onClick={logOut}
              className="flex w-full items-center px-4 py-2 mt-4 text-gray-700 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
            >
              <GrLogout className="w-5 h-5 text-red-500" />
              <span className="ml-3 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
