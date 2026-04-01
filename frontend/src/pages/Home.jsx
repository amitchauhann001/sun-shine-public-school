import AnnouncementTicker from '../components/Home/AnnouncementTicker';
import HeroCarousel from '../components/Home/HeroCarousel';
import AchievementsSlider from '../components/Home/AchievementsSlider';

const Home = () => {
  return (
    <>
      <AnnouncementTicker />
      <HeroCarousel />
      
      {/* Short About Section Example within Home */}
      <section className="section" style={{ backgroundColor: 'var(--bg-light)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 className="section-title">Why Choose Us?</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
            We provide a nurturing environment where students excel both academically and personally. 
            Our comprehensive curriculum, combined with state-of-the-art facilities, ensures your child 
            receives the best foundation for a successful future.
          </p>
          <button className="btn btn-secondary">Learn More About Us</button>
        </div>
      </section>

      <AchievementsSlider />
    </>
  );
};

export default Home;
