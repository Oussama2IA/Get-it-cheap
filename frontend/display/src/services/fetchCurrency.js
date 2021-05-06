import axios from 'axios';

export function getCurrency(symbol) {
  axios.get(`/api/currency?symbol=${symbol}`);
}
