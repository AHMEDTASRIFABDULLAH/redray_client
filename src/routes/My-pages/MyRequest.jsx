import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaClover } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaEdit, FaEye, FaTimesCircle, FaTrash } from "react-icons/fa";
import { useState } from "react";
import useAxiosStatus from "../../hooks/useAxiosStatus";
import Pagenaton from "./Pagenaton";
import { format } from "date-fns";

const MyRequest = () => {
  const timeZone = "Asia/Dhaka";
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [status, setStatus] = useState("");
  const [statusId, setStatusId] = useState(null);
  const [sort, setSort] = useState("");
  //   paginaton state
  const [currentPage, setCurrPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);
  //  pagination state end
  console.log(status, statusId);

  const { data, refetch } = useQuery({
    queryKey: ["myalldonations", sort],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/my-all-donations/${user?.email}?sort=${sort}`
      );
      return data;
    },
  });
  const handelDelete = async (_id) => {
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
  // paginaton
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data?.slice(firstPostIndex, lastPostIndex);
  //   pagination end
  return (
    <>
      <div className="p-4">
        <h1 className="text-center text-2xl flex justify-center items-center gap-3 font-bold p-4 bg-gradient-to-r from-red-100 to-red-200 shadow-md rounded-md">
          <FaClover className="text-green-600 text-3xl" /> My Donation Requests
        </h1>
        <div className=" my-6 ">
          <select
            name="sort"
            id="sort"
            className="border p-4 rounded-md shadow-md "
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By Status</option>
            <option value="pending">pending</option>
            <option value="done">done</option>
            <option value="canceled">canceled</option>
            <option value="inprogress">inprogress</option>
          </select>
        </div>
        {currentPosts?.length > 0 ? (
          <div className="overflow-x-auto mt-8">
            <table className="w-full  mx-auto bg-white border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-red-500 text-white text-sm ">
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
                {currentPosts?.map((d) => (
                  <tr
                    key={d._id}
                    className="hover:bg-gray-50 text-center text-sm border-b"
                  >
                    <td className="px-3 py-2">
                      {d.status === "pending" ? (
                        <>
                          <p>Wating....</p>
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
                    <td className="px-3 py-2">
                      {" "}
                      {format(new Date(d?.date), "dd/MM/yyyy")}
                    </td>
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
                    <td className="px-3 py-2 ">{d?.email}</td>

                    <td className="px-3 py-2 flex flex-col justify-center items-center gap-2">
                      <Link to={`/dashboard/edit/${d._id}`}>
                        <button className="w-24 btn btn-xs  py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-600 cursor-pointer">
                          <FaEdit /> Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => newDeletStyle(d._id)}
                        className="w-24 flex btn btn-xs items-center justify-center gap-1 px-3 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600"
                      >
                        <FaTrash /> Delete
                      </button>
                      <Link to={`/dashboard/viewdetails/${d._id}`}>
                        <button className="w-24 btn btn-xs flex items-center justify-center gap-1 px-3 py-1 bg-green-500 text-white rounded shadow hover:bg-green-600">
                          <FaEye /> View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagenaton
              totalPost={data.length}
              postPerPage={postPerPage}
              setCurrPage={setCurrPage}
            />
          </div>
        ) : (
          <div className="text-red-500 text-lg mt-6 bg-red-100 text-center p-4 rounded-lg shadow-md">
            <FaTimesCircle className="inline-block mr-2" /> No data found
          </div>
        )}
      </div>
    </>
  );
};

export default MyRequest;
