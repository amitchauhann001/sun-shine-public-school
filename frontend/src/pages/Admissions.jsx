import { motion } from 'framer-motion';

const Admissions = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}
    >
      <h1 style={{ color: 'var(--primary-color)', textAlign: 'center', marginBottom: '2rem', fontSize: '3rem' }}>Admissions Information</h1>
      <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1.5rem' }}>Join the Sun Shine Family</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
          We welcome applications from students of all backgrounds who demonstrate a desire to learn, grow, and contribute positively to our school community. 
          Applications for the upcoming academic year are now open.
        </p>

        <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Application Process</h3>
        <ol style={{ paddingLeft: '1.5rem', color: '#4b5563', lineHeight: '2', marginBottom: '2.5rem' }}>
          <li>Submit the online application form.</li>
          <li>Provide required documents (previous transcripts, birth certificate, etc.).</li>
          <li>Schedule an entrance assessment (if applicable for the grade level).</li>
          <li>Attend a family interview with our admissions team.</li>
          <li>Receive admission decision.</li>
        </ol>

        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Apply Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Admissions;
