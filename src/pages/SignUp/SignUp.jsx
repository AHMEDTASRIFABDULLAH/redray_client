import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { imageUpload } from "../../api/utils";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [upazila, setUpazila] = useState([]);
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

    fetchUpazila(); // Call the function inside the useEffect
  }, []);
  // form submit handler
  const axiosPublic = useAxiosPublic();
  const { data: district } = useQuery({
    queryKey: ["district"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/district`);
      return data;
    },
  });

  //  const axiosPublic = useAxiosPublic();

  // handelSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const upazila = form.upazila.value;
    const district = form.district.value;
    const bloodgroup = form.bloodgroup.value;
    //1. send image data to imgbb
    const photoURL = await imageUpload(image);

    try {
      //2. User Registration
      const result = await createUser(email, password);

      //3. Save username & profile photo
      await updateUserProfile(name, photoURL);
      console.log(result);
    } catch (err) {
      toast.error(err?.message);
    }

    const userInfo = {
      name,
      email,
      photoURL,
      upazila,
      district,
      role: "donor",
      status: "active",
      bloodgroup,
    };
    console.log(userInfo);
    try {
      await axiosPublic.post(`/users`, userInfo);
      navigate("/");
      toast.success("Signup successfully");
    } catch (error) {
      toast.error("something went worng!!", error);
    }
  };

  // Handle Google Signin

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-100 via-white to-red-100 p-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-red-600">Sign Up</h1>
          <p className="mt-2 text-sm text-gray-500">Welcome to RedRay</p>
        </div>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name Here"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email Here"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              required
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="confirmpassword"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="*******"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="district"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                District
              </label>
              <select
                name="district"
                id="district"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              >
                {district?.map((d) => (
                  <option key={d._id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="upazila"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Upazila
              </label>
              <select
                name="upazila"
                id="upazila"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              >
                {upazila?.map((u) => (
                  <option key={u._id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="bloodgroup"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Blood Group
              </label>
              <select
                name="bloodgroup"
                id="bloodgroup"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB">AB</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md"
          >
            Continue
          </button>
        </form>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
