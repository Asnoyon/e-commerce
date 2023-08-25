import {
  Routes,
  Route,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Product } from "./pages/product/Product";
import { Products } from "./pages/products/Products";
import { Cart } from "./pages/cart/Cart";
import { NotFound } from "./pages/not -found/Not-found";
import { useCart } from "./context/Cart";
const App = () => {
  const { cartItemCount } = useCart();
  const navigate = useNavigate();
  const onSearch = (searchQuery) => {
    navigate(`/?${createSearchParams({ q: searchQuery })}`);
  };
  return (
    <>
      <Navbar onSearch={onSearch} cartItemCount={cartItemCount()} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
