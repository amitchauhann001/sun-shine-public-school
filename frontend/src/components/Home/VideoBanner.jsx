import { useState, useRef } from 'react';
import classes from './VideoBanner.module.scss';
import { FaPlay, FaPause } from 'react-icons/fa';

const VideoBanner = ({ videoUrl, fallbackImage, title, subtitle }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={classes.bannerContainer}>
      <video
        ref={videoRef}
        className={classes.videoBackground}
        autoPlay
        loop
        muted
        playsInline
        poster={fallbackImage}
      >
        <source src={videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={classes.overlay}></div>
      <div className={classes.content}>
        <h1 className={classes.title}>{title || 'Welcome to Sun Shine Public School'}</h1>
        <p className={classes.subtitle}>{subtitle || 'Empowering the Leaders of Tomorrow'}</p>
        <button onClick={togglePlay} className={classes.playButton} aria-label={isPlaying ? 'Pause video' : 'Play video'}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  );
};

export default VideoBanner;
