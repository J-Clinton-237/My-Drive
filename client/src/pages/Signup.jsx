import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style_log_in.css";

import myDriveLogo from "../assets/css/img/iconz/mydrive.png";

export default function Signup() {
  const navigate = useNavigate();

  // 🔹 State (replaces document.getElementById)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔹 Converted signup.js logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name: firstName,
        }),
      });

      const data = await res.json();
      
      if (data.message === "Success") {
        alert("Account created successfully! Please log in.");
        navigate("/");
      } else {
        alert(data.message);
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
      <div className="sign_up">
        <img
          className="logo1"
          src={myDriveLogo}
          alt="my-drive"
          height="45"
        />

        <br />

        <div style={{ marginLeft: "10%" }}>
          <form id="signupForm" onSubmit={handleSubmit}>
            First Name
            <input
              type="text"
              placeholder="John"
              className="fdFname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            Last Name
            <input
              type="text"
              placeholder="Doe"
              className="fdLname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <br />

            Date of Birth
            <br />
            <input
              type="date"
              className="fd1age"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            <br />

            Email
            <br />
            <input
              type="email"
              placeholder="e.g johndoe@email.com"
              className="fd1email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <br />

            Password
            <br />
            <input
              type="password"
              placeholder=" Password"
              className="fd1pwd1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <br />

            Confirm Password
            <br />
            <input
              type="password"
              placeholder=" Password"
              className="fd1pwd1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <br />

            <input type="submit" className="signupbtn" value="Sign Up" />
          </form>

          <br />

          <div style={{ marginLeft: "20%", marginTop: "3%" }}>
            Already have an account?{" "}
            <a href="/" style={{ textDecoration: "none" }}>
              Log in instead
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
