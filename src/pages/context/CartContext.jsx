import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

 
  useEffect(() => {
    if (!user?.id) {
      setCart([]); 
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(
          `https://coffee-b43b3-default-rtdb.firebaseio.com/carts/${user.id}.json`
        );
        const data = await res.json();
        if (data) setCart(data);
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };

    fetchCart();
  }, [user]);

  
  useEffect(() => {
    if (!user?.id) return;

    const saveCart = async () => {
      try {
        await fetch(
          `https://coffee-b43b3-default-rtdb.firebaseio.com/carts/${user.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );
      } catch (err) {
        console.error("Error saving cart:", err);
      }
    };

    saveCart();
  }, [cart, user]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
