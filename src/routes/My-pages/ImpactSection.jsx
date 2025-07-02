import { FaHandsHelping, FaHeartbeat, FaDonate } from "react-icons/fa";

const ImpactSection = () => {
  return (
    <section className="bg-gradient-to-r from-red-50 to-white py-6">
      <div className=" mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-6">
          Together, We Can Save Lives
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Join our mission to provide lifesaving blood to those in need. Every
          drop counts!
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Donors Helped */}
          <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition duration-300">
            <FaHandsHelping className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">1000+ Donors</h3>
            <p className="text-gray-600">
              Dedicated individuals have registered to donate blood.
            </p>
          </div>

          {/* Lives Saved */}
          <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition duration-300">
            <FaHeartbeat className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">5000+ Lives Saved</h3>
            <p className="text-gray-600">
              We have helped save thousands of lives with your support.
            </p>
          </div>

          {/* Donations Collected */}
          <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition duration-300">
            <FaDonate className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">200+ Blood Drives</h3>
            <p className="text-gray-600">
              Successful donation drives organized across regions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
