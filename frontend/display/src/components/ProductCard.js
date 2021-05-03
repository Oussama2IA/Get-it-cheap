export default function ProductCard({ product_data }) {
  return (
    <div
      className="card mx-2 my-3"
      style={{
        width: '19rem',
      }}
    >
      <div
        className="d-flex justify-content-center"
        style={{ height: '15rem' }}
      >
        <img
          src={product_data['img']}
          className="card-img-top mx-2 my-2"
          alt={product_data['img']}
          style={{
            width: 'fit-content',
            height: '15rem',
          }}
        />
      </div>
      <div className="card-body">
        <h5
          className="card-title"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            height: '4.5rem',
          }}
        >
          {product_data['name']}
        </h5>
        {`Price : ${product_data['price']}`}
        <p className="mb-1 text-end">
          <a
            href={product_data['url']}
            target="_blank"
            className="btn btn-light"
          >
            source
          </a>
        </p>
      </div>
    </div>
  );
}
