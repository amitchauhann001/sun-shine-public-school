import { motion } from 'framer-motion';

const Academics = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}
    >
      <h1 style={{ color: 'var(--primary-color)', textAlign: 'center', marginBottom: '2rem', fontSize: '3rem' }}>Academics at Sun Shine</h1>
      <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem', color: '#4b5563', lineHeight: '1.8' }}>
        Our curriculum is designed to challenge students intellectually while providing the support they need to succeed. 
        We offer a wide range of subjects spanning the sciences, humanities, arts, and technology.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '12px', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Primary Education</h3>
          <p style={{ color: '#64748b' }}>Building a strong foundation in literacy, numeracy, and social skills through engaging, interactive learning experiences.</p>
        </div>
        <div style={{ padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '12px', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Middle School</h3>
          <p style={{ color: '#64748b' }}>Fostering independent thinking and deeper subject knowledge as students prepare for high school challenges.</p>
        </div>
        <div style={{ padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '12px', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>High School (Up to 10th)</h3>
          <p style={{ color: '#64748b' }}>Rigorous academic preparation for board exams, accompanied by career counseling and extracurricular enrichment.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Academics;
