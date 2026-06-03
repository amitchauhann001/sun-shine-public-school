import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaDirections, FaPaperPlane, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import styles from './Contact.module.scss';
import MapSection from '../components/MapSection';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    parentName: '',
    phone: '',
    email: '',
    classInterested: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | sending | success | error

  const { name, parentName, phone, email, classInterested, message } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Auto-hide success/error after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      const timer = setTimeout(() => setSubmitStatus('idle'), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !phone || !email || !message) {
      toast.error('Please fill all required fields');
      return;
    }
    setSubmitStatus('sending');

    try {
      await axios.post('/api/contact', formData);
      setSubmitStatus('success');
      setFormData({ name: '', parentName: '', phone: '', email: '', classInterested: '', message: '' });
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Our Location',
      details: 'Anand Vihar, Ghansali, Uttarakhand 249155',
      link: 'https://www.google.com/maps/dir//Sun+Shine+Public+School+-+Best+school+in+Ghansali,+Tehri+Garhwal,+Uttarakhand+%7C+English+Medium+School/@30.4443859,78.6501483,17z/'
    },
    {
      icon: <FaPhoneAlt />,
      title: 'Phone Number',
      details: '+91 7088662773',
      link: 'tel:+917088662773'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Address',
      details: 'sunshineschoolghansali@gmail.com',
      link: 'mailto:sunshineschoolghansali@gmail.com'
    }
  ];

  const getButtonContent = () => {
    switch (submitStatus) {
      case 'sending':
        return <><div className="spinner"></div> Submitting...</>;
      case 'success':
        return <><FaCheckCircle style={{ marginRight: '0.5rem' }} /> Submitted ✓</>;
      default:
        return <><FaPaperPlane style={{ marginRight: '0.5rem' }} /> Send Message</>;
    }
  };

  return (
    <div className={styles.contactPage}>
      {/* SECTION 1: HERO BANNER */}
      <section 
        className={styles.hero}
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/contact/banner.jpg)` }}
      >
        <div className={styles.heroContent}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We'd Love to Hear From You
          </motion.p>
        </div>
      </section>

      {/* SECTION 2: CONTACT INFORMATION CARDS */}
      <section className={styles.infoSection}>
        <div className={styles.infoGrid}>
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.link}
              target={info.title === 'Our Location' ? '_blank' : '_self'}
              rel={info.title === 'Our Location' ? 'noopener noreferrer' : ''}
              className={styles.infoCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className={styles.iconWrapper}>
                {info.icon}
              </div>
              <h3>{info.title}</h3>
              <p>{info.details}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* SECTION 3: CONTACT FORM */}
      <section className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <h2>Send us a Message</h2>
          <p>We'd love to hear from you. Fill out the form below and we'll be in touch.</p>
        </div>

        <motion.div 
          className={styles.contactForm}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={submitHandler}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Parent's Name (Optional)</label>
                <input
                  type="text"
                  name="parentName"
                  value={parentName}
                  onChange={onChange}
                  placeholder="Jane Doe"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Class Interested (Optional)</label>
                <select
                  name="classInterested"
                  value={classInterested}
                  onChange={onChange}
                >
                  <option value="">Select a Class (Optional)</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 6">Class 6</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                </select>
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Your Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={message}
                  onChange={onChange}
                  placeholder="How can we help you?"
                  required
                />
              </div>
            </div>
            <button
              className={`btn btn-primary ${styles.submitBtn} ${submitStatus === 'success' ? styles.btnSuccess : ''}`}
              type="submit"
              disabled={submitStatus === 'sending' || submitStatus === 'success'}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {getButtonContent()}
            </button>
          </form>

          {/* Inline Success / Error Message */}
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                className={styles.statusMessage + ' ' + styles.successMessage}
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaCheckCircle className={styles.statusIcon} />
                <div>
                  <strong>Thank you!</strong> Your form has been submitted successfully.<br />
                  We will contact you soon.
                </div>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                className={styles.statusMessage + ' ' + styles.errorMessage}
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaTimesCircle className={styles.statusIcon} />
                <div>
                  <strong>Sorry, something went wrong.</strong><br />
                  Please try again later.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* SECTION 4: GOOGLE MAP */}
      <section className={styles.mapSection}>
        <MapSection />
      </section>


      {/* SECTION 5: CTA */}
      <section className={styles.ctaSection}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>📌 Visit Our School Today</h2>
          <a href="tel:+917088662773" className={styles.ctaBtn}>
            <FaPhoneAlt /> Call Now
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
