import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ApplyButton from '../components/UI/ApplyButton/ApplyButton';
import classes from './About.module.scss';
import { 
  FaGraduationCap, 
  FaChalkboardTeacher, 
  FaTrophy, 
  FaBook, 
  FaLeaf, 
  FaShieldAlt
} from 'react-icons/fa';

const CountUp = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const endVal = parseInt(end);
      if (start === endVal) return;

      const totalMilisecondsState = duration * 1000;
      const incrementTime = (totalMilisecondsState / endVal);

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === endVal) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const highlights = [
    { icon: <FaGraduationCap />, title: 'Quality Education', desc: 'Providing an exceptional educational experience tailored for modern success.' },
    { icon: <FaChalkboardTeacher />, title: 'Experienced Teachers', desc: 'Our faculty consists of highly qualified and dedicated educators with years of experience.' },
    { icon: <FaTrophy />, title: 'Excellent Results', desc: 'Consistently achieving top-tier academic results and merit positions in boards.' },
    { icon: <FaBook />, title: 'Competitive Exam Success', desc: 'Specialized guidance for JNV, Sainik Schools, and other prestigious exams.' },
    { icon: <FaLeaf />, title: 'Holistic Development', desc: 'Focusing on physical, emotional, and social growth alongside academics.' },
    { icon: <FaShieldAlt />, title: 'Safe Environment', desc: 'A secure and nurturing atmosphere where students feel protected and motivated.' }
  ];

  return (
    <div className={classes.aboutPage}>
      {/* 1. HERO BANNER */}
      <section 
        className={classes.heroBanner} 
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/about-banner.jpg')` }}
      >
        <div className={classes.overlay}></div>
        <div className={classes.heroContent}>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building Bright Futures at Sun Shine Public School, Ghansali
          </motion.p>
        </div>
      </section>

      {/* 2. MAIN CONTENT */}
      <section className={classes.mainContent}>
        <div className="container">
          <motion.div 
            className={classes.textContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              Sun Shine Public School, Ghansali is a leading educational institution committed to providing quality education and overall development of students. Our school focuses on creating a strong academic foundation while nurturing discipline, confidence, and moral values in every child.
            </p>
            <p>
              At SSPS, we believe that education is not limited to textbooks but is a journey of learning, growth, and character building. Our experienced and dedicated teachers use modern teaching methods to make learning effective, interactive, and enjoyable for students.
            </p>
            <p>
              We take pride in our consistent academic excellence, with many of our students successfully selected in prestigious examinations such as <strong>Jawahar Navodaya Vidyalaya (JNV), Sainik Schools</strong>, and other competitive exams.
            </p>
            <p>
              Along with academics, we encourage participation in co-curricular activities to ensure the holistic development of every student. Our aim is to shape responsible, confident, and capable individuals who can contribute positively to society.
            </p>
            <p>
              Sun Shine Public School continues to be one of the best choices for parents seeking a bright future for their children in Ghansali.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. HIGHLIGHTS GRID */}
      <section className={classes.highlightsSection}>
        <div className="container">
          <div className={classes.grid}>
            {highlights.map((h, i) => (
              <motion.div 
                key={i} 
                className={classes.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={classes.iconBox}>{h.icon}</div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. IMAGE + TEXT */}
      <section className={classes.imageTextSection}>
        <div className={`container ${classes.container}`}>
          <motion.div 
            className={classes.imageBox}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src={`${import.meta.env.BASE_URL}images/about-school-core.jpg`} alt="Students Learning" />
          </motion.div>
          <motion.div 
            className={classes.textBox}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Our Core Message</h2>
            <p>
              We are more than just a school; we are a community dedicated to the pursuit of excellence. 
              Our focus is on creating a supportive environment where every child feels valued 
              and challenged to achieve their full potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. STATS SECTION */}
      <section className={classes.statsSection}>
        <div className="container">
          <div className={classes.statsContainer}>
            <div className={classes.statItem}>
              <h3><CountUp end={500} suffix="+" /></h3>
              <p>Active Students</p>
            </div>
            <div className={classes.statItem}>
              <h3><CountUp end={100} suffix="%" /></h3>
              <p>Success Rate</p>
            </div>
            <div className={classes.statItem}>
              <h3><CountUp end={50} suffix="+" /></h3>
              <p>JNV/Sainik Selections</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STUDENT GALLERY */}
      <section className={classes.gallerySection}>
        <div className="container">
          <div className={classes.galleryGrid}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <motion.img 
                key={num}
                src={`${import.meta.env.BASE_URL}images/gallery/img${num}.jpg`} 
                alt={`School Life ${num}`}
                className={classes.galleryImg}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: num * 0.05 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className={classes.ctaSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Join the SSPS Family</h2>
            <p>Admissions are open for the upcoming academic session. Give your child the gift of world-class education and values.</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ApplyButton />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
