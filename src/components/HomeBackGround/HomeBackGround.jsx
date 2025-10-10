import React from "react";

export default function HomeBackGround() {
  return (
    <section className="home relative h-[200px] xs:h-auto xs:aspect-[2/1] md:aspect-auto md:pl-20 bg-home-mobile md:bg-home-desktop">
      <div className="container relative overflow-hidden h-full md:min-h-screen flex justify-end items-center">
        <div className="text-white">
          <h2 className="font-Morabba font-bold text-2xl md:text-6xl/[62px] mb-0.5 md:mb-2">
            قهوه ی عربیکا تانزانیا
          </h2>
          <span className="font-Morabba font-light text-xl md:text-5xl/[64px]">
            یک فنجان بالانس!
          </span>
          <span className="block w-[100px] h-px md:h-0.5 bg-orange-300 my-3 md:my-8"></span>
          <p className="max-w-[201px] md:max-w-[460px] text-xs md:text-2xl">
            نام آشنای عربیکا را شنیده اید. عربیکا یکی از گونه های قهوه است که در نواحی کمربند قهوه کشت میشود
          </p>
        </div>
      </div>

      <svg className="hidden md:inline-block absolute bottom-0 left-0 right-0 mx-auto w-[100px] h-[22px] text-gray-100 dark:text-zinc-800">
        <use href="#curve"></use>
      </svg>

      <div className="circle circle--main circle--lg">
        <div className="circle circle--md">
          <div className="circle circle--sm"></div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-0 left-0 right-0 mx-auto translate-y-2/4 items-center justify-center w-[30px] h-[30px] border-2 border-orange-300 rounded-full">
        <svg className="w-4 h-4 text-zinc-700 dark:text-white -rotate-90">
          <use href="#chevron-down"></use>
        </svg>
      </div>
    </section>
  );
}
