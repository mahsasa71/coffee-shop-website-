import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode"; // برای Google Sign-In
import './Logingmail.css'
export default function LoginGoogleWithPassword() {
  const [googleUser, setGoogleUser] = useState(null); // کاربر گوگل
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ اضافه کردن Google Sign-In
  useEffect(() => {
    if (window.google && !googleUser) {
      google.accounts.id.initialize({
        client_id:
          "443087684795-a9dgd498gpe2qf1u3jrn38u57mqe8n0u.apps.googleusercontent.com",
        callback: (response) => {
          const payload = jwt_decode(response.credential);
          console.log("Google Payload =>", payload);

          setGoogleUser({
            name: payload.name || payload.given_name || "User",
            email: payload.email,
          });

          setMessage(`خوش اومدی ${payload.name || payload.given_name}`);
        },
      });

      google.accounts.id.renderButton(
        document.getElementById("google-signin"),
        { theme: "outline", size: "large" }
      );

      google.accounts.id.prompt();
    }
  }, [googleUser]);

  const logoutGoogle = () => {
    setGoogleUser(null);
    setMessage("");
  };

  return (
    <div className="form-container">
      {!googleUser && (
        <div style={{ marginTop: "20px" }}>
          <p>برای ورود با Google کلیک کنید:</p>
          <div id="google-signin"></div>

          {/* بخش پسورد با حالت چشم */}

        </div>
      )}

      {googleUser && (
        <div>
          <h2>Welcome, {googleUser.name}</h2>
          <p>Email: {googleUser.email}</p>
          
          <button onClick={logoutGoogle}>Logout</button>
        </div>
      )}

      {message && <p style={{ marginTop: "10px", color: "blue" }}>{message}</p>}
    </div>
  );
}
