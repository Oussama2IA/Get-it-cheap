import { useState } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

export default function Search() {
  const [product, setProduct] = useState('');

  function OnFieldChange(e) {
    setProduct(e.target.value.trim());
  }

  return (
    <div className="search-bar">
      <Paper component="form" className="search-box">
        <IconButton className="icon-button" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          className="input"
          placeholder="Search for product"
          onChange={OnFieldChange}
        />
        <IconButton
          className="icon-button"
          aria-label="search"
          component={Link}
          to={`search?product=${product}`}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
