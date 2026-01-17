import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";

import myDriveLogo from "../assets/css/img/iconz/mydrive.png";
import burgerIcon from "../assets/css/img/iconz/menu-burger.png";
import userImgPlaceholder from "../assets/css/img/images/user_img/img_1735582873460.jpg";

export default function Dashboard() {
  const navigate = useNavigate();

  // 🔹 State
  const [username, setUsername] = useState("demo");
  const [theme, setTheme] = useState("default");
  const [burgerOpen, setBurgerOpen] = useState(false);

  // 🔹 Fetch user info (like your fetch('/me'))
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/me", {
          credentials: "include",
        });

        if (res.status === 401) {
          console.log("Unauthorized, redirecting...");
          navigate("/login");
          return;
        }

        const user = await res.json();
        setUsername(user.name);
        setTheme(user.theme);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // 🔹 Burger toggle
  const toggleBurger = () => {
    setBurgerOpen((prev) => !prev);
  };

  // Optional: Apply theme dynamically
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--dis",
      burgerOpen ? "flex" : "none"
    );
  }, [burgerOpen]);

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ backgroundColor: "rgb(136, 218, 231)", width: "100%" }}>
          <div className="profile">
            <img className="userImg" src={userImgPlaceholder} alt="User" />
            <div style={{ display: "flex", width: "180px" }}>
              <img
                src={myDriveLogo}
                alt="mydrive"
                width="150px"
                style={{ width: "100%" }}
              />
            </div>

            <img
              className="burger"
              src={burgerIcon}
              width="34px"
              alt="menu"
              onClick={toggleBurger}
            />

            <div className="dropdown">
              <p id="name1">Welcome Back {username}</p>
              <a href="#">Shared Files</a>
              <a href="#">Favorites</a>
              <a href="#">Settings</a>
              <a onClick={toggleBurger}>Close</a>
            </div>
          </div>
        </div>

        <nav className="navbar">
          <p id="name">Welcome Back {username}</p>
          <a href="#">📁 Shared Files</a>
          <a href="#">⭐ Favorites</a>
          <a href="#">⚙ Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="search-bar">
          <input type="text" placeholder="Search files..." />
        </div>

        <section className="categories">
          <h3>Categories</h3>
          <div className="cards">
            <a href="/photos" style={{ textDecoration: "none" }}>
              <div className="card purple">
                📷 Pictures
                <br />
                <span>4 files</span>
              </div>
            </a>

            <div className="card green">
              📄 Documents
              <br />
              <span>0 files</span>
            </div>

            <a href="/videos" style={{ textDecoration: "none" }}>
              <div className="card pink">
                🎞 Videos
                <br />
                <span>3 files</span>
              </div>
            </a>

            <div className="card blue">
              🎵 Audio
              <br />
              <span>0 files</span>
            </div>
          </div>
        </section>

        <section className="recent-files">
          <h3>Recent Files</h3>
          {/* You can dynamically populate recent files here */}
        </section>
      </main>

      {/* Right Panel */}
      <aside className="right-panel">
        <div className="upload-box">
          <p>⬆ Add new files</p>
        </div>

        <div className="storage">
          <h4>Your Storage</h4>
          <div className="progress-bar">
            <div className="progress" style={{ width: "75%" }}></div>
          </div>
          <p>10 GB of 15 GB used</p>
        </div>

        <div className="shared-folders">
          <h4>Shared Folders</h4>
          <ul>
            <li>👨‍💻 My Work Files</li>
            <li>📷 Vacation Photos</li>
            <li>📊 Project Report</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
