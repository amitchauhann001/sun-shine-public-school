import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}
    >
      <h1 style={{ color: 'var(--primary-color)', textAlign: 'center', marginBottom: '2rem', fontSize: '3rem' }}>About Sun Shine Public School</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Our History & Legacy</h2>
          <p style={{ lineHeight: '1.8', color: '#4b5563', marginBottom: '1.5rem' }}>
            Founded with a vision to provide world-class education, Sun Shine Public School has been a beacon of knowledge and character development. 
            We believe in nurturing young minds to become future leaders, critical thinkers, and compassionate citizens.
          </p>
          <p style={{ lineHeight: '1.8', color: '#4b5563' }}>
            Our dedicated faculty, state-of-the-art facilities, and comprehensive curriculum ensure that every student receives the attention and resources they need to excel.
          </p>
        </div>
        <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Our Mission</h3>
          <p style={{ lineHeight: '1.6', color: '#4b5563', borderLeft: '4px solid var(--secondary-color)', paddingLeft: '1rem' }}>
            To empower students with holistic education, fostering intellectual curiosity, ethical values, and a lifelong love for learning in a safe and inclusive environment.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
