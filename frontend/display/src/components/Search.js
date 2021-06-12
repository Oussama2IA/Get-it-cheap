import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SearchBox from '../layouts/SearchBox';

export default function Search() {
  return (
    <div className="search-page">
      <SearchBox />
      <div className="content">
        <div className="header">Get It Cheap</div>
        <p className="description">
          I like all about computer science, especially if it's merged with AI
          (artificial intelligence).
        </p>
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
