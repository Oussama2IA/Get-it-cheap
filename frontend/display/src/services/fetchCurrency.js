import axios from 'axios';

export function getCurrencyRate(symbol) {
  return axios.get(`/api/currency?symbol=${symbol}`);
}
