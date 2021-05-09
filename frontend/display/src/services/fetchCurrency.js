import axios from 'axios';

export function getCurrencyTable() {
  return axios.get('/api/currencies');
}

export function getCurrencyRate(symbol) {
  return axios.get(`/api/currencies/${symbol}`);
}
