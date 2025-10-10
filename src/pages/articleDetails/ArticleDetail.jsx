import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import moment from "moment-jalaali";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function ArticleDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); 


  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `https://coffee-b43b3-default-rtdb.firebaseio.com/articles/${id}.json`
        );
        const data = await res.json();

        if (!data) {
          setArticle(null);
          setLoading(false);
          return;
        }

        setArticle(data);
        setLoading(false);

        
        if (data?.comments) {
          let updated = false;
          const updatedComments = data.comments.map((c) => {
            if (c.reply && !c.replyTimestamp) {
              updated = true;
              return {
                ...c,
                replyTimestamp: Date.now() + Math.floor(Math.random() * 1000),
                isAnswered: 1,
              };
            }
            return c;
          });
          if (updated) {
            await fetch(
              `https://coffee-b43b3-default-rtdb.firebaseio.com/articles/${id}/comments.json`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedComments),
              }
            );
            setArticle((prev) => ({ ...prev, comments: updatedComments }));
          }
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setArticle(null);
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);


  const submitComment = async () => {
    if (!newComment.trim()) return;

    if (!user || user.isLoggedIn !== 1) {
      alert("برای ثبت نظر باید وارد حساب کاربری شوید.");
      return;
    }

    const timestamp = Date.now();
    const comment = {
      id: timestamp.toString(),
      username: user.lastName || user.name || "کاربر",
      text: newComment,
      date: moment(timestamp).format("jYYYY/jMM/jDD HH:mm"),
      timestamp,
      reply: "",
      replyTimestamp: null,
      isAnswered: 0,
    };

    const updatedComments = article.comments
      ? [...article.comments, comment]
      : [comment];

    try {
      await fetch(
        `https://coffee-b43b3-default-rtdb.firebaseio.com/articles/${id}/comments.json`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedComments),
        }
      );
      setArticle({ ...article, comments: updatedComments });
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

 
  const replyComment = async (commentId, replyText) => {
    if (!replyText.trim()) return;
    const updatedComments = article.comments.map((c) =>
      c.id === commentId
        ? {
            ...c,
            reply: replyText,
            replyTimestamp: Date.now(),
            isAnswered: 1,
          }
        : c
    );
    try {
      await fetch(
        `https://coffee-b43b3-default-rtdb.firebaseio.com/articles/${id}/comments.json`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedComments),
        }
      );
      setArticle({ ...article, comments: updatedComments });
    } catch (err) {
      console.error("Error replying comment:", err);
    }
  };

  if (loading) return <p className="text-center py-10">در حال بارگذاری مقاله...</p>;
  if (!article) return <p className="text-center py-10">مقاله پیدا نشد!</p>;

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto mt-40 p-4">
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex justify-center mb-4 md:mb-0">
            <img
              src={article.photo}
              alt={article.title}
              className="w-full max-w-md rounded"
            />
          </div>
          <div className="flex flex-col justify-start">
            <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
         
      <p className="text-sm text-gray-500 mb-4">
        تاریخ انتشار: {article.date.day} {article.date.month} {article.date.year}
      </p>
            {article.description && (
              <p className="text-gray-600 mb-4">{article.description}</p>
            )}
          </div>
        </div>

       
        <div className="mt-10">
          <hr className="my-6" />
          <h2 className="text-xl font-bold mb-4">نظرات کاربران</h2>

       
          {!user || user.isLoggedIn !== 1 ? (
            <p className="text-red-600 font-semibold mb-6">
              برای ثبت نظر باید وارد حساب کاربری شوید.
            </p>
          ) : (
            <div className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md mb-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="نظر خود را بنویسید..."
              />
              <button
                onClick={submitComment}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md"
              >
                ارسال نظر
              </button>
            </div>
          )}

         
          {article.comments && article.comments.filter(c => c.isAnswered === 1).length > 0 ? (
            article.comments
              .filter(c => c.isAnswered === 1)
              .map((comment) => (
                <div
                  key={comment.id}
                  className="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200"
                >
                  <div className="mb-3">
                    <p className="font-semibold text-gray-800">{comment.username}</p>
                    <p className="text-gray-700 mt-1">{comment.text}</p>
                    <p className="text-gray-400 text-xs mt-2">{comment.date}</p>
                  </div>

                  {comment.reply && (
                    <div className="bg-teal-50 p-3 rounded-lg border-l-4 border-teal-500 mt-2">
                      <p className="text-teal-800 font-semibold text-sm">مدیریت</p>
                      <p className="text-teal-800 mt-1">{comment.reply}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {moment(comment.replyTimestamp).format("jYYYY/jMM/jDD HH:mm")}
                      </p>
                    </div>
                  )}

                
                  {isAdmin && !comment.reply && (
                    <div className="flex mt-2">
                      <input
                        type="text"
                        placeholder="پاسخ مدیریت..."
                        className="flex-1 border border-gray-300 px-3 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-teal-400"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            replyComment(comment.id, e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          const input = e.target.previousSibling;
                          replyComment(comment.id, input.value);
                          input.value = "";
                        }}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-r-md"
                      >
                        ارسال
                      </button>
                    </div>
                  )}
                </div>
              ))
          ) : (
            <p className="text-gray-500">هنوز نظری ثبت نشده است.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
