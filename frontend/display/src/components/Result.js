import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Loading from './Loading';
import SearchBox from '../layouts/SearchBox';

export default function Result(props) {
  let category = props.match.params.category;
  let product = props.match.params.product;
  let loading = true;
  const [data, setData] = useState({});
  const [result, setResult] = useState({});

  useEffect(() => {
    axios
      .post(`/api/search?category=${category}&product=${product}`)
      .then((response) => setData(response.data));
    loading = true;
    setResult({});
  }, [product, category]);

  function getResult() {
    const spider_id = data['spider_id'];
    const search_id = data['search_id'];
    if (spider_id !== undefined && search_id !== undefined) {
      axios
        .get(`/api/search?spider_id=${spider_id}&search_id=${search_id}`)
        .then((response) => setResult(response.data));
    }
  }

  if (result['status'] !== 'Crawling finished') setTimeout(getResult, 5000);
  else {
    const search_id = data['search_id'];
    axios.delete(`/api/search?search_id=${search_id}`);
    loading = false;
    result['result'].forEach((product_data) => {
      let price = product_data['price'].toString().split('.');
      price[0] = price[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (price[1] === undefined) price[1] = '00';
      else price[1] = Number('.'.concat(price[1])).toFixed(2).substring(2);
      price = price.join('.');
      product_data['price'] = price.concat(' MAD');
    });
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="result-page">
      <SearchBox />
      <section className="py-5 container d-flex flex-wrap justify-content-center align-items-start">
        {result['result'].map((product_data) => (
          <ProductCard product_data={product_data} />
        ))}
      </section>
    </div>
  );
}
