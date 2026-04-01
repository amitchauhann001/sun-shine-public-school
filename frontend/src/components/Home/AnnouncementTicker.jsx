import { useEffect, useState } from 'react';
import classes from './AnnouncementTicker.module.scss';
import { FaBullhorn } from 'react-icons/fa';
import { useGetSharedAnnouncementsQuery } from '../../store/slices/publicApiSlice';

const AnnouncementTicker = () => {
  const { data: announcements, isLoading } = useGetSharedAnnouncementsQuery();

  if (isLoading || !announcements || announcements.length === 0) {
    return null;
  }

  return (
    <div className={classes.tickerWrapper}>
      <div className={classes.tickerLabel}>
        <FaBullhorn /> Announcements
      </div>
      <div className={classes.tickerContainer}>
        <div className={classes.tickerContent}>
          {announcements.map((item) => (
            <span key={item._id} className={classes.tickerItem}>
              {item.linkUrl ? (
                <a href={item.linkUrl} target="_blank" rel="noopener noreferrer">
                  {item.text}
                </a>
              ) : (
                item.text
              )}
              <span className={classes.separator}>|</span>
            </span>
          ))}
          {/* Duplicate for seamless scrolling */}
          {announcements.map((item) => (
            <span key={`${item._id}-dup`} className={classes.tickerItem}>
              {item.linkUrl ? (
                <a href={item.linkUrl} target="_blank" rel="noopener noreferrer">
                  {item.text}
                </a>
              ) : (
                item.text
              )}
              <span className={classes.separator}>|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
