import { useState, useEffect, useRef } from 'react';
import {
  getProduct,
  postProduct,
  deleteProduct,
} from '../services/fetchProduct';
import { getCurrencyRate } from '../services/fetchCurrency';
import ProductCard from '../layouts/ProductCard';
import Loading from './Loading';
import SearchBox from '../layouts/SearchBox';
import PaginationBox from '../layouts/PaginationBox';
import CurrencyMenu from '../layouts/CurrencyMenu';
import SortData from '../layouts/SortData';

export default function Result(props) {
  let category = props.match.params.category;
  let product = props.match.params.product;
  const loading = useRef(true);
  const productPerPage = 20;
  const [currentResult, setCurrentResult] = useState([]);
  const [data, setData] = useState({});
  const [result, setResult] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const currencySymbol = useRef('MAD');
  const [currencyRate, setCurrencyRate] = useState(1);

  useEffect(() => {
    postProduct(category, product).then((response) => setData(response.data));
    loading.current = true;
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
    loading.current = false;
  }

  const formatPrice = (price) => {
    let formated_price = (price / currencyRate).toString().split('.');
    formated_price[0] = formated_price[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (formated_price[1] === undefined) formated_price[1] = '00';
    else
      formated_price[1] = Number(`.${formated_price[1]}`)
        .toFixed(2)
        .substring(2);
    formated_price = formated_price.join('.');
    formated_price = `${formated_price} ${currencySymbol.current}`;
    return formated_price;
  };

  const changeCurrency = (currency) => {
    currencySymbol.current = currency;
    if (currency === 'MAD') setCurrencyRate(1);
    else
      getCurrencyRate(currency).then((response) =>
        setCurrencyRate(response.data.rate)
      );
  };

  const changeSortMethod = () =>
    setResult({
      status: result['status'],
      result: result['result'].reverse(),
    });

  const paginate = (number) => setCurrentPage(number);

  return loading.current ? (
    <Loading />
  ) : (
    <div className="result-page">
      <SearchBox />
      <div className="features">
        <CurrencyMenu changeCurrency={changeCurrency} />
        <SortData changeSortMethod={changeSortMethod} />
      </div>
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
