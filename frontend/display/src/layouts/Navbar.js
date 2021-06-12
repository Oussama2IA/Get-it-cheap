import '../styles/Navbar.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Mail as MailIcon,
} from '@material-ui/icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  function menuButton() {
    if (sidebar)
      return {
        text: 'Close',
        icon: <CloseIcon />,
      };
    return {
      text: 'Menu',
      icon: <MenuIcon />,
    };
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo"></div>
        <Link className="menu icon" onClick={showSidebar} to="#">
          {menuButton().icon}
          <span>{menuButton().text}</span>
        </Link>
      </nav>
      <div className={sidebar ? 'overlay active' : 'overlay'}></div>
      <div className={sidebar ? 'sidebar active' : 'sidebar'}>
        <ul>
          <li>
            <Link className="icon" to="/" onClick={showSidebar}>
              <HomeIcon />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link className="icon" to="/about" onClick={showSidebar}>
              <InfoIcon />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link className="icon" to="/contact" onClick={showSidebar}>
              <MailIcon />
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
