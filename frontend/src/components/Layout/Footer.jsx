import { Link } from 'react-router-dom';
import classes from './Footer.module.scss';
import { FaFacebookF, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={`container ${classes.footerContainer}`}>
        {/* SECTION 1: Brand & Description */}
        <div className={classes.footerCol}>
          <div className={classes.brandSection}>
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="SSPS Logo" className={classes.footerLogo} />
            <h2 className={classes.schoolName}>Sun Shine <span>Public School</span></h2>
          </div>
          <p className={classes.description}>
            Sun Shine Public School, Ghansali provides quality education with a focus on academic excellence, discipline, and overall student development.
          </p>
          <div className={classes.socialLinks}>
            <a href="https://www.facebook.com/share/1RB2NgfbET/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className={classes.socialIcon} title="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/sunshinepublicschool_official/" target="_blank" rel="noopener noreferrer" className={classes.socialIcon} title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@ShinePublicSchoolGhansali" target="_blank" rel="noopener noreferrer" className={`${classes.socialIcon} ${classes.youtube}`} title="Visit our YouTube Channel">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* SECTION 2: Quick Links */}
        <div className={classes.footerCol}>
          <h3 className={classes.colHeading}>Quick Links</h3>
          <ul className={classes.linkList}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* SECTION 3: Contact Info */}
        <div className={classes.footerCol}>
          <h3 className={classes.colHeading}>Contact Us</h3>
          <ul className={classes.contactList}>
            <li>
              <a href="https://maps.app.goo.gl/p7Y8AiLbkzckoDbx9" target="_blank" rel="noopener noreferrer">
                <FaMapMarkerAlt className={classes.contactIcon} />
                <span>Anand Vihar, Ghansali, Tehri Garhwal, Uttarakhand 249155</span>
              </a>
            </li>
            <li>
              <a href="tel:7088662773">
                <FaPhoneAlt className={classes.contactIcon} />
                <span>+91 7088662773</span>
              </a>
            </li>
            <li>
              <a href="mailto:sunshineschoolghansali@gmail.com">
                <FaEnvelope className={classes.contactIcon} />
                <span>sunshineschoolghansali@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={classes.bottomBar}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Sun Shine Public School. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
