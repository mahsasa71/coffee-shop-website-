import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import jwt_decode from "jwt-decode"; 
import "./Register.css";

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
  const [googleUser, setGoogleUser] = useState(null); // کاربر Google
  const [currentUserId, setCurrentUserId] = useState(null); // ✅ نگه داشتن id کاربر

  // ثبت نام معمولی
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
          .then(() => setStep("verify"))
          .catch((err) => console.error("خطا در ارسال ایمیل:", err));
      })
      .catch((err) => console.error("خطا در خواندن کاربران:", err));
  };

  // بررسی کد وارد شده
  const verifyHandler = (event) => {
    event.preventDefault();

    if (inputCode === verificationCode) {
      const userInfo = { 
        firstName, 
        lastName, 
        email, 
        phone, 
        password,
        isLoggedIn: 1   // ✅
      };

      fetch("https://coffee-b43b3-default-rtdb.firebaseio.com/users.json", {
        method: "POST",
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("کاربر ثبت شد ✅");
          setCurrentUserId(data.name); // ✅ ذخیره id از Firebase
        });

      alert("ثبت‌نام با موفقیت انجام شد 🎉");
      setStep("register");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setInputCode("");
    } else {
      alert("کد اشتباه است ❌");
    }
  };

  // Google Sign-In
  useEffect(() => {
    if (window.google && !googleUser) {
      google.accounts.id.initialize({
        client_id:
          "443087684795-a9dgd498gpe2qf1u3jrn38u57mqe8n0u.apps.googleusercontent.com",
        callback: (response) => {
          const payload = jwt_decode(response.credential);
          const userInfo = {
            firstName: payload.given_name || "",
            lastName: payload.family_name || "",
            email: payload.email,
            phone: "",
            isLoggedIn: 1   // ✅
          };

          fetch("https://coffee-b43b3-default-rtdb.firebaseio.com/users.json", {
            method: "POST",
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("کاربر Google ثبت شد ✅");
              setCurrentUserId(data.name); // ✅ ذخیره id کاربر
              setGoogleUser(userInfo);
            });
        },
      });

      google.accounts.id.renderButton(
        document.getElementById("google-signin"),
        { theme: "outline", size: "large" }
      );

      google.accounts.id.prompt();
    }
  }, [googleUser]);

  // ✅ Logout
  const logoutGoogle = () => {
    if (currentUserId) {
      fetch(
        `https://coffee-b43b3-default-rtdb.firebaseio.com/users/${currentUserId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ isLoggedIn: 0 }),
        }
      ).then(() => console.log("کاربر از سیستم خارج شد ❌"));
    }
    setGoogleUser(null);
    setCurrentUserId(null);
  };

  return (
    <div className="form-container">
      {step === "register" && !googleUser && (
        <>
          <form
            className="register-form"
            autoComplete="off"
            onSubmit={registerHandler}
          >
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-field"
              type="text"
              placeholder="First Name"
              required
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-field"
              type="text"
              placeholder="Last Name"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-field"
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-field"
              type="tel"
              placeholder="Phone Number"
              required
            />

            <div className="form-field password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <span
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <div className="form-field password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
              <span
                className="toggle-eye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: "pointer" }}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button className="form-field" type="submit">
              Register
            </button>
          </form>

          <div style={{ marginTop: "20px" }}>
            <p>یا با Google ثبت‌نام کنید:</p>
            <div id="google-signin"></div>
          </div>
        </>
      )}

      {step === "verify" && (
        <form className="register-form" onSubmit={verifyHandler}>
          <p>کدی که به ایمیل {email} ارسال شد را وارد کنید:</p>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="کد تأیید"
            className="form-field"
            required
          />
          <button className="form-field" type="submit">
            Verify
          </button>
        </form>
      )}

      {googleUser && (
        <div>
          <h2>Welcome, {googleUser.firstName} {googleUser.lastName}</h2>
          <p>Email: {googleUser.email}</p>
          <button onClick={logoutGoogle}>Logout</button>
        </div>
      )}
    </div>
  );
}
