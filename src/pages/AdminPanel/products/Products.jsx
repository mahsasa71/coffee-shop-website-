import React, { useEffect, useState } from "react";
import DataTable from "../../../components/adminPanel/dataTable/DataTable";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as yup from "yup";

const FIREBASE_URL = "https://coffee-b43b3-default-rtdb.firebaseio.com";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null); 


  const getAllProducts = () => {
    fetch(`${FIREBASE_URL}/products.json`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          setProducts([]);
          return;
        }
        const loadedProducts = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProducts(loadedProducts);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);


  const validationSchema = yup.object({
    name: yup.string().required("نام الزامی است"),
    price: yup
      .number()
      .required("قیمت الزامی است")
      .positive("قیمت باید مثبت باشد"),
    description: yup.string().required("توضیحات الزامی است"),
    photo: yup
      .string()
      .matches(/^(https?:\/\/|\/).+/, "باید لینک معتبر یا مسیر نسبی باشد")
      .required("تصویر الزامی است"),
  });


  const formik = useFormik({
    initialValues: { name: "", price: "", description: "", photo: "" },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);

      const productData = {
        name: values.name,
        price: values.price,
        description: values.description,
        photo: values.photo,
      };

      const method = editingProductId ? "PATCH" : "POST";
      const url = editingProductId
        ? `${FIREBASE_URL}/products/${editingProductId}.json`
        : `${FIREBASE_URL}/products.json`;

      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })
        .then(() => {
          swal(editingProductId ? "محصول ویرایش شد" : "محصول اضافه شد", {
            icon: "success",
          });
          getAllProducts();
          resetForm();
          setEditingProductId(null);
          setPreview(null);
        })
        .catch((err) => console.error("Error adding/editing product:", err))
        .finally(() => setIsSubmitting(false));
    },
  });

 
  const startEditProduct = (product) => {
    setEditingProductId(product.id);
    formik.setValues({
      name: product.name || "",
      price: String(product.price || ""),
      description: product.description || "",
      photo: product.photo || "",
    });
    setPreview(product.photo || null);
  };


  const removeProduct = (id) => {
    swal({
      title: "آیا مطمئن هستید؟",
      text: "این محصول حذف خواهد شد",
      icon: "warning",
      buttons: ["خیر", "بله"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`${FIREBASE_URL}/products/${id}.json`, { method: "DELETE" }).then(() => {
          swal("محصول حذف شد", { icon: "success" });
          getAllProducts();
        });
      }
    });
  };

 
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=56404911ad29f0ca488198949f6fc19e`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      const url = data.data.url;
      formik.setFieldValue("photo", url);
      setPreview(url);
    } catch (err) {
      console.error("Error uploading image:", err);
      swal("خطا در آپلود عکس", { icon: "error" });
    }
  };

  return (
    <div className="p-6">

      <form
        onSubmit={formik.handleSubmit}
        className="mb-6 p-4 border rounded-lg shadow-md bg-white"
      >
        <h2 className="text-lg font-bold mb-4">
          {editingProductId ? "ویرایش محصول" : "افزودن محصول"}
        </h2>


        <input
          type="text"
          name="name"
          placeholder="نام محصول"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        {formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}


        <input
          type="number"
          name="price"
          placeholder="قیمت محصول"
          value={formik.values.price}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        {formik.errors.price && (
          <p className="text-red-500 text-sm">{formik.errors.price}</p>
        )}

        
        <textarea
          name="description"
          placeholder="توضیحات محصول"
          value={formik.values.description}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        {formik.errors.description && (
          <p className="text-red-500 text-sm">{formik.errors.description}</p>
        )}

       
        <input
          type="text"
          name="photo"
          placeholder="لینک یا مسیر تصویر محصول"
          value={formik.values.photo}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        {formik.errors.photo && (
          <p className="text-red-500 text-sm">{formik.errors.photo}</p>
        )}

   
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-2"
        />

  
        {preview && (
          <img
            src={preview}
            alt="پیش‌نمایش محصول"
            className="w-32 h-32 object-cover rounded mb-2"
          />
        )}

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-orange-300 text-white rounded hover:bg-orange-200"
          >
            {editingProductId ? "ویرایش محصول" : "افزودن محصول"}
          </button>

          {editingProductId && (
            <button
              type="button"
              onClick={() => {
                setEditingProductId(null);
                formik.resetForm();
                setPreview(null);
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              انصراف
            </button>
          )}
        </div>
      </form>

    
      <DataTable title=" محصولات">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">عکس</th>
            <th className="px-4 py-2">نام</th>
            <th className="px-4 py-2">قیمت</th>
            <th className="px-4 py-2">توضیحات</th>
            <th className="px-4 py-2">ویرایش</th>
            <th className="px-4 py-2">حذف</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">
                  {product.photo ? (
                    <img
                      src={product.photo}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "بدون تصویر"
                  )}
                </td>
                <td className="px-4 py-2 text-center">{product.name}</td>
                <td className="px-4 py-2 text-center">{product.price}</td>
                <td className="px-4 py-2 text-center">{product.description}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => startEditProduct(product)}
                    className="text-sm text-yellow-500 hover:underline"
                  >
                    ویرایش
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                هیچ محصولی یافت نشد
              </td>
            </tr>
          )}
        </tbody>
      </DataTable>
    </div>
  );
}
