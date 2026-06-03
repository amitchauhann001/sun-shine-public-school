import classes from './AnnouncementTicker.module.scss';
import { FaGraduationCap } from 'react-icons/fa';

const AnnouncementTicker = () => {
  const tickerText = "🎓 Admission Open 2026–27 | Apply Now | Limited Seats!";
  
  // Duplicate it to ensure smooth continuous scrolling
  const items = Array(6).fill(tickerText); 

  return (
    <div className={classes.tickerWrapper}>
      <div className={classes.tickerLabel}>
        <FaGraduationCap /> Admissions
      </div>
      <div className={classes.tickerContainer}>
        <div className={classes.tickerContent}>
          {items.map((text, idx) => (
            <span key={idx} className={classes.tickerItem}>
              {text}
              <span className={classes.separator}>|</span>
            </span>
          ))}
          {/* Duplicate set for seamless scrolling */}
          {items.map((text, idx) => (
            <span key={`dup-${idx}`} className={classes.tickerItem}>
              {text}
              <span className={classes.separator}>|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
