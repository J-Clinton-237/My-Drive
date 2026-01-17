import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/pic.css";

export default function Videos() {
  const navigate = useNavigate();

  // Optional: Dynamic video list
  const [videos, setVideos] = useState([
    {
      src: require("../assets/css/videos/ep 1.mp4"),
      caption: "The Boondocks episode 1",
    },
    {
      src: require("../assets/css/videos/ep 2.mp4"),
      caption: "The Boondocks episode 2",
    },
    {
      src: require("../assets/css/videos/ep 3.mp4"),
      caption: "The Boondocks episode 3",
    },
  ]);

  return (
    <div>
      <div className="header1">
        <h1 style={{ color: "white" }}>Videos</h1>
      </div>

      <main>
        {videos.map((video, index) => (
          <div className="vid" key={index}>
            <video controls width="1000">
              <source src={video.src} type="video/mp4" />
            </video>
            <div style={{ textAlign: "center", marginTop: "5px" }}>
              {video.caption}
            </div>
          </div>
        ))}
      </main>

      <div className="buttonBox">
        <button onClick={() => navigate("/dashboard")}>Back</button>
        <button onClick={() => alert("Add video functionality coming soon")}>
          Add
        </button>
      </div>
    </div>
  );
}
