import AnnouncementTicker from '../components/Home/AnnouncementTicker';
import HeroCarousel from '../components/Home/HeroCarousel';

import FounderMessage from '../components/Home/FounderMessage';
import WhyChooseUs from '../components/Home/WhyChooseUs';
import AimsObjectives from '../components/Home/AimsObjectives';
import MissionVision from '../components/Home/MissionVision';
import LocationSection from '../components/Home/LocationSection';
import Testimonials from '../components/Home/Testimonials';

const Home = () => {
  return (
    <>
      <AnnouncementTicker />
      <HeroCarousel />
      <AimsObjectives />
      <MissionVision />
      <WhyChooseUs />
      <FounderMessage />
      <Testimonials />
      <LocationSection />

    </>
  );
};

export default Home;

