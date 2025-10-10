import React from "react";

export default function Statics({
  title,
  number,
  fromColor,
  toColor,
  productName,
  productImage,
}) {
  return (
    <div className="w-1/2 sm:w-1/3 md:w-1/3 xl:w-1/5 p-2">
      <div
        className="relative overflow-hidden rounded-3xl p-4 flex flex-col justify-between items-start aspect-square"
        style={{
          background: `linear-gradient(to right, ${fromColor}, ${toColor})`,
        }}
      >
        
        {productImage && (
          <div className="w-full flex justify-center mb-2">
            <img
              src={productImage}
              alt={productName || "product"}
              className="w-16 h-16 object-contain rounded-full bg-white bg-opacity-20 p-1"
            />
          </div>
        )}

       
        <div>
          <h5 className="text-white font-bold">{title}</h5>
          {typeof number === "number" && (
            <span className="text-white text-2xl font-semibold">{number}</span>
          )}
        </div>

        
        {productName && (
          <p className="text-white text-sm mt-1 opacity-90">{productName}</p>
        )}

      
        <div className="relative self-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="117"
            height="51"
            viewBox="0 0 117 51"
            fill="none"
          >
            <g filter="url(#filter0_f)">
              <circle cx="107" cy="20" r="5" fill="#fff"></circle>
            </g>
            <path
              d="M1 49.5L8.5 26.5L17 37L22 19.5L31 37L44.5 3L57.5 26.5L72 19.5L83.5 31L93.5 6.5L101 19.5H108"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
            <defs>
              <filter
                id="filter0_f"
                x="97"
                y="10"
                width="20"
                height="20"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="2.5"
                  result="effect1_foregroundBlur"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
        </div>

        
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-25 p-1 text-center">
          <a
            href="#"
            className="text-white no-underline flex items-center justify-center gap-1"
          >
            اطلاعات بیشتر
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                fill="#fff"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
