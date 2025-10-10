import React, { useEffect, useState } from "react";
import DataTable from "../../../components/adminPanel/dataTable/DataTable";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as yup from "yup";

const FIREBASE_URL = "https://coffee-b43b3-default-rtdb.firebaseio.com";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);

  
  const getAllArticles = () => {
    fetch(`${FIREBASE_URL}/articles.json`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          setArticles([]);
          return;
        }
        const loadedArticles = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setArticles(loadedArticles);
      });
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  
  const validationSchema = yup.object({
    title: yup.string().required("عنوان الزامی است"),
    description: yup.string().required("توضیحات الزامی است"),
    photo: yup
      .string()
      .matches(/^(https?:\/\/|\/).+/, "باید لینک معتبر یا مسیر نسبی باشد")
      .required("تصویر الزامی است"),
    dateDay: yup.string().required("روز الزامی است"),
    dateMonth: yup.string().required("ماه الزامی است"),
    dateYear: yup.string().required("سال الزامی است"),
  });

  
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      photo: "",
      dateDay: "",
      dateMonth: "",
      dateYear: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);

      const articleData = {
        title: values.title,
        description: values.description,
        photo: values.photo,
        date: {
          day: values.dateDay,
          month: values.dateMonth,
          year: values.dateYear,
        },
      };

      const method = editingArticleId ? "PATCH" : "POST";
      const url = editingArticleId
        ? `${FIREBASE_URL}/articles/${editingArticleId}.json`
        : `${FIREBASE_URL}/articles.json`;

      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleData),
      })
        .then(() => {
          swal(editingArticleId ? "مقاله ویرایش شد" : "مقاله اضافه شد", {
            icon: "success",
          });
          getAllArticles();
          resetForm();
          setEditingArticleId(null);
          setPreview(null);
        })
        .catch((err) => console.error("Error adding/editing article:", err))
        .finally(() => setIsSubmitting(false));
    },
  });


  const startEditArticle = (article) => {
    setEditingArticleId(article.id);
    formik.setValues({
      title: article.title || "",
      description: article.description || "",
      photo: article.photo || "",
      dateDay: article.date?.day || "",
      dateMonth: article.date?.month || "",
      dateYear: article.date?.year || "",
    });
    setPreview(article.photo || null);
  };

 
  const removeArticle = (id) => {
    swal({
      title: "آیا مطمئن هستید؟",
      text: "این مقاله حذف خواهد شد",
      icon: "warning",
      buttons: ["خیر", "بله"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`${FIREBASE_URL}/articles/${id}.json`, { method: "DELETE" }).then(
          () => {
            swal("مقاله حذف شد", { icon: "success" });
            getAllArticles();
          }
        );
      }
    });
  };

  return (
    <div className="p-6">
      
      <form
        onSubmit={formik.handleSubmit}
        className="mb-6 p-4 border rounded-lg shadow-md bg-white"
      >
        <h2 className="text-lg font-bold mb-4">
          {editingArticleId ? "ویرایش مقاله" : "افزودن مقاله"}
        </h2>

       
        <input
          type="text"
          name="title"
          placeholder="عنوان مقاله"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        {formik.errors.title && (
          <p className="text-red-500 text-sm">{formik.errors.title}</p>
        )}

        
        <textarea
          name="description"
          placeholder="توضیحات مقاله"
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
          placeholder="لینک یا مسیر تصویر مقاله"
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
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("image", file);

            fetch(
              `https://api.imgbb.com/1/upload?key=56404911ad29f0ca488198949f6fc19e`,
              { method: "POST", body: formData }
            )
              .then((res) => res.json())
              .then((data) => {
                const url = data.data.url;
                formik.setFieldValue("photo", url);
                setPreview(url);
              })
              .catch((err) => {
                console.error("Error uploading image:", err);
                swal("خطا در آپلود عکس", { icon: "error" });
              });
          }}
          className="w-full p-2 border rounded mb-2"
        />

       
        {preview && (
          <img
            src={preview}
            alt="پیش‌نمایش مقاله"
            className="w-32 h-32 object-cover rounded mb-2"
          />
        )}

        
        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            name="dateDay"
            placeholder="روز"
            value={formik.values.dateDay}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="dateMonth"
            placeholder="ماه"
            value={formik.values.dateMonth}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="dateYear"
            placeholder="سال"
            value={formik.values.dateYear}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded mb-2"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {editingArticleId ? "ویرایش مقاله" : "افزودن مقاله"}
          </button>

          {editingArticleId && (
            <button
              type="button"
              onClick={() => {
                setEditingArticleId(null);
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

      
      <DataTable title="لیست مقالات">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">عکس</th>
            <th className="px-4 py-2">عنوان</th>
            <th className="px-4 py-2">تاریخ</th>
            <th className="px-4 py-2">توضیحات</th>
            <th className="px-4 py-2">ویرایش</th>
            <th className="px-4 py-2">حذف</th>
          </tr>
        </thead>
        <tbody>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <tr key={article.id} className="border-t">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">
                  {article.photo ? (
                    <img
                      src={article.photo}
                      alt={article.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "بدون تصویر"
                  )}
                </td>
                <td className="px-4 py-2 text-center">{article.title}</td>
                <td className="px-4 py-2 text-center">
                  {article.date?.day} {article.date?.month} {article.date?.year}
                </td>
                <td className="px-4 py-2 text-center">
                  {article.description}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => startEditArticle(article)}
                    className="text-sm text-yellow-500 hover:underline"
                  >
                    ویرایش
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeArticle(article.id)}
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
                هیچ مقاله‌ای یافت نشد
              </td>
            </tr>
          )}
        </tbody>
      </DataTable>
    </div>
  );
}
