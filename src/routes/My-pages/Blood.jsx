import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import { useState } from "react";
import Pagenaton from "./Pagenaton";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTint,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";
const Blood = () => {
  const axiosPublic = useAxiosPublic();
  //   paginaton state
  const [currentPage, setCurrPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);
  //  pagination state end
  const { data, isLoading } = useQuery({
    queryKey: ["myalldonations"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-donations`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  // paginaton
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);
  //   pagination end
  console.log("Blood page paginatons", currentPosts);
  return (
    <div>
      <Container>
        <h1 className="text-center  mb-4 text-2xl flex justify-center items-center gap-3 font-bold p-4  text-rose-500  rounded-md">
          Blood Request
        </h1>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentPosts.map((d) => (
              <div key={data._id}>
                <div className="bg-white p-1 shadow-lg rounded-lg border hover:shadow-2xl">
                  <img
                    className="h-60 w-full object-cover rounded-t-lg"
                    src={d?.image}
                    alt="Recipient"
                  />
                  <div className="p-4 ">
                    <p className="text-lg font-semibold mb-2">
                      {d?.recipientname}
                    </p>
                    <p className="flex items-center mb-2 text-gray-700">
                      <FaMapMarkerAlt className="mr-2 text-red-500" />{" "}
                      {d?.address}
                    </p>
                    <p className="flex items-center mb-2 text-gray-700">
                      <FaTint className="mr-2 text-red-500" /> Blood Group:{" "}
                      {d?.bloodgroup}
                    </p>
                    <p className="flex  items-center mb-2 text-gray-700">
                      <FaCalendarAlt className="mr-2 text-red-500" /> Date:{" "}
                      {/* {format(new Date(d?.date), "dd/MM/yyyy")} */}
                      {d?.date}
                    </p>
                    <p className="flex items-center mb-2 text-gray-700">
                      <FaClock className="mr-2 text-red-500" /> Time: {d?.time}
                    </p>
                    <p className="flex items-center mb-2 text-gray-700">
                      <FaInfoCircle className="mr-2 text-red-500" />
                      Status: {d?.status}
                    </p>
                    <Link to={`/dashboard/viewdetails/${d._id}`}>
                      <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-red-500 text-lg mt-6 bg-red-100 text-center p-4 rounded-lg shadow-md">
            <FaTimesCircle className="inline-block mr-2" /> No data found
          </div>
        )}
        <Pagenaton
          totalPost={data.length}
          postPerPage={postPerPage}
          setCurrPage={setCurrPage}
        />
      </Container>
    </div>
  );
};

export default Blood;
