import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SearchBox from '../layouts/SearchBox';

export default function Search() {
  return (
    <div className="search-page">
      <div className="logo"></div>
      <SearchBox />
      <div className="content">
        <div className="header">
          Get your product at the best price you can without losing time.
        </div>
        <div className="links">
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/contact"
          >
            Contact Us
          </Button>
          <h3>or</h3>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/about"
          >
            Read More About Us
          </Button>
        </div>
      </div>
    </div>
  );
}
