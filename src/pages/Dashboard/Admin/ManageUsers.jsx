import { Helmet } from "react-helmet-async";
import UserDataRow from "../../../components/Dashboard/TableRows/UserDataRow";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { FaClover } from "react-icons/fa6";
import { useState } from "react";
import Pagenaton from "../../../routes/My-pages/Pagenaton";

const ManageUsers = () => {
  const axiosPublic = useAxiosPublic();
  const [sort, setSort] = useState("");

  const [currentPage, setCurrPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["Allusers", sort],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-users?sort=${sort}`);
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
    <>
      <div>
        <Helmet>
          <title>Manage Users</title>
        </Helmet>
        <div className="py-5">
          <h1 className="text-center text-2xl flex justify-center items-center gap-3 font-bold py-4 bg-gradient-to-r from-red-100 to-red-200 shadow-md rounded-md">
            <FaClover className="text-green-600 text-3xl" /> All Users
          </h1>
          <div className="my-6">
            <select
              name="sort"
              id="sort"
              className="border p-4 rounded-md shadow-md "
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By Status</option>
              <option value="active">active</option>
              <option value="blocked">blocked</option>
            </select>
          </div>
          <div className=" overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Change Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      District
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Upazila
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Change Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts?.map((user) => (
                    <UserDataRow refetch={refetch} user={user} key={user._id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagenaton
          totalPost={data.length}
          postPerPage={postPerPage}
          setCurrPage={setCurrPage}
        />
      </div>
    </>
  );
};

export default ManageUsers;
