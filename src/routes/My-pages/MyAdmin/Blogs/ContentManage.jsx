import { FaClover } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import useBlogs from "../../../../hooks/useBlogs";
import { useState } from "react";
import toast from "react-hot-toast";
import useAdmin from "../../../../hooks/useAdmin";
import Pagenaton from "../../Pagenaton";

const ContentManage = () => {
  //   paginaton state
  const [currentPage, setCurrPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);
  //  pagination state end
  const [id, setId] = useState(null);
  const [status, setStatus] = useState(null);
  const [sort, setSort] = useState("");
  const [isAdmin] = useAdmin();
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-blogs", sort],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-blogs-data?sort=${sort}`);
      return data;
    },
  });
  const { data: statusdata } = useBlogs(id, status);
  if (statusdata?.modifiedCount > 0) {
    refetch();
  }
  if (isLoading) return <LoadingSpinner />;
  const handeStatus = (id, status) => {
    setId(id);
    setStatus(status);
  };
  const handelDelete = async (_id) => {
    try {
      await axiosPublic.delete(`/delete-blog/${_id}`);
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
  // paginaton
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data?.slice(firstPostIndex, lastPostIndex);
  //   pagination end
  return (
    <div>
      <h1 className="text-center text-2xl flex justify-center items-center gap-3 font-bold p-4 bg-gradient-to-r from-red-100 to-red-200 shadow-md rounded-md">
        <FaClover className="text-green-600 text-3xl" /> Content Manage
      </h1>
      <div className="flex items-center justify-between mt-4">
        <div className=" my-6 ">
          <select
            name="sort"
            id="sort"
            className="border p-4 rounded-md shadow-md "
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By Status</option>
            <option value="published">publish</option>
            <option value="draft">Unpublish</option>
          </select>
        </div>
        <Link to="/dashboard/addblogs">
          <button className="w-full flex justify-center items-center gap-1 sm:w-auto bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            Add Blogs
          </button>
        </Link>
      </div>
      {/* all blogs */}
      <div>
        <table className="w-full mt-6 mx-auto bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Thumbnail</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Details</th>
              {isAdmin === "admin" ? (
                <th className="px-4 py-3 text-center">Actions</th>
              ) : (
                " "
              )}
            </tr>
          </thead>
          <tbody>
            {currentPosts?.map((d) => (
              <tr key={d._id} className="hover:bg-gray-50 text-sm border-b">
                <td className="px-4 py-3">
                  <img
                    src={d?.thumbnail}
                    alt="Thumbnail"
                    className="w-12 h-12 rounded-md object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {d?.status}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {d?.title}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {d?.textContent.slice(0, 40)}...
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex flex-col gap-2">
                    {isAdmin === "admin" ? (
                      <div>
                        {d.status === "published" ? (
                          <button
                            onClick={() => handeStatus(d._id, "draft")}
                            className="px-3 py-1 text-xs font-medium text-red-600 bg-green-100 rounded hover:bg-green-200 transition"
                          >
                            Unpublish
                          </button>
                        ) : (
                          <button
                            onClick={() => handeStatus(d._id, "published")}
                            className="px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded hover:bg-green-200 transition"
                          >
                            Publish
                          </button>
                        )}
                      </div>
                    ) : (
                      " "
                    )}
                    {isAdmin === "admin" ? (
                      <button
                        onClick={() => newDeletStyle(d._id)}
                        className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded hover:bg-red-200 transition"
                      >
                        delete
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagenaton
        totalPost={data.length}
        postPerPage={postPerPage}
        setCurrPage={setCurrPage}
      />
    </div>
  );
};

export default ContentManage;
