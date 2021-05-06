import axios from 'axios';

export function postProduct(category, product) {
  return axios.post(`/api/search?category=${category}&product=${product}`);
}

export function getProduct(spider_id, search_id) {
  return axios.get(`/api/search?spider_id=${spider_id}&search_id=${search_id}`);
}

export function deleteProduct(search_id) {
  return axios.delete(`/api/search?search_id=${search_id}`);
}
