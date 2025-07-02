import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { imageUpload } from "../../../api/utils";
import toast from "react-hot-toast";
const Profile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [upazila, setUpazila] = useState([]);
  const [district, setdistrict] = useState([]);

  useEffect(() => {
    const fetchUpazila = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/upazilla`
        );
        setUpazila(response.data);
      } catch (error) {
        console.error("Error fetching upazila data:", error);
      }
    };
    const fetchDpazila = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/district`
        );
        setdistrict(response.data);
      } catch (error) {
        console.error("Error fetching district data:", error);
      }
    };
    fetchDpazila();
    fetchUpazila(); // Call the function inside the useEffect
  }, []);
  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/user/${user.email}`);
      return data;
    },
  });
  console.log(data, user.email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.files[0];
    const photoURL = await imageUpload(image);
    const name = form.name.value;

    const upazila = form.upazila.value;
    const district = form.district.value;
    const userInfo = { name, photoURL, upazila, district };
    try {
      await axiosPublic.put(`/user/${data?._id}`, userInfo);
      refetch();
      toast.success("Profile updated successfully");
      document.getElementById("my_modal_4").close();
    } catch (error) {
      toast.error("Something went wrong!!", error);
      console.error("Error updating profile:", error);
    }
  };
  const handelUpdate = () => {
    document.getElementById("my_modal_4").showModal();
  };
  const closeModal = () => {
    document.getElementById("my_modal_4").close();
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <img
          alt="cover photo"
          src={data?.photoURL}
          className="w-full object-cover mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 py-10 -mt-16 ">
          <div className="w-full p-2 mt-4 rounded-lg">
            <div>
              <div className="flex justify-between">
                <p className="flex flex-col">
                  Name
                  <span className="font-bold text-black ">{data?.name}</span>
                </p>
                <p className="text-xl">
                  role
                  <span className="font-bold text-black "> {data?.role}</span>
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <p className="flex flex-col">
                  District
                  <span className="font-bold text-black ">
                    {data?.district}
                  </span>
                </p>
                <p className="flex flex-col">
                  Upazila
                  <span className="font-bold text-black ">
                    {" "}
                    {data?.upazila}
                  </span>
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <p className="flex flex-col">
                  Email
                  <span className="font-bold text-black ">{user?.email}</span>
                </p>
                <p>Blood group : {data?.bloodgroup}</p>
                <div>
                  <button
                    onClick={handelUpdate}
                    className="bg-lime-500 px-10 py-1 rounded-lg text-black cursor-pointer hover:bg-lime-800 block mb-1"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      <dialog id="my_modal_4" className="modal">
        <form onSubmit={handleSubmit} className="modal-box w-11/12 max-w-5xl">
          <div className="flex gap-4 justify-between">
            <div className="w-1/2">
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={data?.name}
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                defaultValue={data?.email}
                disabled
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
          </div>
          {/* address */}
          <div className="flex gap-4 justify-between">
            <div className="w-1/2">
              <label htmlFor="password" className="text-sm mb-2">
                District
              </label>
              <select
                name="district"
                id="district"
                defaultValue={data?.district}
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              >
                {district.map((d) => (
                  <option key={d._id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label htmlFor="password" className="text-sm mb-2">
                Upazila
              </label>
              <select
                name="upazila"
                id="upazila"
                defaultValue={data?.upazila}
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              >
                {upazila.map((u) => (
                  <option key={u._id}>{u.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* address end */}
          {/* image */}
          <div className="flex gap-4 justify-between mt-4">
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
                defaultValue={data?.bloodgroup}
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
          </div>
          {/* image end */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white mt-4"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white mt-4"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
      {/* modal end  */}
    </div>
  );
};

export default Profile;
