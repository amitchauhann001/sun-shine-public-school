import { motion } from 'framer-motion';

const Gallery = () => {
  const base = import.meta.env.BASE_URL;
  // Real school photos copied from the local source
  const photos = [
    { url: `${base}images/gallery/img1.jpg`, title: 'School Activities' },
    { url: `${base}images/gallery/img2.jpg`, title: 'Classroom Session' },
    { url: `${base}images/gallery/img3.jpg`, title: 'Student Projects' },
    { url: `${base}images/gallery/img4.jpg`, title: 'Sports Meet' },
    { url: `${base}images/gallery/img5.jpg`, title: 'Annual Day' },
    { url: `${base}images/gallery/img6.jpg`, title: 'Science Lab' },
    { url: `${base}images/gallery/img7.jpg`, title: 'Cultural Events' },
    { url: `${base}images/gallery/img8.jpg`, title: 'Playground Fun' },
    { url: `${base}images/gallery/img9.jpg`, title: 'Award Ceremony' },
    { url: `${base}images/gallery/img10.jpg`, title: 'School Library' },
    { url: `${base}images/gallery/img11.jpg`, title: 'Modern Infrastructure' },
    { url: `${base}images/gallery/img12.jpg`, title: 'Faculty Meet' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}
    >
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '3.5rem', marginBottom: '1rem' }}>Our Gallery</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Capturing the vibrant life and memorable moments at Sun Shine Public School.
        </p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {photos.map((item, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            style={{ 
              position: 'relative',
              height: '300px', 
              borderRadius: '16px', 
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              background: '#f1f5f9'
            }}
          >
            <img 
              src={item.url} 
              alt={item.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546410531-bea5aad104ea?auto=format&fit=crop&q=80&w=800' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1.5rem',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              color: '#fff',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }} className="gallery-overlay">
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        div:hover > .gallery-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </motion.div>
  );
};

export default Gallery;
