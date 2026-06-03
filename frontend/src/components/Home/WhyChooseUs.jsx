import { motion } from 'framer-motion';
import classes from './WhyChooseUs.module.scss';
import { FaGraduationCap, FaChalkboardTeacher, FaTrophy, FaMedal, FaGlobe, FaShieldAlt } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaGraduationCap />,
      title: 'Best School in Ghansali',
      description: 'Known for quality education and overall student development in the region.',
      featured: true
    },
    {
      icon: <FaTrophy />,
      title: 'Excellent Academic Results',
      description: 'Consistently achieving top results every year with strong performance.',
      featured: false
    },
    {
      icon: <FaMedal />,
      title: 'Competitive Exams',
      description: 'Many students selected in JNV, Sainik Schools, and other exams.',
      featured: false
    },
    {
      icon: <FaChalkboardTeacher />,
      title: 'Dedicated Teachers',
      description: 'Providing personal attention and effective teaching methods.',
      featured: false
    },
    {
      icon: <FaGlobe />,
      title: 'Holistic Development',
      description: 'Focus on academics, discipline, co-curricular activities, and moral values.',
      featured: false
    },
    {
      icon: <FaShieldAlt />,
      title: 'Safe & Positive Environment',
      description: 'A supportive atmosphere where students feel confident and motivated to learn.',
      featured: false
    }
  ];

  return (
    <section 
      className={classes.whySection}
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/carousel/8mFm58EC2ju3eZCpinr2JGtOP9kV1DcNYT--qmlD2Jk=_plaintext_638294937418131356.jpg')` }}
    >
      <div className={classes.overlay}></div>
      <div className={`container ${classes.container}`}>
        
        <motion.div 
          className={classes.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={classes.heading}>Why Choose Us?</h2>
          <div className={classes.line}></div>
          <p className={classes.subtitle}>We shape young minds into responsible citizens and future leaders</p>
        </motion.div>

        {/* CARDS GRID */}
        <div className={classes.grid}>
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`${classes.card} ${feature.featured ? classes.featuredCard : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={classes.iconWrapper}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
