import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [bgVideo, setBgVideo] = useState(""); 

  const { login, loginWithGoogle: loginWithGoogleContext, user, logout } =
    useContext(AuthContext);
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

  const loginHandler = async (event) => {
    event.preventDefault();
    const result = await login(email, password);

    if (result.success) {
      setMessage(`خوش اومدی ${result.user.firstName || result.user.name}`);
      navigate("/");
    } else {
      setMessage(result.message);
    }
  };

  const loginWithGoogle = async (response) => {
    await loginWithGoogleContext(response);
    navigate("/");
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "443087684795-a9dgd498gpe2qf1u3jrn38u57mqe8n0u.apps.googleusercontent.com",
        callback: loginWithGoogle,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin"),
        { theme: "outline", size: "large" }
      );

      window.google.accounts.id.prompt();
    }
  }, [loginWithGoogle]);

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

    
      <div className="relative z-10 flex items-center justify-center min-h-screen" dir="rtl">
        {!user ? (
          <form
            onSubmit={loginHandler}
            className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-4 relative z-10"
            autoComplete="off"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">
              ورود به حساب
            </h2>

            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="ایمیل"
              name="email"
              required
              className="w-full px-4 py-2 border border-orange-300 rounded-lg text-left placeholder:text-white focus:ring-2 focus:ring-orange-300 focus:outline-none bg-transparent text-white"
            />

            <div className="relative">
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور"
                name="password"
                required
                className="w-full px-4 py-2 border border-orange-300 rounded-lg text-left placeholder:text-white focus:ring-2 focus:ring-orange-300 focus:outline-none bg-transparent text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-white hover:text-orange-200"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-orange-300 text-white font-semibold rounded-lg hover:bg-orange-400 transition"
            >
              ورود
            </button>

            <div className="flex items-center gap-2">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-500 text-sm">یا</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <p className="text-center text-sm text-white">ورود با Google:</p>
            <div id="google-signin" className="flex justify-center"></div>
          </form>
        ) : (
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center space-y-4 relative z-10">
            <h2 className="text-xl font-bold text-gray-800">
              خوش آمدی، {user.firstName || user.name}
            </h2>
            <p className="text-gray-600">ایمیل: {user.email}</p>

            <button
              onClick={logout}
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              خروج
            </button>
          </div>
        )}

        {message && (
          <p className="absolute bottom-4 text-blue-600 font-medium z-10">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
