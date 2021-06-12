import '../styles/Footer.scss';
import { Link } from 'react-router-dom';
import { MailOutline as MailOutlineIcon } from '@material-ui/icons';

function Footer() {
  return (
    <Link className="contact icon" to="/contact">
      <MailOutlineIcon />
      <span>Contact us</span>
    </Link>
  );
}

export default Footer;
