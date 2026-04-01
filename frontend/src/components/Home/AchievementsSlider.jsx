import { useState, useEffect } from 'react';
import { useGetSharedAchievementsQuery } from '../../store/slices/publicApiSlice';
import classes from './AchievementsSlider.module.scss';
import { FaChevronLeft, FaChevronRight, FaTrophy } from 'react-icons/fa';

const AchievementsSlider = () => {
  const { data: achievements, isLoading, error } = useGetSharedAchievementsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!achievements || achievements.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === achievements.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [achievements]);

  if (isLoading) return <div className={classes.loader}>Loading Achievements...</div>;
  if (error || !achievements || achievements.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex(currentIndex === achievements.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? achievements.length - 1 : currentIndex - 1);
  };

  return (
    <section className={`section ${classes.achievementsSection}`}>
      <div className="container">
        <h2 className="section-title">Student Achievements</h2>
        
        <div className={classes.sliderContainer}>
          <button className={`${classes.navBtn} ${classes.prevBtn}`} onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          
          <div className={classes.slidesWrapper}>
            {achievements.map((item, index) => (
              <div 
                key={item._id} 
                className={`${classes.slide} ${index === currentIndex ? classes.active : ''}`}
                style={{ transform: `translateX(${100 * (index - currentIndex)}%)` }}
              >
                <div className={classes.card}>
                  <div className={classes.imageHolder}>
                    {item.imageUrl ? (
                      <img src={`http://localhost:5000${item.imageUrl}`} alt={item.studentName} />
                    ) : (
                      <div className={classes.placeholderIcon}><FaTrophy /></div>
                    )}
                  </div>
                  <div className={classes.info}>
                    <h3>{item.studentName}</h3>
                    <p className={classes.year}>{item.year}</p>
                    <p className={classes.detail}>{item.achievementDetail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className={`${classes.navBtn} ${classes.nextBtn}`} onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </div>
        
        <div className={classes.dots}>
          {achievements.map((_, index) => (
            <span 
              key={index} 
              className={`${classes.dot} ${index === currentIndex ? classes.activeDot : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSlider;
