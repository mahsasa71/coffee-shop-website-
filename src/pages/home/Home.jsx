import React, { useContext } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import HomeBackGround from "../../components/HomeBackGround/HomeBackGround";
import Products from "../../components/Products/Products";
import { CartContext } from "../context/CartContext";
import Articles from "../../components/articles/Articles";
import CoffeeClub from "../../components/CoffeeClub/CoffeeClub";
import CategoryBanner from "../../components/CategoryBanner/CategoryBanner";
import ContactUs from "../../components/ContactUs/ContactUs";
import ProductsCategory from "../../components/ProductsCategory/ProductsCategory";
import Services from "../../components/Services/Services";
import Info from "../../components/info/Info";
export default function Home() {
  const { cart, setCart } = useContext(CartContext);
  const [mobileCartOpen, setMobileCartOpen] = React.useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      let newCart = [...prevCart];
      if (existingIndex >= 0) {
        newCart[existingIndex].quantity += 1;
      } else {
        newCart.push({ ...product, quantity: 1 });
      }
      return newCart;
    });
    setMobileCartOpen(true);
  };

  const removeCartItem = (index) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) return;
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index].quantity = quantity;
      return newCart;
    });
  };

  return (
    <>
    <div className="font-Dana">

      <Header
        cart={cart}
        removeCartItem={removeCartItem}
        updateQuantity={updateQuantity}
        mobileCartOpen={mobileCartOpen}
        setMobileCartOpen={setMobileCartOpen}
      />
      <div className="font-Dana">
<HomeBackGround />
      </div>
      
          <div className="font-Dana container bg-gray-100 dark:bg-zinc-800 min-h-screen transition-colors duration-300 py-6 md:py-2 mt-[-40px]">
      <Products addToCart={addToCart} />

      <CategoryBanner/>
      <ProductsCategory/>
<CoffeeClub/>
      <Articles/>
      <ContactUs/>
      <Services/>

          </div>
          <Info/>
      <Footer />
    </div>
    </>
  );
}
