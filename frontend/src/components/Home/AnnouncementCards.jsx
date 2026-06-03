import { useGetSharedAnnouncementsQuery } from '../../store/slices/publicApiSlice';
import classes from './AnnouncementCards.module.scss';
import { FaBullhorn } from 'react-icons/fa';

const AnnouncementCards = () => {
  const { data: announcements, isLoading } = useGetSharedAnnouncementsQuery();

  const displayAnnouncements = (!isLoading && announcements && announcements.length > 0) 
    ? announcements.slice(0, 3) 
    : [];

  if (displayAnnouncements.length === 0) {
    return null;
  }

  return (
    <section className={classes.announcementSection}>
      <div className={`container ${classes.container}`}>
        <h2 className={classes.heading}>
          <FaBullhorn className={classes.icon} /> Announcements
        </h2>
        
        <div className={classes.cardsGrid}>
          {displayAnnouncements.map((item) => (
            <div key={item._id} className={classes.card}>
              <div className={classes.cardContent}>
                <p className={classes.text}>{item.text}</p>
                {item.linkUrl && (
                  <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" className={classes.link}>
                     Read More
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementCards;
