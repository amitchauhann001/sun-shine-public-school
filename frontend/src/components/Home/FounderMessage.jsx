import { motion } from 'framer-motion';
import classes from './FounderMessage.module.scss';

const FounderMessage = () => {
  return (
    <section className={classes.founderSection}>
      <div className={`container ${classes.container}`}>
        <motion.div 
          className={classes.textContent}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={classes.heading}>Message from the Founder</h2>
          <div className={classes.textBody}>
            <p>
              Education is the foundation upon which we build our future. At Sun Shine Public School, our vision has always been to provide a nurturing and empowering environment where students can discover their true potential.
            </p>
            <p>
              We believe in instilling strong values, encouraging critical thinking, and fostering an inclusive community. Our dedicated educators work tirelessly to ensure that every student is equipped with the knowledge and character required to excel in today's rapidly changing world.
            </p>
            <p>
              I welcome you to our vibrant community, where every student is valued, challenged, and inspired to succeed.
            </p>
            <p className={classes.signature}>— Founder & Principal, Sun Shine Public School</p>
          </div>
        </motion.div>

        <motion.div 
          className={classes.imageContent}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={classes.imageWrapper}>
            <img src={`${import.meta.env.BASE_URL}images/founder.jpg`} alt="Founder and Principal" className={classes.image} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
