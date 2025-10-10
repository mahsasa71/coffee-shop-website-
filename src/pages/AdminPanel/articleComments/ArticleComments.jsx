import React, { useEffect, useState } from "react";
import DataTable from "../../../components/adminPanel/dataTable/DataTable";
import swal from "sweetalert";

const FIREBASE_URL = "https://coffee-b43b3-default-rtdb.firebaseio.com";

export default function ArticleComments() {
  const [comments, setComments] = useState([]);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [replyText, setReplyText] = useState("");

 
  const getAllComments = async () => {
    try {
      const res = await fetch(`${FIREBASE_URL}/articles.json`);
      const data = await res.json();
      const allComments = [];

      if (data) {
        Object.keys(data).forEach((articleId) => {
          const article = data[articleId];
          const articleTitle = article.title || "بدون عنوان مقاله";

          if (article.comments) {
            Object.keys(article.comments).forEach((commentId) => {
              const c = article.comments[commentId];
              allComments.push({
                id: commentId,
                articleId,
                articleTitle,
                username: c.username || "بدون نام کاربر",
                comment: c.comment || c.text || "بدون متن",
                reply: c.reply || "",
                isAnswered: c.isAnswered || 0,
              });
            });
          }
        });
      }

      setComments(allComments);
    } catch (err) {
      console.error("Error fetching article comments:", err);
      swal("خطا در دریافت کامنت‌های مقالات", { icon: "error" });
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  
  const openReplyModal = (comment) => {
    setCurrentComment(comment);
    setReplyText(comment.reply || "");
    setReplyModalOpen(true);
  };

 
  const saveReply = async () => {
    if (!currentComment) return;

    const path = `${FIREBASE_URL}/articles/${currentComment.articleId}/comments/${currentComment.id}.json`;
    const payload = { reply: replyText, isAnswered: 1 };

    try {
      await fetch(path, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      swal("پاسخ ثبت شد", { icon: "success" });
      setReplyModalOpen(false);
      setCurrentComment(null);
      setReplyText("");
      getAllComments();
    } catch (err) {
      console.error("Error saving reply:", err);
      swal("خطا در ثبت پاسخ", { icon: "error" });
    }
  };

  
  const toggleAnswered = async (comment) => {
    const path = `${FIREBASE_URL}/articles/${comment.articleId}/comments/${comment.id}.json`;
    const newStatus = comment.isAnswered === 0 ? 1 : 0;

    try {
      await fetch(path, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAnswered: newStatus }),
      });
      swal("وضعیت پاسخ تغییر کرد", { icon: "success" });
      getAllComments();
    } catch (err) {
      console.error("Error updating comment status:", err);
      swal("خطا در تغییر وضعیت", { icon: "error" });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">کامنت‌های مقالات</h2>

      <DataTable title=" کامنت‌های مقالات">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">کاربر</th>
            <th className="px-4 py-2">کامنت</th>
            <th className="px-4 py-2">مقاله</th>
            <th className="px-4 py-2">وضعیت پاسخ</th>
            <th className="px-4 py-2">پاسخ دادن</th>
            <th className="px-4 py-2">تغییر وضعیت</th> 
          </tr>
        </thead>
        <tbody>
          {comments.length > 0 ? (
            comments.map((c, index) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{c.username}</td>
                <td className="px-4 py-2">{c.comment}</td>
                <td className="px-4 py-2 text-center">{c.articleTitle}</td>
                <td className="px-4 py-2 text-center">
                  {c.isAnswered ? (
                    <span className="text-green-600 font-semibold">پاسخ داده شده</span>
                  ) : (
                    <span className="text-red-500 font-semibold">پاسخ داده نشده</span>
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => openReplyModal(c)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    پاسخ
                  </button>
                </td>
                
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => toggleAnswered(c)}
                    className={`px-3 py-1 rounded text-white ${
                      c.isAnswered ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {c.isAnswered ? "علامت پاسخ داده نشده" : "علامت پاسخ داده شده"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                هیچ کامنتی یافت نشد
              </td>
            </tr>
          )}
        </tbody>
      </DataTable>

     
      {replyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-2">
              پاسخ به {currentComment.username}
            </h3>
            <p className="mb-2">
              کامنت:{" "}
              <span className="font-medium">{currentComment.comment}</span>
            </p>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              placeholder="پاسخ خود را وارد کنید"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setReplyModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                انصراف
              </button>
              <button
                onClick={saveReply}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                ثبت پاسخ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
