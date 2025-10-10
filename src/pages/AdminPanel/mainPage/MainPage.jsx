import React, { useEffect, useState,useContext } from "react";
import Statics from "../../../components/adminPanel/static/Statics";
import UserName from "../../../components/adminPanel/username/UserName";
import LastUsers from "../../../components/adminPanel/lastUsers/LastUsers";
import { AuthContext } from "../../context/AuthContext";
export default function MainPage() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
    const { user } = useContext(AuthContext);
  const [bestProduct, setBestProduct] = useState(null);


  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const res = await fetch(
          "https://coffee-b43b3-default-rtdb.firebaseio.com/users.json"
        );
        const data = await res.json();

        if (data) {
          const usersArray = Object.values(data);
          setTotalUsers(usersArray.length);

        
          const onlineCount = usersArray.filter(
            (u) => String(u.isLoggedIn) === "1"
          ).length;
          setOnlineUsers(onlineCount);
        }
      } catch (error) {
        console.error("❌ خطا در دریافت کاربران:", error);
      }
    };

    fetchUsersData();
  }, []);


  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const res = await fetch(
          "https://coffee-b43b3-default-rtdb.firebaseio.com/orders.json"
        );
        const data = await res.json();

        if (data) {
          const ordersArray = Object.values(data);
          setTotalOrders(ordersArray.length);

          
          const productCount = {};

          ordersArray.forEach((order) => {
            if (order.items && Array.isArray(order.items)) {
              order.items.forEach((item) => {
                const key = item.productName;
                if (key) {
                  if (!productCount[key]) {
                    productCount[key] = {
                      count: 0,
                      photo: item.photo,
                      name: item.productName,
                    };
                  }
                  productCount[key].count += item.quantity || 1;
                }
              });
            }
          });

         
          const sorted = Object.values(productCount)
            .filter((p) => p.count >= 3)
            .sort((a, b) => b.count - a.count);

          if (sorted.length > 0) {
            setBestProduct(sorted[0]);
          }
        }
      } catch (error) {
        console.error("❌ خطا در دریافت سفارشات:", error);
      }
    };

    fetchOrdersData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-8">
      <UserName name={user.name || user.firstName} />


        
      </div>

      <div className="flex flex-wrap mt-5">
      
        <Statics
          title="تعداد اعضا"
          number={totalUsers}
          fromColor="#4f46e5"
          toColor="#3b82f6"
        />

       
        <Statics
          title="تکمیل سفارشات"
          number={totalOrders}
          fromColor="#16a34a"
          toColor="#22c55e"
        />

        
        <Statics
          title="کاربران آنلاین"
          number={onlineUsers}
          fromColor="#f59e0b"
          toColor="#fbbf24"
        />

       
        <Statics
          title="پرفروش‌ترین محصول:"
          number={bestProduct ? bestProduct.count : 0}
          productName={bestProduct?.name}
          productImage={bestProduct?.photo}
          fromColor="#dc2626"
          toColor="#ef4444"
        />

        <div className="w-full mt-6">
          <LastUsers />
        </div>
      </div>
    </>
  );
}
