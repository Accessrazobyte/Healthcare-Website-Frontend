import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: p.qty - 1 } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, increaseQty, decreaseQty, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
