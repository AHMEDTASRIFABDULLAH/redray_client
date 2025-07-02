import { useState } from "react";
import Container from "../../../components/Shared/Container";
import { FaSearch } from "react-icons/fa";
import useDistrict from "../../../hooks/useDistrict";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Search = () => {
  const [bloodgroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { district: districtOptions, upazila: upazilaOptions } = useDistrict();
  const axiosPublic = useAxiosPublic();

  const { data: donors = [] } = useQuery({
    queryKey: ["search", bloodgroup, district, upazila],
    enabled: true,
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/search?bloodgroup=${encodeURIComponent(
          bloodgroup
        )}&district=${encodeURIComponent(
          district
        )}&upazila=${encodeURIComponent(upazila)}`
      );
      return data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setShowResults(true);
  };
  return (
    <div>
      <Container>
        <h1 className="text-2xl font-bold mb-6 pt-6 text-center text-red-500">
          Search Donors
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gradient-to-r from-red-100 via-white to-red-100 p-6 rounded-lg shadow-md">
          <select
            value={bloodgroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="p-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option>Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="p-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option>Select District</option>
            {districtOptions?.map((d) => (
              <option key={d?._id}>{d?.name}</option>
            ))}
          </select>

          <select
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="p-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option>Select Upazila</option>
            {upazilaOptions?.map((u) => (
              <option key={u?._id} value={u?.name}>
                {u?.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            type="submit"
            className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            <FaSearch />
            Search
          </button>
        </form>

        {showResults && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {donors.length === 0 ? (
              <p className="text-center col-span-full text-gray-500">
                No donors found for the selected criteria.
              </p>
            ) : (
              donors.map((donor) => (
                <div
                  key={donor._id}
                  className="border p-4 rounded-lg shadow-md bg-gradient-to-r from-red-50 via-white to-red-50"
                >
                  <img
                    src={donor.photoURL}
                    alt={donor.name}
                    className="w-20 h-20 rounded-full mx-auto mb-2"
                  />
                  <h2 className="text-lg font-semibold text-center text-red-600">
                    {donor.name}
                  </h2>
                  <p className="text-center text-sm text-gray-600">
                    Blood Group: {donor.bloodgroup}
                  </p>
                  <p className="text-center text-sm text-gray-600">
                    {donor.upazila}, {donor.district}
                  </p>
                  <p className="text-center text-sm text-green-600">
                    {donor.status}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Search;
