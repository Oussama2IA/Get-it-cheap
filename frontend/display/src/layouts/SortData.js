import { useState, useRef } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons';

export default function SortData({ changeSortMethod }) {
  const sort = useRef('Up');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (event) => {
    if (sort.current !== event.currentTarget.textContent) {
      sort.current = event.currentTarget.textContent;
      changeSortMethod();
    }
    setAnchorEl(null);
  };

  return (
    <div className="bg-white rounded mt-3">
      <Button
        className="icon-button left"
        color="secondary"
        onClick={handleClick}
      >
        <span>Sort by price</span>
        <ArrowDropDownIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleSelect}>Up</MenuItem>
        <MenuItem onClick={handleSelect}>Down</MenuItem>
      </Menu>
    </div>
  );
}
