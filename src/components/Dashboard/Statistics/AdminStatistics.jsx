import { Calendar } from "react-date-range";
import { FaTint, FaDonate, FaHeartbeat } from "react-icons/fa";

import { FaClover } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const AdminStatistics = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: donors, isLoading } = useQuery({
    queryKey: ["totaldonors"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/total-donors`);
      return data;
    },
  });
  const { data: totalPrice } = useQuery({
    queryKey: ["totalPrice"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/total-price`);
      return data;
    },
  });
  const { data } = useQuery({
    queryKey: ["alldonations"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-blood-donations`);
      return data;
    },
  });
  const { data: users } = useQuery({
    queryKey: ["Allusers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-users`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-center text-3xl flex justify-center items-center gap-3 font-extrabold p-4 bg-gradient-to-r from-red-100 to-red-200 shadow-lg rounded-xl">
        <FaClover className="text-green-600 text-4xl" />
        Welcome {user?.displayName}
      </h1>
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Total Revenue */}
          <div className="relative flex flex-col bg-white text-gray-700 shadow-lg rounded-xl">
            <div className="mx-4 rounded-xl bg-gradient-to-tr from-orange-400 to-orange-600 shadow-lg absolute -mt-6 grid h-16 w-16 place-items-center">
              <FaDonate className="text-white text-3xl" />
            </div>
            <div className="p-6 text-right">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <h4 className="text-2xl font-extrabold text-gray-900">
                {totalPrice?.map((price) => (
                  <span key={price._id}>${price?.totalPrice}</span>
                ))}
              </h4>
            </div>
          </div>

          {/* Total Donors */}
          <div className="relative flex flex-col bg-white text-gray-700 shadow-lg rounded-xl">
            <div className="mx-4 rounded-xl bg-gradient-to-tr from-red-400 to-red-600 shadow-lg absolute -mt-6 grid h-16 w-16 place-items-center">
              <FaTint className="text-white text-3xl" />
            </div>
            <div className="p-6 text-right">
              <p className="text-sm font-medium text-gray-600">Total Donors</p>
              <h4 className="text-2xl font-extrabold text-gray-900">
                {donors?.length}
              </h4>
            </div>
          </div>

          {/* Total Blood Requests */}
          <div className="relative flex flex-col bg-white text-gray-700 shadow-lg rounded-xl">
            <div className="mx-4 rounded-xl bg-gradient-to-tr from-pink-400 to-pink-600 shadow-lg absolute -mt-6 grid h-16 w-16 place-items-center">
              <FaHeartbeat className="text-white text-3xl" />
            </div>
            <div className="p-6 text-right">
              <p className="text-sm font-medium text-gray-600">
                Total Blood Requests
              </p>
              <h4 className="text-2xl font-extrabold text-gray-900">
                {data?.length}
              </h4>
            </div>
          </div>

          {/* Total Users */}
          <div className="relative flex flex-col bg-white text-gray-700 shadow-lg rounded-xl">
            <div className="mx-4 rounded-xl bg-gradient-to-tr from-green-400 to-green-600 shadow-lg absolute -mt-6 grid h-16 w-16 place-items-center">
              <FaTint className="text-white text-3xl" />
            </div>
            <div className="p-6 text-right">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <h4 className="text-2xl font-extrabold text-gray-900">
                {users?.length}
              </h4>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* Sales Bar Chart Placeholder */}
          <div className="relative flex flex-col bg-white text-gray-700 shadow-lg rounded-xl xl:col-span-2">
            {/* Insert Chart Here */}
          </div>

          {/* Calendar */}
          <div className="relative flex flex-col bg-white text-gray-700 shadow-lg rounded-xl">
            <Calendar className="p-4" color="#4cc718" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
