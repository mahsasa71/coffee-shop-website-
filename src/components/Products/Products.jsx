import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://coffee-b43b3-default-rtdb.firebaseio.com/products.json"
        );
        const data = await res.json();

        if (data) {
          const productsArray = Object.keys(data).map((key) => ({
            id: key,
            name: data[key].name,
            price: data[key].price,
            photo: data[key].photo,
            description: data[key].description || "",
            courseAverageScore: data[key].courseAverageScore || 0,
          }));
          setProducts(productsArray);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  if (loading) {
    return (
      <section className="products pt-8 md:pt-24 lg:pt-48">
        <div className="container">
          <div className="flex items-end justify-between mb-5 md:mb-12">
            <div>
              <Skeleton width={180} height={24} />
              <Skeleton width={120} height={16} />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-700 shadow-normal"
              >
                <Skeleton height={150} className="mb-2" />
                <Skeleton width="80%" height={20} className="mb-2" />
                <Skeleton width="50%" height={20} className="mb-3" />
                <div className="flex justify-between">
                  <Skeleton circle width={30} height={30} />
                  <div className="flex flex-row-reverse gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Skeleton key={j} circle width={20} height={20} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }


  return (
    <section className="products pt-8 md:pt-24 ">
      <div className="container">
        <div className="flex items-end justify-between mb-5 md:mb-12">
          <div>
            <h3 className="section-title">جدیدترین محصولات</h3>
            <span className="section-subtitle">فرآوری شده از دانه قهوه</span>
          </div>
          <Link
            to="/articles"
            className="section-link flex items-center gap-x-1"
          >
            <span className="hidden md:inline-block">مشاهده همه محصولات</span>
            <span className="inline-block md:hidden">مشاهده همه</span>
            <svg className="w-5 h-5">
              <use href="#chevron-left-mini"></use>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="product-item p-4 rounded-2xl relative bg-white dark:bg-zinc-700 shadow-normal transition-all cursor-pointer">
                <img
                  src={product.photo}
                  className="w-32 mx-auto md:w-auto"
                  alt={product.name}
                />
                <span className="absolute top-1.5 right-1.5 block text-xs/[24px] md:text-base/[34px] font-Dana font-semibold bg-orange-300 text-white dark:text-zinc-700 px-2.5 md:px-3.5 rounded-full">
                  12%
                </span>
                <h4 className="font-Dana font-medium text-sm md:text-xl min-h-[40px] md:min-h-[56px] text-zinc-700 dark:text-white line-clamp-2 mt-2">
                  {product.name}
                </h4>
                <div className="flex gap-x-2 md:gap-x-2.5 mt-1.5 md:mt-2.5">
                  <span className="product-price font-Dana font-semibold text-teal-600 dark:text-emerald-500 text-base md:text-xl">
                    {product.price.toLocaleString()}
                  </span>
                  <span className="text-xs md:text-sm tracking-tighter">
                    تومان
                  </span>
                  <div className="offer flex items-center text-gray-400 ">
                    <span className="text-xs md:text-xl ">175,000</span>
                    <span className="hidden xl:inline text-sm tracking-tighter">
                      تومان
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2.5">
                  <div className="flex items-center gap-x-2.5 md:gap-x-3">
                    <span
                      className="flex-center w-[26px] h-[26px] md:w-9 md:h-9 rounded-full hover:bg-teal-600 dark:hover:bg-emerald-500 hover:text-white text-gray-400 bg-gray-100 dark:bg-zinc-800 cursor-pointer transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart({
                          id: product.id,
                          productName: product.name,
                          price: product.price,
                          photo: product.photo,
                        });
                      }}
                    >
                      <svg className="w-4 h-4 md:w-[22px] md:h-[22px]">
                        <use href="#shopping-cart"></use>
                      </svg>
                    </span>
                    <span className="block rounded-full hover:text-teal-600 dark:text-emerald-500 text-gray-400 cursor-pointer transition-all">
                      <svg className="w-4 h-4 md:w-6 md:h-6">
                        <use href="#arrows-right-left"></use>
                      </svg>
                    </span>
                  </div>

                  <div className="flex flex-row-reverse">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 md:w-6 md:h-6 ${
                          i < product.courseAverageScore
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-400"
                        }`}
                      >
                        <use href="#star"></use>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
