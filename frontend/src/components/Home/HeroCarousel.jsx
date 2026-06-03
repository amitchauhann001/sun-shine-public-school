import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './HeroCarousel.module.scss';

const base = import.meta.env.BASE_URL;

// Static array of 4 images as requested
const CAROUSEL_IMAGES = [
  { url: `${base}images/carousel/8mFm58EC2ju3eZCpinr2JGtOP9kV1DcNYT--qmlD2Jk=_plaintext_638294937418131356.jpg` },
  { url: `${base}images/carousel/IMG20240905080409.jpg` },
  { url: `${base}images/carousel/IMG20240905113041.jpg` },
  { url: `${base}images/carousel/WhatsApp Image 2025-08-15 at 10.16.38_b9e65015.jpg` },
];

const FALLBACK_IMAGE = CAROUSEL_IMAGES[0].url;

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1, zIndex: 1 },
  exit: (dir) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0, zIndex: 0 }),
};

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const totalSlides = CAROUSEL_IMAGES.length;

  // Preload images on mount to prevent flicker
  useEffect(() => {
    CAROUSEL_IMAGES.forEach((image) => {
      const img = new Image();
      img.src = image.url;
    });
  }, []);

  // Stable callbacks for navigation
  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-slide: 4 second interval with proper cleanup
  useEffect(() => {
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext]);

  const currentItem = CAROUSEL_IMAGES[currentIndex] || CAROUSEL_IMAGES[0];

  const handleImageError = (e) => {
    if (e.target.src !== FALLBACK_IMAGE) {
      e.target.src = FALLBACK_IMAGE;
    }
  };

  return (
    <div className={classes.carouselContainer}>
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.img
          key={currentIndex}
          src={currentItem.url}
          alt={`School slide ${currentIndex + 1}`}
          onError={handleImageError}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'tween', duration: 0.6, ease: 'easeInOut' },
            opacity: { duration: 0.4 },
          }}
          className={classes.slide}
        />
      </AnimatePresence>

      {/* Navigation arrows */}
      {totalSlides > 1 && (
        <>
          <button
            className={`${classes.arrow} ${classes.arrowLeft}`}
            onClick={goPrev}
            aria-label="Previous slide"
          >
            &#8249;
          </button>
          <button
            className={`${classes.arrow} ${classes.arrowRight}`}
            onClick={goNext}
            aria-label="Next slide"
          >
            &#8250;
          </button>
        </>
      )}

      {/* Dot indicators */}
      {totalSlides > 1 && (
        <div className={classes.dots}>
          {CAROUSEL_IMAGES.map((_, idx) => (
            <button
              key={idx}
              className={`${classes.dot} ${idx === currentIndex ? classes.dotActive : ''}`}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
