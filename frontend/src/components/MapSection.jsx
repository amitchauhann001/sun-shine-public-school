import React from "react";
import styles from "./MapSection.module.scss";

const MapSection = () => {
  return (
    <div className={styles.mapContainer}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55044.623733052984!2d78.59277952167969!3d30.427908799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39085595f9c1bed1%3A0xe45af610c2ea635f!2sSun%20Shine%20Public%20School%20-%20Best%20school%20in%20Ghansali%2C%20Tehri%20Garhwal%2C%20Uttarakhand%20%7C%20English%20Medium%20School!5e0!3m2!1sen!2sin!4v1780143225001!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Sun Shine Public School Location"
      />
    </div>
  );
};

export default MapSection;
