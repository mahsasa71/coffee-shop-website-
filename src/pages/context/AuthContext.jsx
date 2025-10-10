import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

 
  const login = async (email, password) => {
    try {
      const res = await fetch(
        "https://coffee-b43b3-default-rtdb.firebaseio.com/users.json"
      );
      const data = await res.json();

      if (!data) return { success: false, message: "هیچ کاربری ثبت نشده!" };

      const userId = Object.keys(data).find(
        (key) => data[key].email === email && data[key].password === password
      );
      if (!userId) return { success: false, message: "ایمیل یا پسورد اشتباه است!" };

      const userFound = data[userId];

      await fetch(
        `https://coffee-b43b3-default-rtdb.firebaseio.com/users/${userId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ isLoggedIn: 1 }),
        }
      );

      const loggedInUser = { ...userFound, isLoggedIn: 1, id: userId };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      return { success: true, user: loggedInUser };
    } catch (err) {
      console.error(err);
      return { success: false, message: "مشکلی پیش اومد!" };
    }
  };

 
  const loginWithGoogle = async (response) => {
    const payload = jwt_decode(response.credential);

    const googleUser = {
      name: payload.name || payload.given_name || "User",
      email: payload.email,
      isLoggedIn: 1,
      provider: "google",
    };

    try {
      const res = await fetch(
        "https://coffee-b43b3-default-rtdb.firebaseio.com/users.json"
      );
      const data = await res.json();

      
      const userKey = data
        ? Object.keys(data).find((key) => data[key].email === googleUser.email)
        : null;

      if (userKey) {
       
        await fetch(
          `https://coffee-b43b3-default-rtdb.firebaseio.com/users/${userKey}.json`,
          {
            method: "PATCH",
            body: JSON.stringify({ isLoggedIn: 1 }),
          }
        );
        googleUser.id = userKey;
      } else {
        
        const createRes = await fetch(
          "https://coffee-b43b3-default-rtdb.firebaseio.com/users.json",
          {
            method: "POST",
            body: JSON.stringify({ ...googleUser }),
          }
        );
        const keyData = await createRes.json();
        googleUser.id = keyData.name;
      }

      setUser(googleUser);
      localStorage.setItem("user", JSON.stringify(googleUser));
    } catch (err) {
      console.error("Google login error:", err);
    }
  };


  const logout = async () => {
    if (user?.id) {
      await fetch(
        `https://coffee-b43b3-default-rtdb.firebaseio.com/users/${user.id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ isLoggedIn: 0 }),
        }
      );
    }

    setUser(null);
    localStorage.removeItem("user");


    localStorage.removeItem("cart"); 
    window.dispatchEvent(new Event("cartCleared"));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, loginWithGoogle, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
