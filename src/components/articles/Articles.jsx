import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          "https://coffee-b43b3-default-rtdb.firebaseio.com/articles.json"
        );
        const data = await res.json();

        if (data) {
          const articlesArray = Object.keys(data).map((key) => ({
            id: key,
            title: data[key].title,
            photo: data[key].photo,
            description: data[key].description || "",
            date: data[key].date || {},
          }));
          setArticles(articlesArray);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // 🦴 اسکلتون هنگام بارگذاری
  if (loading) {
    return (
      <SkeletonTheme
        baseColor="#e5e7eb" // خاکستری روشن
        highlightColor="#f3f4f6" // موج روشن‌تر
        enableAnimation
      >
        <section className="blogs mb-8 md:mb-28">
          <div className="container">
            <div className="flex items-end justify-between mb-5 md:mb-12">
              <Skeleton width={180} height={24} />
              <Skeleton width={130} height={20} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-white dark:bg-zinc-700 shadow-normal"
                >
                  <Skeleton height={160} className="mb-3 rounded-2xl" />
                  <Skeleton width="80%" height={20} className="mb-2" />
                  <Skeleton width="60%" height={16} className="mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton width={80} height={18} />
                    <Skeleton width={50} height={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SkeletonTheme>
    );
  }

  // ✅ محتوای اصلی پس از بارگذاری
  return (
    <section className="blogs mb-8 md:mb-28">
      <div className="container">
        <div className="flex items-end justify-between mb-5 md:mb-12">
          <h3 className="section-title">مطالب خواندنی</h3>
          <Link
            to="/articles"
            className="section-link flex items-center gap-x-1"
          >
            <span className="hidden md:inline-block">مشاهده همه مطالب</span>
            <span className="inline-block md:hidden">مشاهده همه</span>
            <svg className="w-5 h-5">
              <use href="#chevron-left-mini"></use>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="group flex sm:block gap-x-2.5 p-2.5 md:pb-2.5 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl"
            >
              <div className="relative shrink-0 w-[130px] h-[130px] sm:w-auto sm:h-auto sm:mb-4 overflow-hidden rounded-2xl rounded-bl-4xl">
                <img
                  src={article.photo}
                  className="h-full sm:h-auto object-cover"
                  alt={article.title}
                />
                <div className="absolute inset-0 w-full h-full flex items-center justify-center invisible opacity-0 group-hover:opacity-100 group-hover:visible bg-gradient-to-r from-orange-200/80 to-orange-300/80 transition-all">
                  <svg className="w-[138px] h-[54px] text-amber-900">
                    <use href="#app-logo-type"></use>
                  </svg>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row w-full items-start justify-between mt-2 sm:mt-0">
                <h4 className="cursor-pointer mt-2.5 ml-1.5 sm:ml-0 sm:mt-0 font-Dana font-medium md:font-normal text-sm/7 md:text-lg line-clamp-2 max-w-[192px] text-zinc-700 dark:text-white">
                  {article.title}
                </h4>

                <div className="hidden sm:flex gap-5">
                  <span className="hidden lg:block w-px h-[61px] bg-gray-100 dark:bg-white/10"></span>
                  <div className="flex flex-col -mt-1 ml-[12px] lg:ml-[18px] text-teal-600 dark:text-emerald-500 text-sm text-left">
                    <span className="font-Dana font-semibold md:text-xl lg:text-2xl">
                      {article.date.day}
                    </span>
                    <span>{article.date.month}</span>
                    <span>{article.date.year}</span>
                  </div>
                </div>

                <div className="w-full flex items-end justify-between sm:hidden border-t border-t-gray-100 dark:border-t-white/10 pt-[18px] pb-1.5">
                  <span className="text-teal-600 dark:text-emerald-500 text-xs">
                    {article.date.day} {article.date.month} {article.date.year}
                  </span>
                  <span className="flex items-center gap-x-1 font-Dana font-medium ml-1.5 text-xs h-5 rounded-md pr-2.5 pl-2 bg-orange-200/20 text-orange-300">
                    مطالعه
                    <svg className="w-3.5 h-3.5">
                      <use href="#arrow-left"></use>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
