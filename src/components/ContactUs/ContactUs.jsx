import React from "react";

export default function ContactUs() {
  return (
    <section className="contact-us mb-16 md:mb-28">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-y-8 lg:gap-x-5">
          
         
          <img
            className="shrink-0 w-[296px]"
            src="imges/contact.png"
            alt="تماس با ما"
          />

         
          <div className="text-zinc-800 dark:text-white">
            <h3 className="font-Morabba font-medium text-2xl md:text-5xl mb-0.5 md:mb-1.5">
              یکی از بهترین قهوه ها!
            </h3>
            <span className="font-Morabba font-light text-lg md:text-3xl/[48px]">
              کیفیت قهوه را از ما بخواهید
            </span>

            
            <div className="flex gap-x-2.5 md:my-6">
              <span className="inline-block w-1 h-1 bg-zinc-700 dark:bg-gray-400 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-zinc-700 dark:bg-gray-400 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-zinc-700 dark:bg-gray-400 rounded-full"></span>
            </div>

            <p className="text-lg md:text-2xl">
              فضای دنج و گرم ما را احساس کنید، جایی که همه میتوانند قهوه‌ی معطری پیدا کنند و دسرهای قهوه‌ی خوشمزه ما را که کاملا با قهوه‌ی داغ همراه شده است امتحان کنند. فضای شیک و کارکنان خوش‌برخورد ما روز شما را می‌سازند.
            </p>

            <a
              href="#"
              className="inline-flex items-center justify-center gap-x-2 h-[50px] md:h-[60px] border md:border-2 border-orange-300 text-base md:text-xl tracking-tightest text-orange-300 px-6 mt-5 md:mt-6 rounded-full"
            >
              ثبت سفارش تلفنی
              <svg className="w-5 h-5 md:w-8 md:h-8">
                <use href="#phone"></use>
              </svg>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
