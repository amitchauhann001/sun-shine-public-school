import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import classes from './TopBar.module.scss';

const TopBar = ({ isMenuOpen }) => {
  return (
    <div className={`${classes.topBar} ${isMenuOpen ? classes.hideTopBar : ''}`}>
      <div className={`container ${classes.topBarContainer}`}>
        
        {/* Contact Info Group */}
        <div className={classes.contactGroup}>
          <a href="tel:7088662773" className={classes.contactItem} title="Call Us: 7088662773" aria-label="Call Us">
            <FaPhoneAlt className={classes.icon} />
            <span className={classes.text}>+91 7088662773</span>
          </a>
          <a href="mailto:sunshineschoolghansali@gmail.com" className={classes.contactItem} title="Email Us" aria-label="Email Us">
            <FaEnvelope className={classes.icon} />
            <span className={classes.text}>sunshineschoolghansali@gmail.com</span>
          </a>
          <a 
            href="https://maps.app.goo.gl/p7Y8AiLbkzckoDbx9" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${classes.contactItem} ${classes.locationItem}`}
            title="Anand Vihar, Ghansali, Tehri Garhwal, Uttarakhand"
            aria-label="Location: Anand Vihar, Ghansali, Tehri Garhwal, Uttarakhand"
          >
            <FaMapMarkerAlt className={classes.icon} />
            <span className={classes.text}>Anand Vihar, Ghansali, Tehri Garhwal, Uttarakhand</span>
          </a>
        </div>

        {/* Social Media Group */}
        <div className={classes.socialGroup}>
          <a
            href="https://www.facebook.com/share/1RB2NgfbET/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.socialItem}
            aria-label="Facebook"
            title="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/sunshinepublicschool_official/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.socialItem}
            aria-label="Instagram"
            title="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.youtube.com/@ShinePublicSchoolGhansali"
            target="_blank"
            rel="noopener noreferrer"
            className={`${classes.socialItem} ${classes.youtube}`}
            aria-label="YouTube"
            title="Visit our YouTube Channel"
          >
            <FaYoutube />
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopBar;
