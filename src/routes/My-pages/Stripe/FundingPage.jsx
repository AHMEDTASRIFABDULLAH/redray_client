import Container from "../../../components/Shared/Container";
import { FaDollarSign, FaHandHoldingUsd } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const FundingPage = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["funding"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-bonation-payments`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="pt-6">
      <Container>
        <div className=" flex flex-col  sm:flex-row justify-between items-center sm:items-start px-6 py-6 bg-gradient-to-r from-red-100 to-red-200 shadow-lg rounded-lg   ">
          <h1 className="text-center sm:text-left text-2xl sm:text-3xl text-gray-800 font-extrabold leading-tight flex items-center gap-3 mb-4 sm:mb-0">
            <FaHandHoldingUsd className="text-red-500 text-3xl" />
            Donate to support the website
          </h1>

          <Link to="/dashboard/paymentcart">
            <button className="w-full flex justify-center items-center gap-1 sm:w-auto bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <FaDollarSign /> Give Funding
            </button>
          </Link>
        </div>
        {/* table  */}
        <div className="overflow-x-auto mt-5">
          <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Fund Amount ($)</th>
                <th className="px-4 py-2 text-left">Funding Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 even:bg-gray-50 transition-all"
                >
                  <td className="px-4 py-3">{item?.name}</td>
                  <td className="px-4 py-3">${item?.price}</td>
                  <td className="px-4 py-3">
                    {format(new Date(item.date), "dd/MM/yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default FundingPage;
