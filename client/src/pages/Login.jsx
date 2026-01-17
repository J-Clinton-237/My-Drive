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
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/home");
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="main">
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
          <button className="loginbtn" type="submit">
            Log in
          </button>
        </form>

        <div className="fgt pwd" style={{ marginTop: "4%" }}>
          <a
            href="#"
            style={{
              textAlign: "left",
              textDecoration: "none",
              marginRight: "30%",
              color: "rgb(75, 75, 188)",
            }}
          >
            Forgot password?
          </a>

          <a
            href="/signup"
            style={{
              textAlign: "right",
              textDecoration: "none",
              color: "rgb(75, 75, 188)",
            }}
          >
            Create account
          </a>
        </div>

        <h4 style={{ marginTop: "3%" }}>Sign up with</h4>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: "60%",
            justifyContent: "center",
            marginTop: "5%",
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
