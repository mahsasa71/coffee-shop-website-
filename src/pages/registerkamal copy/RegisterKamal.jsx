import React, { useState, useEffect, useContext } from "react";
import emailjs from "@emailjs/browser";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RegisterKamal() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [step, setStep] = useState("register");
  const [googleUser, setGoogleUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [bgVideo, setBgVideo] = useState("");

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

const videos = [
  "/videos/istockphoto-1456403364-640_adpp_is.mp4",
  "/videos/istockphoto-2127141846-640_adpp_is.mp4",
  "/videos/istockphoto-2166047393-640_adpp_is.mp4",
  "/videos/istockphoto-2225123086-640_adpp_is.mp4",
  "/videos/istockphoto-2235456018-640_adpp_is.mp4",
  "/videos/istockphoto-474755905-640_adpp_is.mp4",
  "/videos/istockphoto-483458564-640_adpp_is.mp4",
  "/videos/istockphoto-931483672-640_adpp_is.mp4",
  "/videos/istockphoto-1131356109-640_adpp_is.mp4",
  "/videos/istockphoto-1174203292-640_adpp_is.mp4",
  "/videos/istockphoto-1191381422-640_adpp_is.mp4",
  "/videos/istockphoto-1220457062-640_adpp_is.mp4",
  "/videos/istockphoto-1289025969-640_adpp_is.mp4",
  "/videos/istockphoto-1304265771-640_adpp_is.mp4",
  "/videos/istockphoto-1363097178-640_adpp_is.mp4",
  "/videos/istockphoto-1426726401-640_adpp_is.mp4",
  "/videos/istockphoto-1472056813-640_adpp_is.mp4",
  "/videos/istockphoto-1749437522-640_adpp_is.mp4",
  "/videos/istockphoto-1966354548-640_adpp_is.mp4",
  "/videos/istockphoto-2148698786-640_adpp_is.mp4",
  "/videos/istockphoto-2197803084-640_adpp_is.mp4",
  "/videos/istockphoto-2225123086-640_adpp_is.mp4",
  "/videos/istockphoto-2180388788-640_adpp_is.mp4",
  "/videos/istockphoto-2180388788-640_adpp_is.mp4",
  "/videos/istockphoto-2180388788-640_adpp_is.mp4",
  "/videos/istockphoto-1426625999-640_adpp_is.mp4",
  "/videos/istockphoto-496962216-640_adpp_is.mp4",
  "/videos/istockphoto-637744234-640_adpp_is.mp4"
];


  useEffect(() => {
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    setBgVideo(randomVideo);
  }, []);

  const registerHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("پسورد و تکرار پسورد یکسان نیست ❌");
      return;
    }

    fetch("https://coffee-b43b3-default-rtdb.firebaseio.com/users.json")
      .then((res) => res.json())
      .then((data) => {
        const users = data ? Object.values(data) : [];

        const duplicateName = users.find(
          (user) => user.firstName === firstName && user.lastName === lastName
        );
        const duplicateEmail = users.find((user) => user.email === email);
        const duplicatePhone = users.find((user) => user.phone === phone);

        if (duplicateName) return alert("این نام و نام خانوادگی قبلا ثبت شده است ❌");
        if (duplicateEmail) return alert("این ایمیل قبلا ثبت شده است ❌");
        if (duplicatePhone) return alert("این شماره تلفن قبلا ثبت شده است ❌");

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setVerificationCode(code);

        emailjs
          .send(
            "service_e6m9its",
            "template_8eureh8",
            { to_email: email, to_name: firstName, code: code, from_name: "Coffee App" },
            "hdY7IA13w9C_fedoR"
          )
          .then(() => setStep("verify"))
          .catch((err) => console.error("خطا در ارسال ایمیل:", err));
      })
      .catch((err) => console.error("خطا در خواندن کاربران:", err));
  };

  const verifyHandler = (event) => {
    event.preventDefault();

    if (inputCode === verificationCode) {
      const userInfo = { firstName, lastName, email, phone, password, isLoggedIn: 1, isAdmin: 0 };

      fetch("https://coffee-b43b3-default-rtdb.firebaseio.com/users.json", {
        method: "POST",
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          const loggedInUser = { ...userInfo, id: data.name };
          setUser(loggedInUser);
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          setSuccessMessage("ثبت‌نام با موفقیت انجام شد 🎉");
          navigate("/");
        });

      setStep("register");
      setFirstName(""); setLastName(""); setEmail(""); setPhone("");
      setPassword(""); setConfirmPassword(""); setInputCode("");
    } else {
      alert("کد اشتباه است ❌");
    }
  };

  useEffect(() => {
    if (window.google && !googleUser) {
      window.google.accounts.id.initialize({
        client_id: "443087684795-a9dgd498gpe2qf1u3jrn38u57mqe8n0u.apps.googleusercontent.com",
        callback: (response) => {
          const payload = jwt_decode(response.credential);
          const userInfo = { firstName: payload.given_name, lastName: payload.family_name, email: payload.email, phone: "", isLoggedIn: 1, isAdmin: 0 };

          fetch("https://coffee-b43b3-default-rtdb.firebaseio.com/users.json", { method: "POST", body: JSON.stringify(userInfo) })
            .then((res) => res.json())
            .then((data) => {
              const loggedInUser = { ...userInfo, id: data.name };
              setUser(loggedInUser);
              localStorage.setItem("user", JSON.stringify(loggedInUser));
              setGoogleUser(loggedInUser);
              navigate("/");
            });
        },
      });

      window.google.accounts.id.renderButton(document.getElementById("google-signin"), { theme: "outline", size: "large" });
      window.google.accounts.id.prompt();
    }
  }, [googleUser, setUser, navigate]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {bgVideo && (
        <video src={bgVideo} autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      )}

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-4 relative z-10" dir="rtl">
          {successMessage && (
            <p className="text-white bg-orange-300 p-3 rounded mb-3 text-center">{successMessage}</p>
          )}

          {step === "register" && !googleUser && (
            <>
              <form className="flex flex-col space-y-3" autoComplete="off" onSubmit={registerHandler}>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="نام"
                  required
                  className="w-full px-4 py-2 border border-orange-300 rounded-lg text-left placeholder:text-white text-white focus:ring-2 focus:ring-orange-300 focus:outline-none bg-transparent"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="نام خانوادگی"
                  required
                  className="w-full px-4 py-2 border border-orange-300 rounded-lg text-left placeholder:text-white text-white focus:ring-2 focus:ring-orange-300 focus:outline-none bg-transparent"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ایمیل"
                  required
                  type="email"
                  className="w-full px-4 py-2 border border-orange-300 rounded-lg text-left placeholder:text-white text-white focus:ring-2 focus:ring-orange-300 focus:outline-none bg-transparent"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="شماره تلفن"
                  required
                  type="tel"
                  className="w-full px-4 py-2 border border-orange-300 rounded-lg text-left placeholder:text-white text-white focus:ring-2 focus:ring-orange-300 focus:outline-none bg-transparent"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="رمز عبور"
                    required
                    className="w-full px-4 py-2 border border-orange-300 rounded-lg text-left placeholder:text-white text-white focus:ring-2 focus:ring-orange-300 focus:outline-none bg-transparent"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-white hover:text-orange-200">
                    {showPassword ?
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
: 
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
                     }
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="تکرار رمز عبور"
                    required
                    className="w-full px-4 py-2 border border-orange-300 rounded-lg text-left placeholder:text-white text-white focus:ring-2 focus:ring-orange-300 focus:outline-none bg-transparent"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-3 flex items-center text-white hover:text-orange-200">
                    {showConfirmPassword ? 
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
: 
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
                    }
                  </button>
                </div>

                <button type="submit" className="w-full py-2 bg-orange-300 text-white font-semibold rounded-lg hover:bg-orange-400 transition">
                  ثبت‌نام
                </button>
              </form>

              <div className="flex items-center gap-2 my-3">
                <hr className="flex-grow border-orange-300" />
                <span className="text-orange-300 text-sm">یا</span>
                <hr className="flex-grow border-orange-300" />
              </div>

              <div className="text-center text-sm text-orange-300">ثبت‌نام با Google:</div>
              <div id="google-signin" className="flex justify-center mt-2"></div>
            </>
          )}

          {step === "verify" && (
            <form className="flex flex-col space-y-3" onSubmit={verifyHandler}>
              <p className="text-orange-300 text-sm">کدی که به ایمیل {email} ارسال شد را وارد کنید:</p>
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="کد تأیید"
                className="w-full px-4 py-2 border border-orange-300 rounded-lg text-left placeholder:text-white text-white focus:ring-2 focus:ring-orange-300 focus:outline-none bg-transparent"
                required
              />
              <button type="submit" className="w-full py-2 bg-orange-300 text-white font-semibold rounded-lg hover:bg-orange-400 transition">تایید</button>
            </form>
          )}

          {googleUser && (
            <div className="text-center">
              <h2 className="text-xl font-bold text-orange-300">خوش آمدید، {googleUser.firstName} {googleUser.lastName}</h2>
              <p className="text-orange-300">ایمیل: {googleUser.email}</p>
              <button onClick={() => setGoogleUser(null)} className="w-full py-2 bg-orange-300 text-white font-semibold rounded-lg hover:bg-orange-400 transition mt-3">خروج</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
