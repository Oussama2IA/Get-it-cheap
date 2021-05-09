import { useState, useEffect, useRef } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons';
import { getCurrencyTable } from '../services/fetchCurrency';

export default function CurrencyMenu({ changeCurrency }) {
  const currency = useRef('MAD');
  const [anchorEl, setAnchorEl] = useState(null);
  const [currencyTable, setCurrencyTable] = useState([]);

  useEffect(() => {
    getCurrencyTable().then((response) => setCurrencyTable(response.data));
  }, []);

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
        {currencyTable.map((currency) => (
          <MenuItem onClick={handleSelect}>{currency}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}
