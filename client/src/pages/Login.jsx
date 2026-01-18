import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style_log_in.css";

import myDriveLogo from "../assets/css/img/iconz/mydrive.png";
import googleLogo from "../assets/css/img/iconz/1200px-Google__G__logo.svg.png";
import facebookLogo from "../assets/css/img/iconz/768px-2023_Facebook_icon.svg.png";
import saveOnlineImg from "../assets/css/img/iconz/save-online.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 Converted version of login.js
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/Dashboard");
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="main" style={{
      minHeight: '100vh',
      background: 'linear-gradient(rgb(15, 221, 214), rgb(11, 105, 177))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0'
    }}>
      <div className="log_in">

        <div className="myd">
          <img src={myDriveLogo} alt="my-drive" height="45" />
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            padding: "0 20px"
          }}
        >
          <div>
            <input
              type="email"
              placeholder=" Email"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder=" Password"
              className="pwd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <br />
          <div>
             <button className="loginbtn" type="submit">
            Log in
             </button>
          </div>
        </form>

        <div className="fgt pwd" style={{ marginTop: "15px", display: 'flex', justifyContent: 'space-between', width: '90%', gap: '20px' }}>
          <a
            onClick={() => alert("Forgot password functionality coming soon")}
            style={{
              background: 'none',
              border: 'none',
              textDecoration: "none",
              color: "rgb(75, 75, 188)",
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Forgot password?
          </a>

          <a
            href="/signup"
            style={{
              textDecoration: "none",
              color: "rgb(75, 75, 188)",
              fontSize: '14px'
            }}
          >
            Create account
          </a>
        </div>

        <h4 style={{ marginTop: "20px", fontSize: '14px', color: '#333' }}>Sign up with</h4>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "40px",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <a href="#">
            <img className="gg" src={googleLogo} alt="google" height="35" />
          </a>

          <span style={{ marginTop: "8px" }}>or</span>

          <a href="#">
            <img className="fb" src={facebookLogo} alt="facebook" height="35" />
          </a>
        </div>
      </div>

      <div className="left">
        <img className="md" src={saveOnlineImg} alt="save online" />
      </div>
    </div>
  );
}
