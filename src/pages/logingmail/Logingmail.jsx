import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import './Logingmail.css'

function Logingmail() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user && window.google) {
      google.accounts.id.initialize({
        client_id:
          "443087684795-a9dgd498gpe2qf1u3jrn38u57mqe8n0u.apps.googleusercontent.com",
        callback: (response) => {
          const payload = jwt_decode(response.credential); 
          console.log("Payload =>", payload);

          setUser({
            name: payload.name || payload.given_name || "User",
            picture: payload.picture || "",
            email: payload.email || "",
          });
        },
      });

      google.accounts.id.renderButton(document.querySelector(".sign-in"), {
        theme: "outline",
        size: "large",
      });

      google.accounts.id.prompt();
    }
  }, [user]);

  const logout = () => {
    setUser(null);
  };

  return (
    <>
      {!user && (
        <div className="login-page">
          <div className="form">
            <form className="register-form">
              <input type="text" placeholder="name" />
              <input type="password" placeholder="password" />
              <input type="text" placeholder="email address" />
              <button>create</button>
              <p className="message">
                Already registered? <a href="#">Sign In</a>
              </p>
            </form>
            <form className="login-form">
              <input type="text" placeholder="username" />
              <input type="password" placeholder="password" />
              <div className="sign-in"></div>
              <br />
              <button>login</button>
              <p className="message">
                Not registered? <a href="#">Create an account</a>
              </p>
            </form>
          </div>
        </div>
      )}

      {user && (
        <div>
          <img src={user.picture} alt="user profile" />
          <h2>Welcome, {user.name}</h2>
          <hr />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </>
  );
}

export default Logingmail;
