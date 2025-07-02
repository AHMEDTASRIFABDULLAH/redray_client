import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaHome,
  FaHospital,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaTint,
  FaUser,
} from "react-icons/fa";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const ViewDetails = () => {
  const axiosPublic = useAxiosPublic();
  const [btnId, setBtnId] = useState();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["editdata"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/edit/${id}`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  //  update donate status
  const handelDonate = (id) => {
    axiosPublic.patch(`/all-donations/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        toast.success("Donate success");
        refetch();
        navigate("/blood");
      }
    });
  };
  const handelModal = (id) => {
    document.getElementById("my_modal_1").showModal();
    setBtnId(id);
  };
  const closeModal = () => {
    document.getElementById("my_modal_1").close();
  };
  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-xl p-8 border border-gray-200">
      <h2 className="text-3xl font-extrabold text-center text-red-600 mb-6">
        <FaInfoCircle className="inline-block mr-2" /> Donation Details
      </h2>

      <div className="flex items-center mb-6">
        <img
          src={data?.image}
          alt="Recipient"
          className="w-28 h-28 rounded-full border-4 border-red-500 shadow-md mr-6"
        />
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaUser className="mr-2" /> {data?.recipientName}
          </h3>
          <p className="text-gray-500 italic flex items-center">
            <FaEnvelope className="mr-2" /> {data?.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-700 flex items-center">
            <FaMapMarkerAlt className="mr-2" /> Location
          </h4>
          <p className="text-gray-600">
            {data?.district}, {data?.upazila}
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-700 flex items-center">
            <FaCalendarAlt className="mr-2" /> Date & Time
          </h4>
          <p className="text-gray-600">
            {data?.date} at {data?.time}
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-700 flex items-center">
            <FaHospital className="mr-2" /> Hospital
          </h4>
          <p className="text-gray-600">{data?.hospital}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-700 flex items-center">
            <FaHome className="mr-2" /> Address
          </h4>
          <p className="text-gray-600">{data?.address}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-700 flex items-center">
            <FaTint className="mr-2 text-red-600" /> Blood Group
          </h4>
          <p className="text-red-600 font-bold">{data?.bloodgroup}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-700 flex items-center">
            <FaInfoCircle className="mr-2" /> Status
          </h4>
          <p className="text-gray-600">{data?.status}</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 flex items-center">
          <FaInfoCircle className="mr-2" /> Description
        </h4>
        <p className="text-gray-600 leading-relaxed">{data?.description}</p>
      </div>

      <div className="text-center">
        <button
          onClick={() => handelModal(data._id)}
          className="px-8 py-3 bg-red-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-red-700 transform hover:scale-105 transition-transform flex items-center justify-center"
        >
          <FaTint className="mr-2" /> Registration
        </button>
      </div>
      {/* modal */}
      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box bg-rose-400">
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input
              type="text"
              defaultValue={user?.displayName}
              className="grow"
              placeholder="Daisy"
              disabled
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-6">
            Email
            <input
              type="text"
              disabled
              defaultValue={user?.email}
              className="grow"
              placeholder="daisy@site.com"
            />
          </label>
          <div className="flex justify-between mt-6 ">
            <button
              onClick={() => handelDonate(btnId)}
              className="px-8 py-3 bg-red-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-red-700 transform hover:scale-105 transition-transform flex items-center justify-center"
            >
              Confirm
            </button>
            <button
              className="px-8 py-3 bg-red-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-red-700 transform hover:scale-105 transition-transform flex items-center justify-center"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ViewDetails;
