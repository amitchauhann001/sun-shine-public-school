import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import classes from './HeroCarousel.module.scss';
import { useGetSharedCarouselsQuery } from '../../store/slices/publicApiSlice';

const DEFAULT_IMAGES = [
  { url: '/images/banner1.jpg', title: 'Excellence in Education', subtitle: 'Nurturing young minds at Sun Shine Public School' },
  { url: '/images/banner2.jpg', title: 'Modern Facilities', subtitle: 'Providing the best environment for learning' },
  { url: '/images/banner3.jpg', title: 'Holistic Development', subtitle: 'Focusing on academics, sports, and arts' },
  { url: '/images/banner4.jpg', title: 'Bright Futures', subtitle: 'Empowering students for a better tomorrow' },
  { url: '/images/banner5.jpg', title: 'Dynamic Learning', subtitle: 'Interactive and engaging classroom experiences' },
  { url: '/images/banner6.jpg', title: 'Sun Shine Public School', subtitle: 'Anand Vihar, Ghansali, Uttarakhand' }
];

const HeroCarousel = () => {
  const { data: apiCarousels } = useGetSharedCarouselsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Merge API data with defaults or use fallbacks
  const carouselData = apiCarousels && apiCarousels.length > 0 
    ? apiCarousels.map(item => ({
        url: `http://localhost:5000${item.imageUrl}`,
        title: item.title,
        subtitle: item.subtitle || 'Sun Shine Public School'
      }))
    : DEFAULT_IMAGES;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className={classes.carouselContainer}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          className={classes.slide}
          style={{ backgroundImage: `url(${carouselData[currentIndex].url})` }}
        >
          <div className={classes.overlay}></div>
          <div className={classes.content}>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={classes.title}
            >
              {carouselData[currentIndex].title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={classes.subtitle}
            >
              {carouselData[currentIndex].subtitle}
            </motion.p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button className="btn btn-primary">Learn More</button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button className={classes.prevBtn} onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className={classes.nextBtn} onClick={nextSlide}>
        <FaChevronRight />
      </button>

      <div className={classes.dots}>
        {carouselData.map((_, index) => (
          <div 
            key={index} 
            className={`${classes.dot} ${index === currentIndex ? classes.activeDot : ''}`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
