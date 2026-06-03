import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ApplyButton from '../components/UI/ApplyButton/ApplyButton';
import classes from './Academics.module.scss';
import { 
  FaBook, 
  FaLanguage, 
  FaCalculator, 
  FaFlask, 
  FaGlobe, 
  FaLaptop, 
  FaLightbulb,
  FaCheckCircle
} from 'react-icons/fa';

const CountUp = ({ end, duration = 2.5, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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

const Academics = () => {
  const levels = [
    { 
      title: 'Primary Section', 
      classes: 'Classes Nursery–V', 
      desc: 'Focus on basic learning, creativity, and building a strong educational foundation for young minds.', 
      icon: <FaBook /> 
    },
    { 
      title: 'Middle Section', 
      classes: 'Classes VI–VIII', 
      desc: 'Strengthening academic concepts and developing critical analytical skills during the formative years.', 
      icon: <FaCalculator /> 
    },
    { 
      title: 'Secondary Section', 
      classes: 'Classes IX–X', 
      desc: 'Rigorous Board exam preparation combined with advanced subject learning for future success.', 
      icon: <FaFlask /> 
    }
  ];

  const subjects = [
    { name: 'English', icon: <FaBook /> },
    { name: 'Hindi', icon: <FaLanguage /> },
    { name: 'Mathematics', icon: <FaCalculator /> },
    { name: 'Science', icon: <FaFlask /> },
    { name: 'Social Science', icon: <FaGlobe /> },
    { name: 'Computer Ed.', icon: <FaLaptop /> },
    { name: 'General Knowledge', icon: <FaLightbulb /> }
  ];

  const methodologies = [
    { title: 'Interactive Methods', desc: 'Focusing on active participation and engagement rather than passive listening.' },
    { title: 'Smart Learning', desc: 'Utilizing modern digital tools and smart techniques for enhanced understanding.' },
    { title: 'Regular Assessments', desc: 'Continuous evaluation to track progress and identify areas for improvement.' },
    { title: 'Individual Attention', desc: 'Maintaining small class sizes to ensure every student’s needs are met.' },
    { title: 'Concept Based', desc: 'Moving away from rote learning towards deep conceptual clarity.' },
    { title: 'Activity Based', desc: 'Learning through doing, making education fun and memorable.' }
  ];

  return (
    <div className={classes.academicsPage}>
      {/* 1. HERO BANNER */}
      <section 
        className={classes.heroBanner}
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/banner4.jpg')` }}
      >
        <div className={classes.overlay}></div>
        <div className={classes.heroContent}>
          <motion.h1 
            initial={{ opacity:0, y:-30 }} 
            animate={{ opacity:1, y:0 }} 
            transition={{ duration: 0.8 }}
          >
            Academics
          </motion.h1>
          <motion.p
            initial={{ opacity:0, y:30 }} 
            animate={{ opacity:1, y:0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Excellence in Education & Learning
          </motion.p>
        </div>
      </section>

      {/* 2. INTRODUCTION */}
      <section className={`${classes.section} ${classes.introSection}`}>
        <div className={classes.container}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={classes.title}>Our Academic Approach</h2>
            <p className={classes.introText}>
              At Sun Shine Public School, Ghansali, we are committed to providing a strong academic foundation that nurtures intellectual growth and critical thinking. Our curriculum is designed to ensure conceptual clarity, discipline, and overall development of students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. CLASSES / LEVELS */}
      <section className={`${classes.section} ${classes.bgLight}`}>
        <div className={classes.container}>
          <div className={classes.levelsGrid}>
            {levels.map((level, i) => (
              <motion.div 
                key={i} 
                className={classes.levelCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={classes.levelIcon}>{level.icon}</div>
                <h3>{level.title}</h3>
                <p><strong>{level.classes}</strong></p>
                <p>{level.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SUBJECTS OFFERED */}
      <section className={classes.section}>
        <div className={classes.container}>
          <h2 className={`${classes.title} ${classes.centered}`}>Subjects Offered</h2>
          <div className={classes.subjectsGrid}>
            {subjects.map((sub, i) => (
              <motion.div 
                key={i} 
                className={classes.subjectItem}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className={classes.subjectIcon}>{sub.icon}</div>
                <span>{sub.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEACHING METHODOLOGY */}
      <section className={`${classes.section} ${classes.bgLight}`}>
        <div className={classes.container}>
          <h2 className={classes.title}>Teaching Methodology</h2>
          <div className={classes.methodologyGrid}>
            {methodologies.map((m, i) => (
              <motion.div 
                key={i} 
                className={classes.methodCard}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <FaCheckCircle className={classes.methodIcon} />
                <div>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RESULTS & ACHIEVEMENTS */}
      <section className={classes.resultsSection}>
        <div className={classes.container}>
          <div className={classes.resultsGrid}>
            <div className={classes.statBox}>
              <h3><CountUp end={100} suffix="%" /></h3>
              <p>Board Result Excellence</p>
            </div>
            <div className={classes.statBox}>
              <h3><CountUp end={55} suffix="+" /></h3>
              <p>JNV & Sainik Selections</p>
            </div>
            <div className={classes.statBox}>
              <h3><CountUp end={10} suffix="+" /></h3>
              <p>Years of Academic Glory</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className={classes.ctaSection}>
        <div className={classes.container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>📌 Enroll Your Child Today</h2>
            <p>Give your child the academic advantage they deserve. Our enrollment process is simple and transparent.</p>
            <div className={classes.btnGroup} style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <ApplyButton />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
