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
  const [currency, setCurrency] = useState({ symbol: 'MAD', rate: 1 });

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
      console.log(result);
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

  const formatPrice = (price) => {
    let formated_price = (price * currency.rate).toString().split('.');
    formated_price[0] = formated_price[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (formated_price[1] === undefined) formated_price[1] = '00';
    else
      formated_price[1] = Number(`.${formated_price[1]}`)
        .toFixed(2)
        .substring(2);
    formated_price = formated_price.join('.');
    formated_price = `${formated_price} ${currency.symbol}`;
    return formated_price;
  };

  const paginate = (number) => setCurrentPage(number);

  return loading ? (
    <Loading />
  ) : (
    <div className="result-page">
      <SearchBox />
      <section className="py-5 container d-flex flex-wrap justify-content-center align-items-start">
        {currentResult.map((product_data) => (
          <ProductCard product_data={product_data} formatPrice={formatPrice} />
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
