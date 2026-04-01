import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../store/slices/usersApiSlice';
import { logout } from '../../store/slices/authSlice';
import classes from './AdminLayout.module.scss';
import { FaTachometerAlt, FaImages, FaBullhorn, FaTrophy, FaSignOutAlt, FaVideo } from 'react-icons/fa';

const AdminLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/admin/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.adminLayout}>
      <aside className={classes.sidebar}>
        <div className={classes.sidebarHeader}>
          <h3>Admin Portal</h3>
          <p>Welcome, {userInfo?.name}</p>
        </div>
        <nav className={classes.navLinks}>
          <Link to="/admin/dashboard"><FaTachometerAlt /> Dashboard</Link>
          <Link to="/admin/announcements"><FaBullhorn /> Announcements</Link>
          <Link to="/admin/achievements"><FaTrophy /> Achievements</Link>
          <Link to="/admin/carousel"><FaImages /> Carousel</Link>
          <button onClick={logoutHandler} className={classes.logoutBtn}><FaSignOutAlt /> Logout</button>
        </nav>
      </aside>
      
      <main className={classes.mainContent}>
        <header className={classes.topHeader}>
          <Link to="/" className="btn btn-secondary" target="_blank">View Live Site</Link>
        </header>
        <div className={classes.pageContent}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
