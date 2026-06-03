import { useState } from 'react';
import { motion } from 'framer-motion';
import classes from './AimsObjectives.module.scss';
import { FaTasks } from 'react-icons/fa';

const AimsObjectives = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = "At Sun Shine Public School, Ghansali, our aim is to provide a holistic and value-based education that nurtures the intellectual, emotional, and social growth of every student. We strive to create a positive and inclusive learning environment where children are encouraged to explore their potential, think critically, and develop confidence in their abilities. Our objective is to build a strong academic foundation through effective teaching methods while also promoting discipline, creativity, and moral values. We focus on developing communication skills, leadership qualities, and a sense of responsibility among students so they can face future challenges with determination. Along with academics, we emphasize co-curricular activities to ensure overall personality development. We are committed to shaping responsible citizens who respect others, contribute positively to society, and carry forward the values of honesty, hard work, and integrity throughout their lives.";
  
  const shortText = "At Sun Shine Public School, Ghansali, our aim is to provide a holistic and value-based education that nurtures the intellectual, emotional, and social growth of every student. We strive to create a positive and inclusive learning environment where children are encouraged to explore their potential, think critically, and develop confidence in their abilities...";

  return (
    <section className={classes.aimsSection}>
      <div className={`container ${classes.container}`}>
        <motion.div 
          className={classes.textContent}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={classes.heading}>
             <FaTasks className={classes.icon} /> Aims & Objectives
          </h2>
          <div className={classes.textBody}>
            <p>
              {isExpanded ? fullText : shortText}
            </p>
            <button 
              className={classes.readMoreBtn} 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
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
           <img src={`${import.meta.env.BASE_URL}images/carousel/IMG20240905080409.jpg`} alt="Education" className={classes.image} />
        </motion.div>
      </div>
    </section>
  );
};

export default AimsObjectives;
