import { useQuery } from "@tanstack/react-query";
import Container from "../../../../components/Shared/Container";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { FaArrowLeft, FaCircle } from "react-icons/fa";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";

const BlogsDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/blogs-details/${id}`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <Container>
        <div className="py-8  flex justify-center">
          <div className="bg-white w-full md:w-1/2 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:scale-105">
            {/* Image */}
            <div className="h-56 sm:h-64 md:h-72 lg:h-80 w-full relative">
              <img
                src={data?.thumbnail}
                alt={data?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 hover:text-red-500 transition-colors duration-300">
                {data?.title}
              </h1>

              {/* Status */}
              <div className="flex items-center gap-2">
                <FaCircle
                  className={`text-xs ${
                    data?.status === "Active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                />
                <span
                  className={`text-sm font-semibold ${
                    data?.status === "Active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {data?.status}
                </span>
              </div>

              {/* Content */}
              <p className="text-gray-700 text-lg leading-relaxed">
                {data?.textContent}
              </p>

              {/* Back to Home Button */}
              <div className="mt-6">
                <Link to={`/`}>
                  <button className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 focus:outline-none">
                    <FaArrowLeft className="text-xl" /> Back to Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogsDetails;
