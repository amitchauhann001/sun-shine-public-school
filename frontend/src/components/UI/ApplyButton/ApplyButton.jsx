import { Link } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import classes from './ApplyButton.module.scss';

const ApplyButton = () => {
  return (
    <Link to="/admissions" className={classes.applyBtn}>
      <FaGraduationCap className={classes.icon} /> Apply for Admission →
    </Link>
  );
};

export default ApplyButton;
