import { Button } from '@material-ui/core';

export default function ProductCard({ product_data, formatPrice }) {
  return (
    <div className="card mx-2 my-3">
      <div className="image-card d-flex justify-content-center">
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
        <h5 className="card-title">{product_data['name']}</h5>
        {`Price : ${formatPrice(product_data['price'])}`}
        <p className="mb-1 text-end">
          <Button
            variant="contained"
            color="secondary"
            href={product_data['url']}
            target="_blank"
          >
            source
          </Button>
        </p>
      </div>
    </div>
  );
}
