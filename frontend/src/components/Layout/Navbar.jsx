import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiInfo, 
  FiBookOpen, 
  FiImage, 
  FiMail, 
  FiUserPlus 
} from 'react-icons/fi';
import classes from './Navbar.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../store/slices/usersApiSlice';
import { logout } from '../../store/slices/authSlice';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    closeMenu();
  }, [location]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      closeMenu();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className={classes.header}>
      <div className={`container ${classes.navContainer}`}>
        <Link to="/" className={classes.logo} onClick={closeMenu}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="SSPS Logo" className={classes.logoImg} />
          <h2>Sun Shine<span>Public School</span></h2>
        </Link>

        <button className={classes.menuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
          <FiMenu />
        </button>

        <div className={`${classes.overlay} ${isMenuOpen ? classes.overlayActive : ''}`} onClick={closeMenu}></div>

        <nav className={`${classes.nav} ${isMenuOpen ? classes.navActive : ''}`}>
          <div className={classes.drawerHeader}>
            <div className={classes.drawerBranding}>
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="SSPS Logo" />
              <div>
                <h3>Sun Shine</h3>
                <p>Public School</p>
              </div>
            </div>
            <button className={classes.closeBtn} onClick={closeMenu}>
              <FiX />
            </button>
          </div>

          <ul className={classes.navLinks}>
            <li>
              <Link to="/" className={location.pathname === '/' ? classes.active : ''}>
                <FiHome className={classes.linkIcon} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === '/about' ? classes.active : ''}>
                <FiInfo className={classes.linkIcon} />
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link to="/academics" className={location.pathname === '/academics' ? classes.active : ''}>
                <FiBookOpen className={classes.linkIcon} />
                <span>Academics</span>
              </Link>
            </li>
            <li>
              <Link to="/gallery" className={location.pathname === '/gallery' ? classes.active : ''}>
                <FiImage className={classes.linkIcon} />
                <span>Gallery</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className={location.pathname === '/contact' ? classes.active : ''}>
                <FiMail className={classes.linkIcon} />
                <span>Contact</span>
              </Link>
            </li>
            
            <li className={classes.mobileOnly}>
              <Link to="/admissions" className={classes.admissionBtn} onClick={closeMenu}>
                <FiUserPlus className={classes.linkIcon} />
                <span>Apply for Admission</span>
              </Link>
            </li>

            {userInfo && userInfo.isAdmin && (
              <div className={classes.adminLinks}>
                <li><Link to="/admin/dashboard" className="btn btn-primary" onClick={closeMenu}>Dashboard</Link></li>
                <li><button onClick={logoutHandler} className="btn btn-secondary">Logout</button></li>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
