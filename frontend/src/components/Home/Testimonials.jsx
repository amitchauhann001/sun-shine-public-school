import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import classes from './Testimonials.module.scss';

const testimonials = [
  {
    text: "Sun Shine Public School has transformed my child's confidence and academic performance. The teachers are very supportive.",
    author: "Parent",
    rating: 5
  },
  {
    text: "The school provides a perfect balance between studies and activities. I really enjoy learning here.",
    author: "Student",
    rating: 5
  },
  {
    text: "Excellent teaching methods and discipline. Highly recommended school in Ghansali.",
    author: "Parent",
    rating: 5
  },
  {
    text: "I improved a lot in my studies and communication skills after joining this school.",
    author: "Student",
    rating: 5
  },
  {
    text: "The environment is safe and motivating. Teachers give personal attention to every child.",
    author: "Parent",
    rating: 5
  },
  {
    text: "Best school for overall development. Great focus on both academics and values.",
    author: "Student",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className={classes.testimonialSection}>
      <div className={`container ${classes.container}`}>
        <motion.div 
          className={classes.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={classes.heading}>💬 What Parents & Students Say</h2>
          <p className={classes.subheading}>Real experiences from our school community</p>
          <div className={classes.line}></div>
        </motion.div>

        <div className={classes.grid}>
          {testimonials.map((item, index) => (
            <motion.div 
              key={index}
              className={classes.card}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={classes.quoteIconWrapper}>
                <FaQuoteLeft className={classes.quoteIcon} />
              </div>
              
              <div className={classes.rating}>
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} className={classes.star} />
                ))}
              </div>

              <p className={classes.text}>"{item.text}"</p>
              
              <div className={classes.authorSection}>
                <div className={classes.avatar}>
                  {item.author[0]}
                </div>
                <div className={classes.authorInfo}>
                  <p className={classes.authorName}>{item.author}</p>
                  <p className={classes.authorRole}>Sun Shine Public School</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
