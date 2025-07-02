import { FaUsers, FaAward, FaLightbulb } from "react-icons/fa";
import Container from "../../components/Shared/Container";

const About = () => {
  return (
    <Container>
      <section className="py-16 px-6 bg-gradient-to-r from-red-50 to-white">
        <div className=" mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-red-600 mb-8">
            About Us
          </h2>
          <p className="text-lg text-gray-700 mb-12">
            We are committed to saving lives by providing a reliable and
            accessible blood donation service.
          </p>

          <div className="grid gap-12 md:grid-cols-3">
            {/* Our Mission */}
            <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition duration-300">
              <FaLightbulb className="text-red-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To ensure that blood is always available when and where it's
                needed by organizing efficient donation drives.
              </p>
            </div>

            {/* Our Team */}
            <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition duration-300">
              <FaUsers className="text-red-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Team
              </h3>
              <p className="text-gray-600">
                A dedicated team of professionals and volunteers working
                together to save lives and make a difference.
              </p>
            </div>

            {/* Achievements */}
            <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition duration-300">
              <FaAward className="text-red-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Achievements
              </h3>
              <p className="text-gray-600">
                Over 5000 lives saved and 1000+ donors registered. Together,
                we've made a meaningful impact.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Choose Us?
            </h3>
            <p className="text-lg text-gray-700">
              Our commitment to transparency, reliability, and community service
              ensures that every donation counts. Join our cause, and help us
              continue saving lives.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default About;
