import React, { useState, useEffect, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../../pages/context/AuthContext";
import { CartContext } from "../../pages/context/CartContext";

export default function Header({ mobileCartOpen, setMobileCartOpen }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, logout } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);
const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
    setMobileCartOpen(false);
  };
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const grandTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOverlayClick = () => {
    if (mobileNavOpen) setMobileNavOpen(false);
    if (mobileCartOpen) setMobileCartOpen(false);
  };

  const preventLink = (e) => e.preventDefault();

  const removeCartItem = (index) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) return;
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index].quantity = quantity;
      return newCart;
    });
  };

  return (
    <>
     
      <header className="fixed z-50 top-9 right-0 left-0 hidden md:flex items-center justify-between w-[98%] lg:w-[90%] h-16 py-3   lg:h-24 rounded-3xl mx-auto px-5 lg:px-10 bg-black/50 backdrop-blur-[6px]">
        <div className="flex justify-between w-full">
          <nav className="flex h-14 items-center gap-x-6 lg:gap-x-9">
            <div className="shrink-0">
              <img src="/imges/app-logo.png" alt="Logo" />
            </div>
            <ul className="flex h-full gap-x-3 lg:gap-x-9 text-sm xl:text-xl text-nowrap text-gray-300 tracking-tightest *:leading-[56px]">
              <li><a href="#" onClick={preventLink} className="font-medium text-orange-200">صفحه اصلی</a></li>
              <li className="relative group">
                <a href="#" onClick={preventLink} className="transition-colors group-hover:text-orange-300">فروشگاه</a>
<div className="absolute top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all delay-75 w-52 bg-white p-6 space-y-4 dark:bg-zinc-700 text-zinc-700 dark:text-white text-base rounded-2xl border-t-[3px] border-t-orange-300 shadow-normal flex flex-col">
  <a href="#" onClick={preventLink}>قهوه ویژه</a>
  <a href="#" onClick={preventLink}>قهوه در سطح جهانی</a>
  <a href="#" onClick={preventLink}>ترکیبات تجاری</a>
  <a href="#" onClick={preventLink}>کپسول قهوه</a>
  <a href="#" onClick={preventLink}>قهوه درجه 1</a>
  <a href="#" onClick={preventLink}>قهوه زینو برزیلی</a>
</div>

              </li>
             
<li>
  <Link to="/p-admin" className="flex items-center gap-x-2">

    ورود به پنل مدیریت
  </Link>
</li>
 
              <li><a href="#" onClick={preventLink}>تماس با ما</a></li>
            </ul>
          </nav>

          
          <div className="flex items-center  lg:gap-x-5 text-orange-200">
            <div className="relative group">
              <div className="py-3 cursor-pointer" onClick={() => setMobileCartOpen(true)}>
                <svg className="w-8 h-8"><use href="#shopping-cart"></use></svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] text-white bg-red-500 rounded-full flex items-center justify-center">{cart.length}</span>
                )}
              </div>
              <div className="absolute top-full left-0 w-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all delay-75 bg-white p-5 space-y-4 dark:bg-zinc-700 rounded-2xl border-t-[3px] border-t-orange-300 shadow-normal">
                <div className="flex items-center justify-between font-Dana font-medium text-xs tracking-tighter">
                  <span className="cart-count text-gray-300">{cart.length} مورد</span>
                  <a href="#" onClick={preventLink} className="flex items-center text-orange-300">
                    مشاهده سبد خرید
                    <svg className="w-4 h-4"><use href="#chevron-left"></use></svg>
                    
                  </a>
                </div>
                <div className="cart-items max-h-64 overflow-y-auto divide-y divide-gray-200 dark:divide-white/10">
                  {cart.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-x-2.5 py-2 border-b border-gray-200 dark:border-white/10 min-w-0">
                      <img src={item.photo} className="w-10 h-10 md:w-14 md:h-14 object-cover rounded flex-shrink-0" />
                      <div className="flex flex-col justify-between w-full min-w-0">
                        <h4 className="text-zinc-700 dark:text-white text-sm md:text-base font-medium truncate md:break-words">{item.productName}</h4>
                        <div className="flex justify-between items-center mt-1 min-w-0 flex-wrap md:flex-nowrap gap-1">
                          <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(index, parseInt(e.target.value))} className="cart-quantity w-14 text-center border rounded px-1 py-0.5 text-sm flex-shrink-0" />
                          <span className="text-zinc-700 dark:text-white font-bold truncate">{(item.price * item.quantity).toLocaleString()} تومان</span>
                          <button onClick={() => removeCartItem(index)} className="remove-btn text-red-500 text-xs flex-shrink-0">✕</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-5">
                  <div>
                    <span className="text-gray-300 text-xs">مبلغ قابل پرداخت</span>
                    <div className="cart-total text-zinc-700 dark:text-white font-Dana font-bold">{grandTotal.toLocaleString()} تومان</div>
                  </div>
                  <a href="#"     onClick={(e) => { e.preventDefault(); handleCheckout(); }} className="flex items-center justify-center w-[144px] h-14 text-white bg-teal-600 hover:bg-teal-700 transition-colors rounded-xl tracking-tightest">ثبت سفارش</a>
                </div>
              </div>
            </div>

            <div className="toggle-theme cursor-pointer" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <svg className={`w-8 h-8 ${theme === "dark" ? "hidden" : ""}`}><use href="#moon"></use></svg>
              <svg className={`w-8 h-8 ${theme === "dark" ? "" : "hidden"}`}><use href="#sun"></use></svg>
            </div>
          </div>

          <span className="w-px h-14 block bg-white/20"></span>

          <div className="flex items-center  gap-x-5 xl:gap-x-10 text-sm lg:text-xl tracking-tightest">
{user && user.isLoggedIn ? (
  <>
    <Link to="/p-user/information" className="font-sm bg-black/1  text-white px-1 py-1 rounded-sm text-nowrap hover:underline">
      {user.name || user.firstName}
    </Link>
    <button 
      onClick={logout} 
      className="flex items-center gap-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
    >
      خروج
      <svg className="w-5 h-5 rotate-180" fill="currentColor">
        <use href="#arrow-left"></use>
      </svg>
    </button>
  </>
) : (
              <span className="inline-block">
                <Link to="/login" className="text-orange-200 hover:text-orange-300">ورود</Link>{" | "}
                <Link to="/register" className="text-orange-200 hover:text-orange-300">ثبت نام</Link>
              </span>
)}
          </div>
        </div>
      </header>

      
      <div className="flex items-center justify-between h-16 px-4 md:hidden bg-white dark:bg-zinc-700">
        <div onClick={() => setMobileNavOpen(true)} className="cursor-pointer">
          <svg className="nav-icon w-6 h-6 text-zinc-700 dark:text-white"><use href="#bars-3"></use></svg>
        </div>
        <div>
          <svg className="w-[100px] h-10 text-orange-300"><use href="#app-logo-type"></use></svg>
    

        </div>
        <div onClick={() => setMobileCartOpen(true)} className="cart-icon cursor-pointer relative">
          <svg className="w-6 h-6 text-zinc-700 dark:text-white"><use href="#shopping-cart"></use></svg>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] text-white bg-red-500 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
      </div>

      
      {(mobileNavOpen || mobileCartOpen) && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={handleOverlayClick}></div>
      )}

    
      <div className={`nav p-3 overflow-y-auto fixed top-0 bottom-0 w-64 h-full md:hidden bg-white dark:bg-zinc-700 z-50 transition-all ${mobileNavOpen ? "right-0" : "-right-64"}`}>
        <div className="flex items-center justify-between pb-5 mb-6 border-b text-[#FDBA74] border-b-gray-100 dark:border-b-white/10">
          <svg className="w-[41px] h-10 text-orange-300"><use href="#logo"></use></svg>
          <div className="flex gap-x-3.5">
            <svg className="w-[100px] h-10 text-orange-300"><use href="#app-logo-type"></use></svg>
          </div>
          <div className="nav-CloseBtn cursor-pointer" onClick={() => setMobileNavOpen(false)}>
            <svg className="w-5 h-5 text-zinc-600 dark:text-white"><use href="#xmark"></use></svg>
          </div>
        </div>

        <a href="#" className="flex items-center gap-x-2 bg-orange-200/20 text-orange-300 pr-2.5 h-10 rounded-md mb-4" onClick={preventLink}>
          <svg className="w-5 h-5"><use href="#home"></use></svg>
          <span>صفحه اصلی</span>
        </a>

        <ul className="*:pr-2.5 space-y-6 text-zinc-600 dark:text-white">
          <li>
            <a href="#" className="flex items-center justify-between" onClick={preventLink}>
              <div className="flex items-center gap-x-2">
                <svg className="w-5 h-5"><use href="#shopping-cart"></use></svg>
                <span>فروشگاه</span>
              </div>
              <svg className="w-4 h-4 rotate-[-90deg] submenu--open"><use href="#chevron-down"></use></svg>
            </a>
           
            <div className="submenu text-wrap flex flex-col gap-2 pl-8 mt-3">
              <a href="#" onClick={preventLink}>قهوه ویژه</a>
              <a href="#" onClick={preventLink}>ویژه در سطح جهانی</a>
              <a href="#" onClick={preventLink}>قهوه درجه 1</a>
              <a href="#" onClick={preventLink}>ترکیبات تجاری</a>
              <a href="#" onClick={preventLink}>کپسول قهوه</a>
              <a href="#" onClick={preventLink}>قهوه زینو برزیلی</a>
            </div>
          </li>




<li>
  <Link to="/p-admin" className="flex items-center gap-x-2">

    ورود به پنل مدیریت
  </Link>
</li>
          <li><a href="#" className="flex items-center gap-x-2" onClick={preventLink}><svg className="w-5 h-5"><use href="#phone-arrow-up-right"></use></svg>تماس با ما</a></li>
        </ul>

        <div className="flex flex-col items-start gap-y-6 text-orange-300 px-2.5 py-8 mt-8 border-t border-t-gray-100 dark:border-t-white/10">
{user && user.isLoggedIn ? (
  <>
    <Link to="/p-user/information" className="font-medium hover:underline">
      {user.name || user.firstName}
    </Link>
    <button 
      onClick={logout} 
      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      خروج
      <svg className="w-5 h-5 rotate-180" fill="currentColor">
        <use href="#arrow-left"></use>
      </svg>
    </button>
  </>
) : (
              <span className="hidden xl:inline-block">
                <Link to="/login" className="text-orange-200 hover:text-orange-300">ورود</Link>{" | "}
                <Link to="/register" className="text-orange-200 hover:text-orange-300">ثبت نام</Link>
              </span>
)}

          <div className="toggle-theme cursor-pointer" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <span className="flex items-center ">
              <svg className={`dark:hidden w-5 h-5`}><use href="#moon"></use></svg>
              <svg className={`w-5 h-5 ${theme === "dark" ? "" : "hidden"}`}><use href="#sun"></use></svg>
              <span className="dark:hidden">تم تیره</span>
              <span className="hidden dark:flex items-center gap-x-2">تم روشن</span>
            </span>
          </div>

          <a href="#" className="inline-flex  items-center gap-x-2" onClick={() => setMobileCartOpen(true)}>
            <svg className="w-5 h-5"><use href="#shopping-cart"></use></svg>
            سبد خرید
          </a>
        </div>
      </div>

     
      <div className={`cart p-3 fixed top-0 bottom-0 w-64 h-full md:hidden bg-white dark:bg-zinc-700 z-50 overflow-y-auto transition-all ${mobileCartOpen ? "left-0" : "-left-64"}`}>
        <div className="flex items-center justify-between pb-5 mb-5 border-b border-b-gray-300 dark:border-b-white/10">
          <div className="cursor-pointer" onClick={() => setMobileCartOpen(false)}>
            <svg className="w-5 h-5 text-zinc-600 dark:text-white"><use href="#xmark"></use></svg>
          </div>
          <span className="text-zinc-700 dark:text-white font-Dana font-medium">سبد خرید</span>
        </div>

        <div className="cart-items flex flex-col gap-4 px-4">
          {cart.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2">
              <img src={item.photo} className="w-10 h-10 object-cover rounded" />
              <div className="flex flex-col w-full">
                <span>{item.productName}</span>
                <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(index, parseInt(e.target.value))} className="w-14 text-center border rounded px-1 py-0.5" />
                <span>{(item.price * item.quantity).toLocaleString()} تومان</span>
                <button onClick={() => removeCartItem(index)}>✕</button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-end gap-x-4 mt-5 mb-8 px-4">
          <a href="#"     onClick={(e) => { e.preventDefault(); handleCheckout(); }} className="flex items-center justify-center w-28 h-11 bg-teal-600 dark:bg-emerald-500 rounded-xl text-white">ثبت سفارش</a>
          <div className="h-11 flex items-center px-2.5 text-orange-300">
            <div className="flex flex-col gap-y-2 justify-center whitespace-nowrap">
              <span className="text-gray-300 text-xs whitespace-nowrap">مبلغ قابل پرداخت</span>
              <div className="cart-total text-zinc-700 dark:text-white font-Dana font-bold">{grandTotal.toLocaleString()} تومان</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
