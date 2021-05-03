import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Loading from './Loading';

export default function Result(props) {
  let loading = true;
  const [data, setData] = useState({});
  const [result, setResult] = useState({});

  useEffect(() => {
    const category = props.match.params.category;
    const product = props.match.params.product;
    axios
      .post(`/api/search?category=${category}&product=${product}`)
      .then((response) => setData(response.data));
  }, []);

  function getResult() {
    const spider_id = data['spider_id'];
    const search_id = data['search_id'];
    if (spider_id != undefined && search_id != undefined) {
      axios
        .get(`/api/search?spider_id=${spider_id}&search_id=${search_id}`)
        .then((response) => setResult(response.data));
    }
  }

  if (result['status'] != 'Crawling finished') setTimeout(getResult, 5000);
  else {
    const spider_id = data['spider_id'];
    axios.delete(`/api/search?spider_id=${spider_id}`);
    loading = false;
    result['result'].forEach((product_data) => {
      product_data['price'] = Number(Number(product_data['price']).toFixed(2));
    });
  }

  return loading ? (
    <Loading />
  ) : (
    <section className="py-5 container d-flex flex-wrap justify-content-center align-items-start">
      {result['result'].map((product_data) => (
        <ProductCard product_data={product_data} />
      ))}
    </section>
  );
}
