import React from "react";

const categories = [
  { id: 1, title: "قهوه دمی و اسپرسو", img: "imges/categories/category1.png" },
  { id: 2, title: "لوازم جانبی و تجهیزات", img: "imges/categories/category2.png" },
  { id: 3, title: "اسپرسو ساز", img: "imges/categories/category3.png" },
  { id: 4, title: "پک تستر قهوه", img: "imges/categories/category4.png" },
  { id: 5, title: "قهوه ترک", img: "imges/categories/category5.png" },
];

export default function ProductsCategory() {
  return (
    <section className="products-category mb-10 md:my-20">
      <div className="container">
        <div className="flex items-center justify-center gap-y-6 gap-x-[29px] md:gap-[65px] flex-wrap">
          {categories.map((category) => (
            <div key={category.id} className="w-25 md:w-50 text-center">
              <a href="#">
                <img src={category.img} loading="lazy" alt={category.title} />
                <span className="inline-block font-Dana font-semibold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">
                  {category.title}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
