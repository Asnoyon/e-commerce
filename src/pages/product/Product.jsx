import "./product.css";
import { FakeStoreApi } from "../../services/fake-store-api";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../context/Cart";
const Product = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const { productId } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const product = await FakeStoreApi.fetchProductById(productId);
      setProduct(product);
      setLoading(false);
    };
    fetchProduct().catch(console.error);
  }, [productId]);

  if (!loading && !product) {
    return (
      <div className="container">
        <div className="product py-2">
          <div className="details p-3 ">
            Product not found. Please visit
            <Link className="px-1" to="/" replace>
              Homepage
            </Link>
            to see all available products
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      {loading ? (
        <div className={"loader"}></div>
      ) : (
        <div className="product py-2">
          <div className="details grid p-3">
            <div className="product-image">
              <img src={product.image} alt="product" />
            </div>
            <div className="info">
              <div className="description">
                <h3>{product.title}</h3>
                <p className="my-3">{product.description}</p>
              </div>
              <div className="flex">
                <span className="price">${product.price}</span>
                <span
                  className="cart"
                  onClick={() => addToCart(product)}
                >
                  <img src="/cart3.png" alt="cart_empty"/>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Product };
