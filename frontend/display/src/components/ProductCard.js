export default function ProductCard({ product_data }) {
  return (
    <div
      className="card mx-1 my-1"
      style={{
        width: '19rem',
        height: '30rem',
      }}
    >
      <img
        src={product_data['img']}
        className="card-img-top"
        alt={product_data['img']}
        style={{
          display: 'block',
          maxWidth: '19rem',
          maxHeight: '19rem',
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{product_data['name']}</h5>
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
