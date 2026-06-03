import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaPhoneAlt, FaFileUpload } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './Admissions.module.scss';

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    studentClass: '',
    message: ''
  });
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { studentName, parentName, phone, email, studentClass, message } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onFileChange = (e) => setPhoto(e.target.files[0]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!studentName || !parentName || !phone || !studentClass || !email) {
      toast.error('Please fill all required fields');
      return;
    }
    setIsSubmitting(true);

    const data = new FormData();
    data.append('studentName', studentName);
    data.append('parentName', parentName);
    data.append('phone', phone);
    data.append('email', email);
    data.append('studentClass', studentClass);
    data.append('message', message);
    if (photo) data.append('photo', photo);

    try {
      await axios.post('/api/admissions', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Message Sent Successfully');
      setFormData({ studentName: '', parentName: '', phone: '', email: '', studentClass: '', message: '' });
      setPhoto(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to Send Message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const classesList = [
    'Nursery', 'LKG', 'UKG',
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'
  ];

  return (
    <div className={classes.admissionsPage}>
      {/* 1. HEADER */}
      <section className={classes.hero}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Join the Sun Shine Family
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Admissions Open for 2026–27
        </motion.p>
      </section>

      {/* 2. QUICK INFO */}
      <section className={classes.quickInfo}>
        <div className={classes.infoCard}>
          <span className={classes.icon}><FaGraduationCap /></span>
          <h3>Classes Available</h3>
          <p>Nursery to Class 10</p>
        </div>
        <div className={classes.infoCard}>
          <span className={classes.icon}><FaCalendarAlt /></span>
          <h3>Academic Session</h3>
          <p>2026–27</p>
        </div>
        <div className={classes.infoCard}>
          <span className={classes.icon}><FaPhoneAlt /></span>
          <h3>Contact Office</h3>
          <p>7088662773</p>
        </div>
      </section>

      {/* 3. PROCESS */}
      <section className={classes.processSection}>
        <h2>Simple Application Process</h2>
        <div className={classes.steps}>
          <div className={classes.step}>
            <div className={classes.number}>1</div>
            <p>Fill the application form</p>
          </div>
          <div className={classes.step}>
            <div className={classes.number}>2</div>
            <p>Submit required documents</p>
          </div>
          <div className={classes.step}>
            <div className={classes.number}>3</div>
            <p>School will contact you</p>
          </div>
          <div className={classes.step}>
            <div className={classes.number}>4</div>
            <p>Admission confirmation</p>
          </div>
        </div>
      </section>

      {/* 4. APPLICATION FORM */}
      <section className={classes.formSection}>
        <motion.div 
          className={classes.formWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Apply Online</h2>

          <form onSubmit={submitHandler}>
            <div className={classes.formGroup}>
              <label>Student Full Name</label>
              <input
                type="text"
                name="studentName"
                value={studentName}
                onChange={onChange}
                required
                placeholder="Enter student name"
              />
            </div>
            <div className={classes.formGroup}>
              <label>Parent/Guardian Name</label>
              <input
                type="text"
                name="parentName"
                value={parentName}
                onChange={onChange}
                required
                placeholder="Enter parent name"
              />
            </div>
            <div className={classes.formGroup}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={onChange}
                required
                placeholder="Enter 10-digit mobile number"
              />
            </div>
            <div className={classes.formGroup}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                placeholder="Enter parent's email address"
              />
            </div>
            <div className={classes.formGroup}>
              <label>Class Applying For</label>
              <select
                name="studentClass"
                value={studentClass}
                onChange={onChange}
                required
              >
                <option value="">-- Select Class --</option>
                {classesList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className={classes.formGroup}>
              <label>Student Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
            </div>
            <div className={classes.formGroup}>
              <label>Message (Optional)</label>
              <textarea
                name="message"
                value={message}
                onChange={onChange}
                rows="3"
                placeholder="Any special notes or queries?"
              />
            </div>
            <button
              type="submit"
              className={`btn btn-primary ${classes.submitBtn}`}
              disabled={isSubmitting}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div> Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        </motion.div>
      </section>

      {/* 5. CTA HELP */}
      <section className={classes.helpSection}>
        <h3>Need Help with Admission?</h3>
        <a href="tel:7088662773" className={classes.callBtn}>
          <FaPhoneAlt /> Call Our Support Office
        </a>
      </section>
    </div>
  );
};

export default Admissions;
