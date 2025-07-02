import { useQuery } from "@tanstack/react-query";
import Container from "../../../../components/Shared/Container";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import Pagenaton from "../../Pagenaton";
import { useState } from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  const axiosPublic = useAxiosPublic();
  //   paginaton state
  const [currentPage, setCurrPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);
  //  pagination state end
  const { data, isLoading } = useQuery({
    queryKey: ["myalldonations"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-blogs`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  // paginaton
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data?.slice(firstPostIndex, lastPostIndex);
  //   pagination end
  return (
    <div>
      <Container>
        <h1 className="text-center  mb-4 text-2xl flex justify-center items-center gap-3 font-bold p-4  text-rose-500  rounded-md">
          RedRay Blogs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentPosts.map((d) => (
            <div
              key={d._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48">
                <img
                  src={d?.thumbnail}
                  alt={d?.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h1 className="text-lg font-semibold text-gray-800 mb-2">
                  {d?.title}
                </h1>
                <p
                  className={`text-sm font-medium ${
                    d?.status === "Active" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {d?.status}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  {d?.textContent?.slice(0, 30)}...
                </p>
              </div>
              <div className="px-4 pb-4">
                <Link to={`/blogs/blogsdetails/${d._id}`}>
                  <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Pagenaton
          totalPost={data.length}
          postPerPage={postPerPage}
          setCurrPage={setCurrPage}
        />
      </Container>
    </div>
  );
};

export default Blogs;
