import { useState } from "react";
import useDistrict from "../../hooks/useDistrict";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const Edit = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [donationTime, setDonationTime] = useState("");
  const { district, upazila } = useDistrict();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { id } = useParams();

  // get single data
  const { data, refetch } = useQuery({
    queryKey: ["editdata"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/edit/${id}`);
      return data;
    },
  });
  console.log("Edit data", data);
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
      await axiosPublic.put(`/my-donations/${id}`, donationRequsetData);
      toast.success("Update successfully");
      refetch();
      form.reset();
    } catch (error) {
      toast.error("something went worng!!", error);
    }
  };
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <h1 className="text-xl mb-6 font-semibold">Update donation request</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Recipient name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="recipientname"
                defaultValue={data?.recipientname}
                id="name"
                type="text"
                placeholder="recipient name"
                required
              />
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                recipient district
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="district"
              >
                {district?.map((d) => (
                  <option key={d._id}>{d?.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                recipient upazila
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="upazila"
              >
                {upazila?.map((u) => (
                  <option key={u._id}>{u?.name}</option>
                ))}
              </select>
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                defaultValue={data?.description}
                placeholder="Write plant description here..."
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 "
                name="description"
                required
              ></textarea>
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="name" className="block text-gray-600">
                  hospital name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="hospital"
                  id="name"
                  type="text"
                  defaultValue={data?.hospital}
                  placeholder=" hospital name "
                  required
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label htmlFor="name" className="block text-gray-600">
                  Full address
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="address"
                  defaultValue={data?.address}
                  id="name"
                  type="text"
                  placeholder="full address"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <div className="flex flex-col gap-2 ">
                  <label className="text-black"> Date</label>
                  <DatePicker
                    className="border p-2 rounded-md"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    defaultValue={data?.date}
                  />
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="category" className="block text-gray-600 ">
                  time
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="time"
                  id="name"
                  value={donationTime}
                  onChange={(e) => setDonationTime(e.target.value)}
                  type="time"
                  placeholder="time"
                  required
                  defaultValue={data?.time}
                />
              </div>
            </div>
            {/* Image */}
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm mb-2">
                Blood group
              </label>
              <select
                name="bloodgroup"
                id="bloodgroup"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              >
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 "
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
