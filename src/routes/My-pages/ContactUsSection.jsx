import toast from "react-hot-toast";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const ContactUsSection = () => {
  const { user } = useAuth();
  const handelContact = (e) => {
    e.preventDefault();
    if (user) {
      toast.success("Thanks for contact us");
      e.reset();
    } else {
      toast.error("Please Login ");
    }
  };
  return (
    <section className="py-12">
      <h2 className="text-3xl font-extrabold pb-10 text-center text-red-600 mb-8">
        Contact Us
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Send Us a Message
          </h3>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your Message"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
              ></textarea>
            </div>
            <button
              onClick={handelContact}
              type="submit"
              className="w-full py-3 font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h3>
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-red-500 text-2xl" />
            <p className="text-gray-700">+1 234 567 890</p>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-red-500 text-2xl" />
            <p className="text-gray-700">contact@blooddonor.org</p>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-red-500 text-2xl" />
            <p className="text-gray-700">
              123 Blood Donor Street, City, Country
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
