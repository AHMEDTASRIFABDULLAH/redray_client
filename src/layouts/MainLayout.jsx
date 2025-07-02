import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className=" min-h-[calc(100vh-68px)] bg-gradient-to-r from-red-50 to-white">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
