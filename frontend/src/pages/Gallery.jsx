import { motion } from 'framer-motion';

const Gallery = () => {
  // Placeholder images for the gallery
  const photos = [
    'https://images.unsplash.com/photo-1546410531-bea5aad104ea?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}
    >
      <h1 style={{ color: 'var(--primary-color)', textAlign: 'center', marginBottom: '3rem', fontSize: '3rem' }}>Photo Gallery</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {photos.map((url, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.03 }}
            style={{ 
              height: '250px', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <img src={url} alt={`Gallery item ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Gallery;
