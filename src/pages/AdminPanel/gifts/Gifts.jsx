import React, { useEffect, useState } from "react";
import DataTable from "../../../components/adminPanel/dataTable/DataTable";
import swal from "sweetalert";

const FIREBASE_URL = "https://coffee-b43b3-default-rtdb.firebaseio.com";

export default function GiftsAdmin() {
  const [gifts, setGifts] = useState([]);
  const [usersMap, setUsersMap] = useState({}); 

  
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

 
  const getAllGifts = async () => {
    try {
      const res = await fetch(`${FIREBASE_URL}/gifts.json`);
      const data = await res.json();
      const allGifts = [];

      if (data) {
        Object.keys(data).forEach((giftId) => {
          const g = data[giftId];
          allGifts.push({
            id: giftId,
            userId: g.userId || "نامشخص",
            username: g.username || "کاربر ناشناس",
            phone: usersMap[g.userId] || "نامشخص", 
            giftName: g.giftName || "بدون نام جایزه",
            giftImg: g.giftImg || "",
            date: g.date || "",
            isReceived: g.isReceived || 0,
          });
        });
      }

      setGifts(allGifts);
    } catch (err) {
      console.error("Error fetching gifts:", err);
      swal("خطا در دریافت جوایز", { icon: "error" });
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
      getAllGifts();
    }
  }, [usersMap]);

  
  const toggleReceived = async (gift) => {
    const path = `${FIREBASE_URL}/gifts/${gift.id}.json`;
    const newStatus = gift.isReceived === 0 ? 1 : 0;

    try {
      await fetch(path, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isReceived: newStatus }),
      });
      swal(`وضعیت دریافت جایزه تغییر کرد`, { icon: "success" });
      getAllGifts();
    } catch (err) {
      console.error("Error updating gift:", err);
      swal("خطا در تغییر وضعیت", { icon: "error" });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">لیست جوایز کاربران</h2>

      <DataTable title=" جوایز">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">نام کاربر</th>
            <th className="px-4 py-2">شماره کاربر</th>
            <th className="px-4 py-2">جایزه</th>
            <th className="px-4 py-2">وضعیت دریافت</th>
            <th className="px-4 py-2">تغییر وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {gifts.length > 0 ? (
            gifts.map((g, index) => (
              <tr key={g.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{g.username}</td>
                <td className="px-4 py-2 text-center">{g.phone}</td>
                <td className="px-4 py-2 text-center flex items-center gap-2">
                  {g.giftName}
                  {g.giftImg && (
                    <img src={g.giftImg} alt={g.giftName} className="w-8 h-8 rounded" />
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  {g.isReceived ? (
                    <span className="text-green-600 font-semibold">دریافت شده</span>
                  ) : (
                    <span className="text-red-500 font-semibold">دریافت نشده</span>
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => toggleReceived(g)}
                    className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                  >
                    {g.isReceived ? "بازگردانی" : "علامت دریافت"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                هیچ جایزه‌ای ثبت نشده است
              </td>
            </tr>
          )}
        </tbody>
      </DataTable>
    </div>
  );
}
