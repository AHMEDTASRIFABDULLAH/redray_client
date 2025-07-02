import { Helmet } from "react-helmet-async";
import Carousel from "../../routes/Carousel";
import FeaturedSection from "../../routes/My-pages/MyAdmin/FeaturedSection";
import ContactUsSection from "../../routes/My-pages/ContactUsSection";
import ImpactSection from "../../routes/My-pages/ImpactSection";
import Container from "../../components/Shared/Container";
import HeroHome from "../../routes/My-pages/HeroHome";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>RedRay</title>
      </Helmet>
      <Carousel />
      <Container>
        <ImpactSection />
        <FeaturedSection />
        <HeroHome />
        <ContactUsSection />
      </Container>
    </div>
  );
};

export default Home;
