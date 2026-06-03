import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDirections } from 'react-icons/fa';
import classes from './LocationSection.module.scss';

const LocationSection = () => {
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55044.623733052984!2d78.59277952167969!3d30.427908799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39085595f9c1bed1%3A0xe45af610c2ea635f!2sSun%20Shine%20Public%20School%20-%20Best%20school%20in%20Ghansali%2C%20Tehri%20Garhwal%2C%20Uttarakhand%20%7C%20English%20Medium%20School!5e0!3m2!1sen!2sin!4v1780143225001!5m2!1sen!2sin";
    const googleMapsUrl = "https://maps.app.goo.gl/p7Y8AiLbkzckoDbx9";

    return (
        <section className={classes.locationSection}>
            <div className={`container ${classes.container}`}>
                <motion.div 
                    className={classes.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={classes.heading}>
                        <FaMapMarkerAlt className={classes.icon} /> Our Location
                    </h2>
                    <div className={classes.line}></div>
                </motion.div>

                <motion.div 
                    className={classes.mapContainer}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className={classes.addressCard}>
                        <p className={classes.address}>
                            <strong>Sun Shine Public School</strong><br />
                            Ghansali, Tehri Garhwal, <br />
                            Uttarakhand, India
                        </p>
                    </div>

                    <div className={classes.iframeWrapper}>
                        <iframe 
                            src={mapUrl}
                            width="100%" 
                            height="400" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="School Location Map"
                        ></iframe>
                    </div>

                    <div className={classes.footerActions}>
                        <a 
                            href={googleMapsUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={classes.directionsBtn}
                        >
                            <FaDirections /> Get Directions
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LocationSection;
