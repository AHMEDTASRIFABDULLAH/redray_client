import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { FaClover } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTimesCircle, FaTrash } from "react-icons/fa";
import useAxiosStatus from "../../../hooks/useAxiosStatus";
import { useState } from "react";
import { format } from "date-fns";

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [status, setStatus] = useState("");
  const [statusId, setStatusId] = useState(null);
  const { data, refetch } = useQuery({
    queryKey: ["mydonations"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/my-donations/${user?.email}`);
      return data;
    },
  });
  console.log(data);
  const handelDelete = async (_id) => {
    console.log(_id);
    try {
      await axiosPublic.delete(`/my-donations/${_id}`);
      toast.success(" Successfully Deleted");
      refetch();
    } catch (error) {
      toast.error(error);
    }
  };
  const newDeletStyle = async (_id) => {
    toast((t) => (
      <div className="flex items-center gap-2">
        <p className="font-bold text-black">Are You sure ?</p>
        <button
          className=" rounded-lg text-white font-bold bg-red-500 py-1 px-2"
          onClick={() => {
            toast.dismiss(t.id);
            handelDelete(_id);
          }}
        >
          Yes
        </button>
        <button
          className=" rounded-md text-white font-bold bg-green-500 py-1 px-2"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>
      </div>
    ));
  };
  const { data: statusdata } = useAxiosStatus(statusId, status);
  if (statusdata?.modifiedCount > 0) {
    refetch();
  }
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="p-4">
        <h1 className="text-center text-2xl flex justify-center items-center gap-3 font-bold p-4 bg-gradient-to-r from-red-100 to-red-200 shadow-md rounded-md">
          <FaClover className="text-green-600 text-3xl" /> Welcome{" "}
          {user?.displayName}
        </h1>
        {data?.length > 0 ? (
          <>
            <div className="overflow-x-auto mt-8">
              <table className="w-full  mx-auto bg-white border border-gray-300 shadow-md rounded-lg">
                <thead className="bg-red-500 text-white text-sm">
                  <tr>
                    <th className="px-3 py-3">change Status</th>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">District</th>
                    <th className="px-3 py-3">Upazila</th>
                    <th className="px-3 py-3">Date</th>
                    <th className="px-3 py-3">Time</th>
                    <th className="px-3 py-3">Blood</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Information</th>
                    <th className="px-3 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((d) => (
                    <tr
                      key={d._id}
                      className="hover:bg-gray-50 text-center text-sm"
                    >
                      <td className="px-3 py-2">
                        {d.status === "pending" ? (
                          <>
                            <p>Wating...</p>
                          </>
                        ) : (
                          <div
                            className="flex flex-col gap-2 pt-1"
                            onClick={() => setStatusId(d._id)}
                          >
                            <button
                              onClick={() => setStatus("done")}
                              className="w-24 btn btn-xs  py-1 bg-green-500 text-white rounded shadow hover:bg-green-600 cursor-pointer"
                            >
                              done
                            </button>
                            <button
                              onClick={() => setStatus("canceled")}
                              className="w-24  py-1 btn btn-xs bg-red-500 text-white rounded shadow hover:bg-red-600 cursor-pointer"
                            >
                              canceled
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-2">{d?.recipientname}</td>
                      <td className="px-3 py-2">{d?.district}</td>
                      <td className="px-3 py-2">{d?.upazila}</td>
                      <td className="px-3 py-2">{format(d?.date, "P")}</td>
                      <td className="px-3 py-2">{d?.time}</td>
                      <td className="px-3 py-2 font-semibold text-red-600">
                        {d?.bloodgroup}
                      </td>
                      <td className="px-3 py-2">
                        <p
                          className={`px-2 py-1 rounded-full text-white ${
                            d?.status === "done"
                              ? "bg-green-500"
                              : d?.status === "canceled"
                              ? "bg-red-500"
                              : "bg-orange-400"
                          }`}
                        >
                          {d?.status}
                        </p>
                      </td>
                      <td className="px-3 py-2">{d?.email}</td>
                      <td className="px-3 py-2 flex flex-col justify-center items-center gap-2">
                        <Link to={`/dashboard/edit/${d._id}`}>
                          <button className="w-24 btn btn-xs  py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-600 cursor-pointer">
                            <FaEdit /> Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => newDeletStyle(d._id)}
                          className="w-24  py-1 btn btn-xs bg-red-500 text-white rounded shadow hover:bg-red-600 cursor-pointer"
                        >
                          <FaTrash /> Delete
                        </button>
                        <Link to={`/dashboard/viewdetails/${d._id}`}>
                          <button className="w-24  py-1 btn btn-xs bg-green-500 text-white rounded shadow hover:bg-green-600 cursor-pointer">
                            <FaEye /> View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-6">
              <Link to="/dashboard/my-request">
                <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                  My All Donation Requests
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-red-500 text-3xl mt-6 bg-red-100 text-center p-4 rounded-lg shadow-md">
            <FaTimesCircle className="inline-block mr-2" /> No data found
          </div>
        )}
      </div>
    </>
  );
};

export default ManageOrders;
