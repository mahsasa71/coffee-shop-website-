export default function Footer() {
  return (
    <footer className="relative bg-zinc-700 py-8 md:py-11">
      <svg className="hidden md:inline-block absolute top-0 left-0 right-0 mx-auto w-[100px] h-[22px] text-gray-100 dark:text-zinc-800">
        <use href="#curve-footer"></use>
      </svg>

      <div className="hidden md:flex absolute top-0 left-0 right-0 mx-auto -translate-y-2/4 items-center justify-center w-[30px] h-[30px] border-2 border-orange-300 rounded-full">
        <svg className="w-4 h-4 text-zinc-700 dark:text-white rotate-90">
          <use href="#chevron-down"></use>
        </svg>
      </div>

      <div className="text-gray-300 sm:w-[94%] lg:w-[90%] px-4 md:px-0 mx-auto min-h-[500px]">
        <div className="flex justify-between flex-wrap">
          <div>
            <div className="flex gap-x-5 mb-6 md:mb-4 text-gray-300">
              <svg className="w-[57px] h-[54px]">
                <use href="#logo"></use>
              </svg>
              <svg className="w-[138px] h-[54px]">
                <use href="#app-logo-type"></use>
              </svg>
            </div>
            <p className="xl:max-w-[606px] text-lg md:text-xl /[48px]">
              ما برانیم تا با پیشرو بودن در فرآیند تولید،نوع و کیفیت محصول،خدمات
              و توزیع،الگویی برای تولیکنندگان ایرانی باشیم و به مرجع فرهنگ قهوه
              در ایران تبدیل شویم.میپنداریم که نظر مردم ایران و منطقه باید نسبت
              به کالای ایرانی بهبود یابد . در این راستا با اشتیاق میکوشیم.
            </p>
          </div>

          <div className="mt-10 md:mt-[26px]">
            <h4 className="font-Dana font-semibold text-2xl text-white mb-6 md:mb-7">
              دسترسی سریع
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 md:gap-y-5 gap-x-10 md:gap-x-16">
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                حریم خصوصی
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                عودت کالا
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                ثبت سفارش
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                پرسش های متداول
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                شرایط استفاده
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                فرصت های شغلی
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                ضمانت نامه ها
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                ارتباط با ما
              </a>
            </div>
          </div>

          <div className="mt-10 md:mt-[26px]">
            <h4 className="font-Dana font-semibold text-2xl text-white mb-6 md:mb-7">
              در تماس باشیم
            </h4>

            <div>
              <div className="md:text-xl mb-6 md-mb-10">
                <span className="flex items-center gap-x-2 md:gap-x-3 mb-4 md:mb-5">
                  <svg className="w-5 h-5 md:w-6 md:h-6 shrink-0">
                    <use href="#map-pin"></use>
                  </svg>
                  بلوار میرداماد-خ البرز-کوچه ی قبادیان شرقی-پلاک 33
                </span>

                <div className="flex flex-wrap gap-x-5 gap-y-4 font-Dana font-medium">
                  <a
                    href=""
                    className="flex items-center gap-x-2 md:gap-x-3 text-orange-300"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6">
                      <use href="#envelop"></use>
                    </svg>
                    info@coffee.com
                  </a>

                  <div className="flex items-center gap-x-2 md:gap-x-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6">
                      <use href="#phone"></use>
                    </svg>
                    <span className="ltr-text">09127777777</span>
                    <span className="ltr-text">021-44444444</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-x-1.5 md:gap-x-6 ltr-text font-Dana font-medium md:text-xl">
                <a
                  href=""
                  className="flex flex-grow justify-center items-center gap-x-2 h-12 rounded-xl text-zinc-700 bg-gradient-to-r from-orange-200 to-orange-300"
                >
                  @golden_coffee
                  <svg className="w-[26px] h-[26px] md:w-[38px] md:h-[38px]">
                    <use href="#instagram"></use>
                  </svg>
                </a>
                <a
                  href=""
                  className="flex flex-grow justify-center items-center gap-x-2 h-12 border border-orange-200 rounded-xl"
                >
                  @golden_coffee
                  <svg className="w-[26px] h-[26px] md:w-[38px] md:h-[38px]">
                    <use href="#telegram"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 font-Dana font-medium text-xs/5 md:text-base border-t border-t-white/10 pt-10 md:pt-11 mt-10 md:mt-11">
          <div className="flex items-center gap-x-2.5">
            <div className="flex items-center justify-center shrink-0 w-[30px] h-[30px] border border-white/10 rounded-full">
              <div className="flex items-center justify-center w-5 h-5 border border-white/20 rounded-full">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-t from-orange-200 to-orange-300"></div>
              </div>
            </div>
            <p>
              تمامی حقوق این سایت متعلق به
              <span className="text-orange-200">مجموعه ما </span>
              میباشد و اجازه ی کپی برداری ندارید.
            </p>
          </div>
          <span className="ltr-text mr-auto">
            Copyright © 2025 Golden Coffee. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
