import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Paper, InputBase, Button, Menu, MenuItem } from '@material-ui/core';
import {
  Search as SearchIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';

export default function SearchBox() {
  const category = useRef('general');
  const [product, setProduct] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  function handleFieldChange(event) {
    setProduct(event.target.value.trim());
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (event) => {
    category.current = event.currentTarget.textContent;
    setAnchorEl(null);
  };

  return (
    <div className="search-box">
      <Paper component="form" className="box-wrapper">
        <Button
          className="icon-button left"
          color="secondary"
          onClick={handleClick}
        >
          <span>{category.current}</span>
          <ArrowDropDownIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleSelect}>general</MenuItem>
          <MenuItem onClick={handleSelect}>phones</MenuItem>
          <MenuItem onClick={handleSelect}>laptops</MenuItem>
          <MenuItem onClick={handleSelect}>accessories</MenuItem>
        </Menu>
        <InputBase
          className="input"
          placeholder="Search for product"
          onChange={handleFieldChange}
        />
        <Button
          className="icon-button right"
          aria-label="search"
          color="secondary"
          component={Link}
          to={`/${category.current}/${product}`}
        >
          <SearchIcon />
        </Button>
      </Paper>
    </div>
  );
}
