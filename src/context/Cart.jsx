import { createContext, useContext, useState } from "react";

const initialState = {
  cart: [],
  cartItemCount: () => 0,
  addToCart: () => null,
  removeCart: () => null,
  increaseQuantity: () => null,
  decreaseQuantity: () => null,
};

const CartContext = createContext(initialState);

const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialState.cart);

  const cartItemCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const addToCart = (product) => {
    const productIdx = cart.findIndex((item) => item.product.id === product.id);
    console.log(productIdx);

    if (productIdx !== -1) {
      increaseQuantity(product.id);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeCart = (productId) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const increaseQuantity = (productId) => {
    const copy = cart.slice();
    const productIdx = copy.findIndex((item) => item.product.id === productId);
    if (productIdx !== -1) {
      // console.log(productIdx);
      copy[productIdx].quantity += 1;
      // console.log(copy[productIdx].quantity);
      setCart(copy);
    }
  };
  const decreaseQuantity = (productId) => {
    const copy = cart.slice();
    const productIdx = copy.findIndex((item) => item.product.id === productId);
    if (productIdx !== -1 && copy[productIdx].quantity > 1) {
      copy[productIdx].quantity -= 1;
      setCart(copy);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItemCount,
        addToCart,
        removeCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { useCart, CartProvider };
