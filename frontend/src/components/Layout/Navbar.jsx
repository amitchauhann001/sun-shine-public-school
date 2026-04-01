import { Link } from 'react-router-dom';
import classes from './Navbar.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../store/slices/usersApiSlice';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className={classes.header}>
      <div className={`container ${classes.navContainer}`}>
        <Link to="/" className={classes.logo}>
          <h2>Sun Shine<span>Public School</span></h2>
        </Link>
        <nav>
          <ul className={classes.navLinks}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {userInfo && userInfo.isAdmin ? (
              <>
                <li><Link to="/admin/dashboard" className="btn btn-primary">Dashboard</Link></li>
                <li><button onClick={logoutHandler} className="btn btn-secondary">Logout</button></li>
              </>
            ) : (
              <li><Link to="/admin/login" className="btn btn-primary">Admin Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
