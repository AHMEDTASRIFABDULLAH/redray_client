import PropTypes from "prop-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { imageUpload } from "../../api/utils";
import "react-datepicker/dist/react-datepicker.css";
import useDistrict from "../../hooks/useDistrict";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import {
  FaCalendarAlt,
  FaClock,
  FaFileImage,
  FaHospital,
  FaMapMarkerAlt,
  FaTint,
  FaUserAlt,
} from "react-icons/fa";
const AddPlantForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [donationTime, setDonationTime] = useState("");
  const { district, upazila } = useDistrict();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const recipientname = form.recipientname.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const time = donationTime;
    const description = form.description.value;
    const address = form.address.value;
    const date = startDate;
    const hospital = form.hospital.value;
    const photoURL = form.image.files[0];
    const image = await imageUpload(photoURL);
    const bloodgroup = form.bloodgroup.value;
    const donationRequsetData = {
      recipientname,
      district,
      upazila,
      time,
      description,
      address,
      date,
      hospital,
      image,
      bloodgroup,
      status: "pending",
      email: user?.email,
    };
    try {
      await axiosPublic.post(`/alldonations`, donationRequsetData);
      toast.success("Donation Created successfully");
      form.reset();
    } catch (error) {
      toast.error("something went worng!!", error);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white p-8 shadow-lg rounded-xl"
      >
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          Blood Donation Request
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Recipient Name */}
            <div className="relative">
              <FaUserAlt className="absolute top-3 left-3 text-red-400" />
              <input
                className="w-full pl-10 px-4 py-3 border border-red-300 focus:outline-red-500 rounded-md bg-white text-gray-800"
                name="recipientname"
                type="text"
                placeholder="Recipient Name"
                required
              />
            </div>

            {/* Recipient District */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute top-3 left-3 text-red-400" />
              <select
                required
                className="w-full pl-10 px-4 py-3 border border-red-300 focus:outline-red-500 rounded-md bg-white"
                name="district"
              >
                <option value="">Select District</option>
                {district?.map((d) => (
                  <option key={d._id}>{d?.name}</option>
                ))}
              </select>
            </div>

            {/* Recipient Upazila */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute top-3 left-3 text-red-400" />
              <select
                required
                className="w-full pl-10 px-4 py-3 border border-red-300 focus:outline-red-500 rounded-md bg-white"
                name="upazila"
              >
                <option value="">Select Upazila</option>
                {upazila?.map((u) => (
                  <option key={u._id}>{u?.name}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <textarea
                placeholder="Additional Information..."
                className="w-full px-4 py-3 border border-red-300 focus:outline-red-500 rounded-md bg-white text-gray-800 h-32"
                name="description"
                required
              ></textarea>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Hospital Name */}
            <div className="relative">
              <FaHospital className="absolute top-3 left-3 text-red-400" />
              <input
                className="w-full pl-10 px-4 py-3 border border-red-300 focus:outline-red-500 rounded-md bg-white text-gray-800"
                name="hospital"
                type="text"
                placeholder="Hospital Name"
                required
              />
            </div>

            {/* Full Address */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute top-3 left-3 text-red-400" />
              <input
                className="w-full pl-10 px-4 py-3 border border-red-300 focus:outline-red-500 rounded-md bg-white text-gray-800"
                name="address"
                type="text"
                placeholder="Full Address"
                required
              />
            </div>

            {/* Date & Time */}
            <div className="flex gap-4">
              <div className="relative w-1/2">
                <FaCalendarAlt className="absolute top-3 left-3 text-red-400" />
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="w-full pl-10 px-4 py-3 border border-red-300 focus:outline-red-500 rounded-md bg-white text-gray-800"
                  placeholderText="Select Date"
                  required
                />
              </div>

              <div className="relative w-1/2">
                <FaClock className="absolute top-3 left-3 text-red-400" />
                <input
                  className="w-full pl-10 px-4 py-3 border border-red-300 focus:outline-red-500 rounded-md bg-white text-gray-800"
                  name="time"
                  type="time"
                  value={donationTime}
                  onChange={(e) => setDonationTime(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="relative">
              <FaFileImage className="absolute top-3 left-3 text-red-400" />
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full pl-10 px-4 py-3 border border-red-300 focus:outline-red-500 rounded-md bg-white"
              />
            </div>

            {/* Blood Group */}
            <div className="relative">
              <FaTint className="absolute top-3 left-3 text-red-400" />
              <select
                name="bloodgroup"
                className="w-full pl-10 px-4 py-3 border border-red-300 focus:outline-red-500 rounded-md bg-white text-gray-800"
                required
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 text-center font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md transition duration-300"
            >
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AddPlantForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setUploadImage: PropTypes.func.isRequired,
  uploadImage: PropTypes.object,
  loading: PropTypes.bool,
};

export default AddPlantForm;
