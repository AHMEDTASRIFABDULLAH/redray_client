import run from "../../assets/images/hero.jpg";

const HeroHome = () => {
  return (
    <div
      className=" rounded-md h-[600px] bg-fixed relative bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${run})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute rounded-md inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6 md:px-12">
        <h1 className="text-4xl   mb-4 leading-tight drop-shadow-lg">
          Empowering Lives, One Drop at a Time
        </h1>
        <p className="text-lg md:text-xl font-medium mb-6 text-gray-200">
          Join us in making a difference. Donate blood and save lives today.Mayo
          Clinic experts solve the world’s toughest medical problems — one
          patient at a time.
        </p>

        {/* Call to Action Button */}
      </div>
    </div>
  );
};

export default HeroHome;
