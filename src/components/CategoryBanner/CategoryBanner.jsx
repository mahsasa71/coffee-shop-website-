import React from "react";

export default function CategoryBanner() {
  return (
    <section className="category-banner mt-8 mb-10 md:my-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white">
          
          
          <a
            href="#"
            className="category-banner_item1 flex flex-col justify-center pr-7 md:pr-12 rounded-2xl h-[142px] md:h-[248px]"
          >
            <h5 className="font-Dana font-semibold text-2xl/6 md:text-4xl/6 mb-4 md:mb-7">
              انواع قهوه
            </h5>
            <span className="md:font-Dana font-medium md:text-xl/6">
              ترکیبی و تک خاسنگاه
            </span>
          </a>

          
          <a
            href="#"
            className="category-banner_item2 flex flex-col justify-center pr-7 md:pr-12 rounded-2xl h-[142px] md:h-[248px]"
          >
            <h5 className="font-Dana font-semibold text-2xl/6 md:text-4xl/6 mb-4 md:mb-7">
              پودرهای فوری
            </h5>
            <span className="md:font-Dana font-medium md:text-xl/6">
              نسکافه، هات‌چاکلت، ماسالا
            </span>
          </a>

        </div>
      </div>
    </section>
  );
}
