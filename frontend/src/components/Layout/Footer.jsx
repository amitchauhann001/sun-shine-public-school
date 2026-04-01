import { Link } from 'react-router-dom';
import classes from './Footer.module.scss';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={`container ${classes.footerContainer}`}>
        <div className={classes.footerCol}>
          <h3>Sun Shine Public School</h3>
          <p>Empowering students to achieve their full potential up to 10th standard with world-class education.</p>
        </div>
        <div className={classes.footerCol}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/admissions">Admissions</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className={classes.footerCol}>
          <h3>Contact Us</h3>
          <p>Anand Vihar, Ghansali,<br/>Uttarakhand 249155</p>
          <p>Email: sunshineschoolghansali@gmail.com</p>
        </div>
        <div className={classes.footerCol}>
          <h3>Follow Us</h3>
          <div className={classes.socialLinks}>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="https://www.instagram.com/sunshinepublicschool_official/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className={classes.bottomBlock}>
        <p>&copy; {new Date().getFullYear()} Sun Shine Public School Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
