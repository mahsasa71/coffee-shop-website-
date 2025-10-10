import React, { useEffect, useState } from "react";
import DataTable from '../../../components/adminPanel/dataTable/DataTable';
import swal from "sweetalert";
import { useFormik } from 'formik';
import * as yup from 'yup';

const FIREBASE_URL = "https://coffee-b43b3-default-rtdb.firebaseio.com";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch(`${FIREBASE_URL}/users.json`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          const usersArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setUsers(usersArray);
        } else {
          setUsers([]);
        }
      })
      .catch(err => console.error("Error fetching users:", err));
  };

  const removeUser = (userID) => {
    swal({
      title: "آیا از حذف مطمئن هستید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(result => {
      if (result) {
        fetch(`${FIREBASE_URL}/users/${userID}.json`, { method: "DELETE" })
          .then(() => {
            swal("کاربر با موفقیت حذف شد", { icon: "success" });
            getAllUsers();
          })
          .catch(err => console.error("Error deleting user:", err));
      }
    });
  };

  const changeRole = (userID) => {
    swal("لطفا نقش جدید را وارد نمایید (0 = کاربر عادی, 1 = مدیر):", { content: "input" })
      .then(value => {
        if (value !== null && (value === "0" || value === "1")) {
          fetch(`${FIREBASE_URL}/users/${userID}/isAdmin.json`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Number(value)),
          })
          .then(() => {
            swal("نقش کاربر با موفقیت تغییر یافت", { icon: "success" });
            getAllUsers();
          })
          .catch(err => console.error("Error changing role:", err));
        }
      });
  };

  const formik = useFormik({
    initialValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '' },
    enableReinitialize: true,
    validationSchema: yup.object({
      firstName: yup.string().required('نام الزامی میباشد'),
      lastName: yup.string().required('نام خانوادگی الزامی میباشد'),
      email: yup.string().email('ایمیل وارد شده صحیح نیست').required('فیلد ایمیل اجباری است'),
      password: yup.string().matches(/[a-zA-Z0-9]{6,}/, 'کلمه عبور اشتباه است').required('ورود کلمه عبور اجباری است'),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'کلمه عبور مطابقت ندارد').required('تکرار کلمه عبور اجباری است'),
      phone: yup.string().matches(/^[0-9]{10,11}$/, 'شماره تلفن باید 10 یا 11 رقم باشد').required('شماره تلفن اجباری است'),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);

      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phone: values.phone,
        isAdmin: editingUserId ? users.find(u => u.id === editingUserId).isAdmin : 0,
        isLoggedin: 0
      };

      const method = editingUserId ? "PUT" : "POST";
      const url = editingUserId ? `${FIREBASE_URL}/users/${editingUserId}.json` : `${FIREBASE_URL}/users.json`;

      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      .then(() => {
        swal(editingUserId ? "کاربر با موفقیت ویرایش شد" : "کاربر مورد نظر با موفقیت اضافه شد", { icon: "success" });
        getAllUsers();
        resetForm();
        setEditingUserId(null);
      })
      .catch(err => console.error("Error adding/editing user:", err))
      .finally(() => setIsSubmitting(false));
    },
  });

  const startEditUser = (user) => {
    setEditingUserId(user.id);
    formik.setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      confirmPassword: user.password,
      phone: user.phone
    });
  };

  const togglePassword = (userId) => {
    setShowPasswords(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  return (
    <>
<form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 p-5 border rounded-lg bg-gray-50 sm:p-6 md:p-8">
  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
    <input name="firstName" placeholder="نام" onChange={formik.handleChange} value={formik.values.firstName} className="p-2 border rounded flex-1"/>
    <input name="lastName" placeholder="نام خانوادگی" onChange={formik.handleChange} value={formik.values.lastName} className="p-2 border rounded flex-1"/>
  </div>

  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
    <input name="email" placeholder="ایمیل" onChange={formik.handleChange} value={formik.values.email} className="p-2 border rounded flex-1"/>
    <input name="phone" placeholder="شماره تلفن" onChange={formik.handleChange} value={formik.values.phone} className="p-2 border rounded flex-1"/>
  </div>

  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
    <input name="password" type="password" placeholder="کلمه عبور" onChange={formik.handleChange} value={formik.values.password} className="p-2 border rounded flex-1"/>
    <input name="confirmPassword" type="password" placeholder="تکرار کلمه عبور" onChange={formik.handleChange} value={formik.values.confirmPassword} className="p-2 border rounded flex-1"/>
  </div>

  <button type="submit" disabled={isSubmitting} className="bg-orange-200 text-white px-4 py-2 rounded hover:bg-orange-300 w-full md:w-auto">
    {editingUserId ? "ویرایش کاربر" : "ثبت نام"}
  </button>
</form>


      <DataTable title="کاربران">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">شناسه</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">نام</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">نام خانوادگی</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">تلفن</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">ایمیل</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">پسورد</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">نقش</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">تغییر نقش</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">ویرایش</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">حذف</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-4 py-2 text-center">{index + 1}</td>
              <td className="px-4 py-2 text-center">{user.firstName}</td>
              <td className="px-4 py-2 text-center">{user.lastName}</td>
              <td className="px-4 py-2 text-center">{user.phone}</td>
              <td className="px-4 py-2 text-center">{user.email}</td>
              <td className="px-4 py-2 text-center">
                <span>{showPasswords[user.id] ? user.password : "••••••"}</span>
                <button
                  type="button"
                  onClick={() => togglePassword(user.id)}
                  className="ml-2 text-sm text-blue-500 hover:underline"
                >
                  {showPasswords[user.id] ? "مخفی" : "نمایش"}
                </button>
              </td>
              <td className="px-4 py-2 text-center">{user.isAdmin === 1 ? "مدیر" : "کاربر عادی"}</td>
              <td className="px-4 py-2 text-center">
                <button onClick={() => changeRole(user.id)} className="text-sm text-green-500 hover:underline">تغییر نقش</button>
              </td>
              <td className="px-4 py-2 text-center">
                <button onClick={() => startEditUser(user)} className="text-sm text-yellow-500 hover:underline">ویرایش</button>
              </td>
              <td className="px-4 py-2 text-center">
                <button onClick={() => removeUser(user.id)} className="text-sm text-red-500 hover:underline">حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </>
  );
}
