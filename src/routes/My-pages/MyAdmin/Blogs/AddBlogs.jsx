import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { imageUpload } from "../../../../api/utils";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { FaFeatherAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const AddBlogs = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;
    const textContent = tempElement.innerText;
    const image = form.image.files[0];
    const thumbnail = await imageUpload(image);
    const status = "draft";
    const blogsData = { title, thumbnail, textContent, status };

    try {
      await axiosPublic.post(`/all-blogs`, blogsData);
      toast.success("Blogs added successfully");
      form.reset();
      navigate("/blogs");
    } catch (error) {
      toast.error("something went worng!!", error);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-50 py-8 px-4">
        {/* Header */}
        <h1 className="text-center text-3xl flex items-center gap-3 font-bold p-4 bg-gradient-to-r from-red-100 to-red-300 text-red-600 shadow-lg rounded-lg">
          <FaFeatherAlt className="text-red-500 text-4xl" />
          Create a Blog
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mt-8 p-8 bg-white shadow-xl rounded-xl border-t-4 border-red-400"
        >
          {/* Blog Title */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Blog Title:
            </label>
            <input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition duration-300"
              required
            />
          </div>

          {/* Thumbnail Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Thumbnail Image:
            </label>
            <input
              required
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition duration-300"
            />
          </div>

          {/* Blog Content */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Blog Content:
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              onBlur={(newContent) => setContent(newContent)}
              className="border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 transition duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md shadow-md transition duration-300"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlogs;
