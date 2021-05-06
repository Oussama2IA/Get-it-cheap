import { useState, useEffect } from 'react';
import {
  getProduct,
  postProduct,
  deleteProduct,
} from '../services/fetchProduct';
import ProductCard from './ProductCard';
import Loading from './Loading';
import SearchBox from '../layouts/SearchBox';
import PaginationBox from '../layouts/PaginationBox';

export default function Result(props) {
  let category = props.match.params.category;
  let product = props.match.params.product;
  let loading = true;
  const productPerPage = 20;
  const [currentResult, setCurrentResult] = useState([]);
  const [data, setData] = useState({});
  const [result, setResult] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (number) => setCurrentPage(number);

  useEffect(() => {
    postProduct(category, product).then((response) => setData(response.data));
    loading = true;
    setResult({});
  }, [product, category]);

  useEffect(() => {
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    if (result['result'] !== undefined) {
      setCurrentResult(
        result['result'].slice(indexOfFirstProduct, indexOfLastProduct)
      );
    }
  }, [currentPage, result]);

  function getResult() {
    const spider_id = data['spider_id'];
    const search_id = data['search_id'];
    if (spider_id !== undefined && search_id !== undefined) {
      getProduct(spider_id, search_id).then((response) =>
        setResult(response.data)
      );
    }
  }

  if (result['status'] !== 'Crawling finished') setTimeout(getResult, 5000);
  else {
    const search_id = data['search_id'];
    deleteProduct(search_id);
    loading = false;
  }

  const formatPrice = (result) => {
    result.forEach((product_data) => {
      if (!product_data['price'].toString().includes(',')) {
        let price = product_data['price'].toString().split('.');
        price[0] = price[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (price[1] === undefined) price[1] = '00';
        else price[1] = Number('.'.concat(price[1])).toFixed(2).substring(2);
        price = price.join('.');
        product_data['price'] = price.concat(' MAD');
      }
    });
    return result;
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="result-page">
      <SearchBox />
      <section className="py-5 container d-flex flex-wrap justify-content-center align-items-start">
        {formatPrice(currentResult).map((product_data) => (
          <ProductCard product_data={product_data} />
        ))}
      </section>
      <PaginationBox
        totalProducts={result['result'].length}
        productPerPage={productPerPage}
        paginate={paginate}
      />
    </div>
  );
}
