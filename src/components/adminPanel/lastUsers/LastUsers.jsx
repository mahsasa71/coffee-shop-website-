import React, { useEffect, useState } from "react";

export default function LastUsers() {
  const [users, setUsers] = useState([]);
  const [showPasswords, setShowPasswords] = useState({});

  useEffect(() => {
    fetch("https://coffee-b43b3-default-rtdb.firebaseio.com/users.json")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const loadedUsers = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setUsers(loadedUsers);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const togglePassword = (userId) => {
    setShowPasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">کاربران اخیر</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">شناسه</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">نام</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">نام خانوادگی</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">تلفن</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">ایمیل</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">پسورد</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">وضعیت</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-2 text-center text-sm">{index + 1}</td>
                <td className="px-4 py-2 text-center text-sm">{user.firstName}</td>
                <td className="px-4 py-2 text-center text-sm">{user.lastName}</td>
                <td className="px-4 py-2 text-center text-sm">{user.phone}</td>
                <td className="px-4 py-2 text-center text-sm">{user.email}</td>

                <td className="px-4 py-2 text-center text-sm">
                  <span>
                    {showPasswords[user.id] ? user.password : "••••••"}
                  </span>
                  <button
                    type="button"
                    onClick={() => togglePassword(user.id)}
                    className="ml-2 text-sm text-blue-500 hover:underline"
                  >
                    {showPasswords[user.id] ? "مخفی" : "نمایش"}
                  </button>
                </td>

                <td className="px-4 py-2 text-center text-sm">
                  {String(user.isLoggedIn) === "1" ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      آنلاین
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      آفلاین
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
