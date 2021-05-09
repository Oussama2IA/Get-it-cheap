import { useState, useRef } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons';

export default function CurrencyMenu({ changeCurrency }) {
  const currency = useRef('MAD');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (event) => {
    currency.current = event.currentTarget.textContent;
    changeCurrency(currency.current);
    setAnchorEl(null);
  };

  return (
    <div className="bg-white rounded mt-3">
      <Button
        className="icon-button left"
        color="secondary"
        onClick={handleClick}
      >
        <span>{currency.current}</span>
        <ArrowDropDownIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleSelect}>MAD</MenuItem>
        <MenuItem onClick={handleSelect}>USD</MenuItem>
        <MenuItem onClick={handleSelect}>EUR</MenuItem>
        <MenuItem onClick={handleSelect}>GBP</MenuItem>
        <MenuItem onClick={handleSelect}>CNY</MenuItem>
        <MenuItem onClick={handleSelect}>JPY</MenuItem>
        <MenuItem onClick={handleSelect}>AUD</MenuItem>
        <MenuItem onClick={handleSelect}>SGD</MenuItem>
        <MenuItem onClick={handleSelect}>CAD</MenuItem>
        <MenuItem onClick={handleSelect}>JOD</MenuItem>
        <MenuItem onClick={handleSelect}>SAR</MenuItem>
      </Menu>
    </div>
  );
}
