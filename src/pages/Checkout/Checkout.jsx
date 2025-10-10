import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; 
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); 

  const grandTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) return;
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("لطفا ابتدا وارد شوید!");
      return;
    }

    const orderData = {
      userId: user.id,
      userName: user.name,
      items: cart,
      total: grandTotal,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        "https://coffee-b43b3-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify(orderData),
        }
      );

      const data = await res.json();
      console.log("Order saved:", data);

     
      setCart([]);
      alert("سفارش با موفقیت ثبت شد!");
    } catch (err) {
      console.error("Error saving order:", err);
      alert("مشکلی در ثبت سفارش پیش آمد!");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto mt-5 p-4 md:p-6 md:pt-36">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">سبد خرید شما</h1>

        {cart.length === 0 ? (
          <p className="text-center">سبد خرید شما خالی است.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center border p-4 rounded"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto mb-2 sm:mb-0">
                  <img src={item.photo} className="w-16 h-16 object-cover rounded flex-shrink-0" />
                  <span className="font-medium">{item.productName}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto mb-2 sm:mb-0">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                    className="w-16 text-center border rounded px-1 py-0.5"
                  />
                  <span>{item.price.toLocaleString()} تومان</span>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                  <span className="font-bold">{(item.quantity * item.price).toLocaleString()} تومان</span>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 px-2 py-1 rounded hover:bg-red-100"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between mt-6 p-4 border-t font-bold text-lg">
              <span>مبلغ قابل پرداخت:</span>
              <span>{grandTotal.toLocaleString()} تومان</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded text-lg"
            >
              ثبت نهایی سفارش
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
