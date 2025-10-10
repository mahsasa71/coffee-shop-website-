import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [step, setStep] = useState("register"); 
  const [bgVideo, setBgVideo] = useState("");


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

    fetch("https://coffee-b43b3-default-rtdb.firebaseio.com/users.json")
      .then((res) => res.json())
      .then((data) => {
        const users = data ? Object.values(data) : [];

        const duplicateName = users.find(
          (user) => user.firstName === firstName && user.lastName === lastName
        );
        const duplicateEmail = users.find((user) => user.email === email);
        const duplicatePhone = users.find((user) => user.phone === phone);

        if (duplicateName) {
          alert("این نام و نام خانوادگی قبلا ثبت شده است ❌");
          return;
        }
        if (duplicateEmail) {
          alert("این ایمیل قبلا ثبت شده است ❌");
          return;
        }
        if (duplicatePhone) {
          alert("این شماره تلفن قبلا ثبت شده است ❌");
          return;
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setVerificationCode(code);

        emailjs
          .send(
            "service_e6m9its",
            "template_8eureh8",
            {
              to_email: email,
              to_name: firstName,
              code: code,
              from_name: "Coffee App",
            },
            "hdY7IA13w9C_fedoR"
          )
          .then(
            (response) => {
              console.log("ایمیل ارسال شد:", response.status, response.text);
              setStep("verify");
            },
            (err) => {
              console.error("خطا در ارسال ایمیل:", err);
            }
          );
      })
      .catch((err) => console.error("خطا در خواندن کاربران:", err));
  };

  const verifyHandler = (event) => {
    event.preventDefault();

    if (inputCode === verificationCode) {
      const userInfo = { firstName, lastName, email, phone };

      fetch("https://coffee-b43b3-default-rtdb.firebaseio.com/users.json", {
        method: "POST",
        body: JSON.stringify(userInfo),
      }).then(() => console.log("کاربر ثبت شد ✅"));

      alert("ثبت‌نام با موفقیت انجام شد 🎉");
      setStep("register");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setInputCode("");
    } else {
      alert("کد اشتباه است ❌");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
    
      {bgVideo && (
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
      )}

      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {step === "register" && (
          <form
            className="w-full max-w-md rounded-2xl shadow-lg p-6 space-y-4 relative z-10"
            autoComplete="off"
            onSubmit={registerHandler}
          >
            <h2 className="text-2xl font-bold text-center text-white">
              ثبت‌نام
            </h2>

            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              placeholder="First Name"
              required
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              placeholder="Last Name"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="tel"
              placeholder="Phone Number"
              required
            />
            <button
              className="w-full py-2 bg-blue-600/80 text-white font-semibold rounded-lg hover:bg-blue-700/90 transition"
              type="submit"
            >
              Register
            </button>
          </form>
        )}

        {step === "verify" && (
          <form
            className="w-full max-w-md rounded-2xl shadow-lg p-6 space-y-4 relative z-10"
            onSubmit={verifyHandler}
          >
            <h2 className="text-xl font-bold text-center text-white">
              تأیید ایمیل
            </h2>
            <p className="text-white/80 text-center">
              کدی که به ایمیل {email} ارسال شد را وارد کنید:
            </p>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="کد تأیید"
              className="w-full px-4 py-2 border rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600/80 text-white font-semibold rounded-lg hover:bg-blue-700/90 transition"
            >
              Verify
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
