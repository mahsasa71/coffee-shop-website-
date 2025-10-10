import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "../../../components/adminPanel/dataTable/DataTable";

const FIREBASE_URL = "https://coffee-b43b3-default-rtdb.firebaseio.com";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const getAllUsers = async () => {
    try {
      const res = await fetch(`${FIREBASE_URL}/users.json`);
      const data = await res.json();
      const map = {};

      if (data) {
        Object.keys(data).forEach((uid) => {
          map[uid] = data[uid].phone || "بدون شماره";
        });
      }

      setUsersMap(map);
    } catch (err) {
      console.error("Error fetching users:", err);
      swal("خطا در دریافت کاربران", { icon: "error" });
    }
  };


  const getAllOrders = async () => {
    try {
      const res = await fetch(`${FIREBASE_URL}/orders.json`);
      const data = await res.json();
      const allOrders = [];

      if (data) {
        Object.keys(data).forEach((orderId) => {
          const o = data[orderId];
  
          const date = o.createdAt
            ? new Date(o.createdAt).toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "نامشخص";

          allOrders.push({
            id: orderId,
            userId: o.userId || "نامشخص",
            userName: o.userName || "کاربر ناشناس",
            phone: usersMap[o.userId] || "نامشخص",
            total: o.total || 0,
            isReceived: o.isReceived || 0,
            items: o.items || [],
            createdAt: date, 
          });
        });
      }

      setOrders(allOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      swal("خطا در دریافت سفارشات", { icon: "error" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (Object.keys(usersMap).length > 0) {
      getAllOrders();
    }
  }, [usersMap]);

 
  const toggleReceived = async (order) => {
    const path = `${FIREBASE_URL}/orders/${order.id}.json`;
    const newStatus = order.isReceived === 0 ? 1 : 0;

    try {
      await fetch(path, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isReceived: newStatus }),
      });
      swal(`وضعیت سفارش تغییر کرد`, { icon: "success" });
      getAllOrders();
    } catch (err) {
      console.error("Error updating order:", err);
      swal("خطا در تغییر وضعیت", { icon: "error" });
    }
  };


  const showCartItems = (items) => {
    setSelectedItems(items);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">لیست سفارشات کاربران</h2>

      <DataTable title="سفارشات">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">نام کاربر</th>
            <th className="px-4 py-2">شماره تلفن</th>
            <th className="px-4 py-2">مبلغ کل (تومان)</th>
            <th className="px-4 py-2">تاریخ ثبت سفارش</th> 
            <th className="px-4 py-2">وضعیت</th>
            <th className="px-4 py-2">مشاهده سبد خرید</th>
            <th className="px-4 py-2">تغییر وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((o, index) => (
              <tr key={o.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{o.userName}</td>
                <td className="px-4 py-2 text-center">{o.phone}</td>
                <td className="px-4 py-2 text-center font-semibold">
                  {o.total.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center">{o.createdAt}</td> 
                <td className="px-4 py-2 text-center">
                  {o.isReceived ? (
                    <span className="text-green-600 font-semibold">
                      دریافت شده
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      دریافت نشده
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => showCartItems(o.items)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    مشاهده محتویات
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => toggleReceived(o)}
                    className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                  >
                    {o.isReceived ? "بازگردانی" : "علامت دریافت"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
                هیچ سفارشی ثبت نشده است
              </td>
            </tr>
          )}
        </tbody>
      </DataTable>

    
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-2xl relative">
            <h3 className="text-xl font-bold mb-4 text-center">
              محتویات سبد خرید
            </h3>

            <ul className="max-h-96 overflow-y-auto space-y-3">
              {selectedItems.length > 0 ? (
                selectedItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.photo}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-semibold">{item.productName}</p>
                        <p className="text-sm text-gray-500">
                          تعداد: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="text-gray-700 font-medium">
                      {item.price?.toLocaleString()} تومان
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">سبد خرید خالی است</p>
              )}
            </ul>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
