import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import moment from "moment-jalaali";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [newScore, setNewScore] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://coffee-b43b3-default-rtdb.firebaseio.com/products/${id}.json`
        );
        const data = await res.json();

        if (!data) {
          setProduct(null);
          setLoading(false);
          return;
        }

        setProduct(data);
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
              `https://coffee-b43b3-default-rtdb.firebaseio.com/products/${id}/comments.json`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedComments),
              }
            );
            setProduct((prev) => ({ ...prev, comments: updatedComments }));
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === id);
      const newCart = [...prev];
      if (idx >= 0) newCart[idx].quantity += 1;
      else
        newCart.push({
          id,
          productName: product.name,
          price: product.price,
          photo: product.photo,
          quantity: 1,
        });
      return newCart;
    });
  };

  const submitComment = async () => {
    if (!newComment.trim()) {
      alert("لطفا متن کامنت خود را وارد کنید.");
      return;
    }

    if (!newScore) {
      alert("لطفا امتیاز خود را انتخاب کنید.");
      return;
    }

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
      score: parseInt(newScore),
    };

    const updatedComments = product.comments
      ? [...product.comments, comment]
      : [comment];

    try {
      await fetch(
        `https://coffee-b43b3-default-rtdb.firebaseio.com/products/${id}/comments.json`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedComments),
        }
      );
      setProduct({ ...product, comments: updatedComments });
      setNewComment("");
      setNewScore("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const replyComment = async (commentId, replyText) => {
    if (!replyText.trim()) return;

    const updatedComments = product.comments.map((c) =>
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
        `https://coffee-b43b3-default-rtdb.firebaseio.com/products/${id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comments: updatedComments }),
        }
      );
      setProduct({ ...product, comments: updatedComments });
    } catch (err) {
      console.error("Error replying comment:", err);
    }
  };

  useEffect(() => {
    if (!product || !product.comments) return;

    const answeredComments = product.comments.filter((c) => c.isAnswered === 1);
    const totalScore = answeredComments.reduce((sum, c) => sum + (c.score || 0), 0);
    const averageScore = answeredComments.length
      ? Math.round(totalScore / answeredComments.length)
      : 0;

    if (averageScore !== product.courseAverageScore) {
      const updateAverageScore = async () => {
        try {
          await fetch(
            `https://coffee-b43b3-default-rtdb.firebaseio.com/products/${id}.json`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ courseAverageScore: averageScore }),
            }
          );
          setProduct((prev) => ({ ...prev, courseAverageScore: averageScore }));
        } catch (err) {
          console.error("Error updating courseAverageScore:", err);
        }
      };
      updateAverageScore();
    }
  }, [product?.comments]);


  if (loading)
    return (
      <>
        <Header />
        <div className="max-w-5xl mx-auto mt-40 p-4 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <div className="w-full max-w-sm h-80 bg-gray-300 rounded"></div>
            </div>
            <div className="flex flex-col justify-start space-y-4">
              <div className="h-6 bg-gray-300 rounded w-2/3"></div>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-gray-300 rounded"></div>
                ))}
              </div>
              <div className="h-5 bg-gray-300 rounded w-1/3"></div>
              <div className="h-20 bg-gray-300 rounded"></div>
              <div className="h-10 bg-gray-400 rounded w-full"></div>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-lg p-4 border border-gray-300 space-y-3"
              >
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </>
    );

  if (!product) return <p className="text-center py-10">محصول پیدا نشد!</p>;

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto mt-40 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center">
            <img
              src={product.photo}
              alt={product.name}
              className="w-full max-w-sm rounded"
            />
          </div>
          <div className="flex flex-col justify-start">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={
                    i <= (product.courseAverageScore || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  ⭐
                </span>
              ))}
            </div>
            <p className="text-xl font-semibold mb-2">
              {product.price.toLocaleString()} تومان
            </p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <button
              onClick={addToCart}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded text-lg"
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>

        {/* بخش نظرات */}
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
              <select
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md mb-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="">امتیاز دهید</option>
                <option value="1">1 ⭐</option>
                <option value="2">2 ⭐</option>
                <option value="3">3 ⭐</option>
                <option value="4">4 ⭐</option>
                <option value="5">5 ⭐</option>
              </select>
              <button
                onClick={submitComment}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md"
              >
                ارسال نظر
              </button>
            </div>
          )}

          {product.comments && product.comments.filter((c) => c.isAnswered === 1).length > 0 ? (
            product.comments
              .filter((c) => c.isAnswered === 1)
              .map((comment) => (
                <div
                  key={comment.id}
                  className="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200"
                >
                  <div className="mb-3">
                    <p className="font-semibold text-gray-800">
                      {comment.username}
                    </p>
                    <p className="text-gray-700 mt-1">{comment.text}</p>
                    <p className="text-gray-400 text-xs mt-2">{comment.date}</p>
                    <p className="text-yellow-500 mt-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span
                          key={i}
                          className={
                            i <= comment.score
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        >
                          ⭐
                        </span>
                      ))}
                    </p>
                  </div>

                  {comment.reply && (
                    <div className="bg-teal-50 p-3 rounded-lg border-l-4 border-teal-500 mt-2">
                      <p className="text-teal-800 font-semibold text-sm">
                        مدیریت
                      </p>
                      <p className="text-teal-800 mt-1">{comment.reply}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {moment(comment.replyTimestamp).format(
                          "jYYYY/jMM/jDD HH:mm"
                        )}
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
