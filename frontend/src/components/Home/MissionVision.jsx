import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './MissionVision.module.scss';
import { FaBullseye, FaEye, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MissionVision = () => {
  const [isMissionExpanded, setIsMissionExpanded] = useState(false);
  const [isVisionExpanded, setIsVisionExpanded] = useState(false);

  return (
    <>
      {/* MISSION SECTION - Image Left, Text Right */}
      <section className={`${classes.section} ${classes.bgLight}`}>
        <div className={`container ${classes.container}`}>
          <motion.div 
            className={classes.imageContent}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
             <img src={`${import.meta.env.BASE_URL}images/carousel/8mFm58EC2ju3eZCpinr2JGtOP9kV1DcNYT--qmlD2Jk=_plaintext_638294937418131356.jpg`} alt="Mission" className={classes.image} />
          </motion.div>

          <motion.div 
            className={classes.textContent}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className={classes.heading}>
              <FaBullseye className={classes.icon} /> Mission
            </h2>
            <div className={classes.textBody}>
              <p>At Sun Shine Public School, Ghansali, our mission is to provide quality education that empowers students with knowledge, skills, and strong moral values. We are dedicated to creating a supportive and disciplined learning environment where every child is encouraged to achieve their full potential.</p>
              
              <AnimatePresence>
                {isMissionExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 15 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p>We aim to develop confident, responsible, and compassionate individuals through a balanced approach of academics and co-curricular activities. Our focus is on nurturing critical thinking, creativity, and leadership skills while maintaining high academic standards.</p>
                    <p>We are committed to guiding our students towards excellence and preparing them to succeed in competitive exams such as Jawahar Navodaya Vidyalaya (JNV), Sainik Schools, and other future challenges.</p>
                    <p>Our mission is to shape young minds into responsible citizens who contribute positively to society and build a bright future for themselves and the nation.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                className={classes.readMoreBtn} 
                onClick={() => setIsMissionExpanded(!isMissionExpanded)}
              >
                {isMissionExpanded ? (
                  <>Read Less <FaChevronUp /></>
                ) : (
                  <>Read More <FaChevronDown /></>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VISION SECTION - Text Left, Image Right */}
      <section className={classes.section}>
        <div className={`container ${classes.container}`}>
          <motion.div 
            className={classes.textContent}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={classes.heading}>
              <FaEye className={classes.icon} /> Vision
            </h2>
            <div className={classes.textBody}>
              <p>At Sun Shine Public School, Ghansali, our vision is to be recognized as one of the leading institutions in the region, providing excellence in education and overall development of students. We aim to create a learning environment that inspires curiosity, innovation, and a lifelong love for learning.</p>
              
              <AnimatePresence>
                {isVisionExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 15 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p>Our vision is to nurture young minds into confident, disciplined, and responsible individuals who are prepared to meet the challenges of the modern world. We strive to instill strong moral values, leadership qualities, and a sense of social responsibility in our students. Through continuous improvement and dedication, we envision our students achieving success in academics, competitive exams, and life, while contributing positively to society and the nation.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                className={classes.readMoreBtn} 
                onClick={() => setIsVisionExpanded(!isVisionExpanded)}
              >
                {isVisionExpanded ? (
                  <>Read Less <FaChevronUp /></>
                ) : (
                  <>Read More <FaChevronDown /></>
                )}
              </button>
            </div>
          </motion.div>

          <motion.div 
            className={classes.imageContent}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
             <img src={`${import.meta.env.BASE_URL}images/carousel/IMG20240905113041.jpg`} alt="Vision" className={classes.image} />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MissionVision;
