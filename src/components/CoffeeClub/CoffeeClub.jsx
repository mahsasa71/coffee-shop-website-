import React from "react";
import { useNavigate } from "react-router-dom";
export default function CoffeeClub() {
  const navigate = useNavigate();
  return (
    <section className="coffee-club mb-8 md:mb-20">
      <div className="container">
        <div className="flex flex-wrap lg:flex-nowrap lg:gap-x-4 xl:gap-x-24 gap-y-9 items-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-8 lg:py-0 px-3 lg:px-5 xl:px-11 lg:h-36 rounded-2xl">
          
         
          <div className="flex md:shrink-0 items-center gap-x-3 lg:gap-x-4 xl:gap-x-6">
            <img
              src="imges/club/diamond.png"
              className="w-[87px] lg:w-[100px] xl:w-[110px]"
              alt="کافی کلاب"
            />
            <div>
              <h4 className="font-Morabba font-bold text-2xl md:text-5xl mb-2">
                کافی کلاب
              </h4>
              <p className="font-Morabba font-light text-lg md:text-2xl">
                میدونستی میتونی با امتیازات قهوه بگیری؟
              </p>
            </div>
          </div>

          
          <div className="flex justify-between w-full">
            
           
            <div className="flex gap-x-2 lg:gap-x-3 xl:gap-x-5">
              
             
              <div onClick={() => navigate("/spinner")} className="w-[72px] h-[72px] md:w-[98px] md:h-[98px] text-center text-emerald-600 bg-white py-1.5 md:pt-5 md:pb-1 rounded-2xl">
                <svg className="w-10 h-10 md:w-12 mx-auto md:h-12 mb-1 md:mb-1.5">
                  <use href="#Activity"></use>
                </svg>
                <span className="text-xs md:text-sm">چرخ و بخت</span>
              </div>

              
              <div className="w-[72px] h-[72px] md:w-[98px] md:h-[98px] text-center text-emerald-600 bg-white py-1.5 md:pt-5 md:pb-1 rounded-2xl">
                <svg className="w-10 h-10 mx-auto md:w-12 md:h-12 mb-1 md:mb-1.5">
                  <use href="#discovery"></use>
                </svg>
                <span className="text-xs md:text-sm">ماموریت ها</span>
              </div>

             
              <div className="w-[72px] h-[72px] md:w-[98px] md:h-[98px] text-center text-emerald-600 bg-white py-1.5 md:pt-5 md:pb-1 rounded-2xl">
                <svg className="w-10 h-10 mx-auto md:w-12 md:h-12 mb-1 md:mb-1.5">
                  <use href="#ticket-star"></use>
                </svg>
                <span className="text-xs md:text-sm">جایزه ها</span>
              </div>

            </div>

           
            <div className="flex flex-col">
              <span className="md:mb-1 font-Dana font-semibold text-2xl md:text-3xl">
                542
              </span>
              <span className="text-xs md:text-sm">امتیاز شما</span>
              <a
                href="#"
                className="flex items-center mt-1 md:mt-2 justify-center w-[90px] h-[26px] md:w-[110px] md:h-8 rounded-full font-Dana font-medium text-xs md:text-sm bg-gradient-to-r from-orange-200 to-orange-300"
              >
                دریافت جایزه
                <svg className="w-5 h-5 md:w-6 md:h-6">
                  <use href="#chevron-left-mini"></use>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
