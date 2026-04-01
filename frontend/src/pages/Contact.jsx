import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSending, setIsSending] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: '', text: '' });

    try {
      await axios.post('/api/contact', { name, email, message });
      setStatus({ type: 'success', text: '✅ Message sent successfully! We will get back to you soon.' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus({ 
        type: 'error', 
        text: err?.response?.data?.message || '❌ Failed to send message. Please try again.' 
      });
    } finally {
      setIsSending(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}
    >
      <h1 style={{ color: 'var(--primary-color)', textAlign: 'center', marginBottom: '3rem', fontSize: '3rem' }}>
        Contact Us
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        {/* Contact Form */}
        <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--secondary-color)' }}>Send us a message</h2>

          {status.text && (
            <div style={{
              padding: '1rem',
              borderRadius: '6px',
              marginBottom: '1.5rem',
              background: status.type === 'success' ? '#d1fae5' : '#fee2e2',
              color: status.type === 'success' ? '#065f46' : '#991b1b',
              fontWeight: '500'
            }}>
              {status.text}
            </div>
          )}

          <form onSubmit={submitHandler}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563', fontWeight: '500' }}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                placeholder="Your Name"
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563', fontWeight: '500' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                placeholder="Your Email"
                required
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563', fontWeight: '500' }}>Message</label>
              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="How can we help you?"
                required
              />
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSending}
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '0' }}>Get in Touch</h2>
          <p style={{ color: '#4b5563', lineHeight: '1.8', margin: '0' }}>
            Have questions about admissions, our curriculum, or scheduling a campus visit?
            Our office is open Monday through Saturday, 8:00 AM to 4:00 PM.
          </p>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ color: 'var(--secondary-color)', marginBottom: '0.25rem' }}>📍 Address</h4>
              <p style={{ color: '#64748b', margin: 0 }}>Anand Vihar, Ghansali,<br />Uttarakhand 249155</p>
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ color: 'var(--secondary-color)', marginBottom: '0.25rem' }}>📧 Email</h4>
              <a href="mailto:sunshineschoolghansali@gmail.com" style={{ color: '#64748b', textDecoration: 'none' }}>
                sunshineschoolghansali@gmail.com
              </a>
            </div>
            <div>
              <h4 style={{ color: 'var(--secondary-color)', marginBottom: '0.25rem' }}>📸 Instagram</h4>
              <a href="https://www.instagram.com/sunshinepublicschool_official/" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'none' }}>
                @sunshinepublicschool_official
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
