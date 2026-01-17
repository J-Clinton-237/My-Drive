import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/pic.css";

export default function Photos() {
  const navigate = useNavigate();

  // Optional: If you want to dynamically add photos later
  const [photos, setPhotos] = useState([
    {
      src: require("../assets/css/img/images/pexels-david-besh-884788.jpg"),
      caption: "A beautiful view of the Moon",
    },
    {
      src: require("../assets/css/img/images/pexels-eberhardgross-1301976.jpg"),
      caption: "Night photo of a Lake",
    },
    {
      src: require("../assets/css/img/images/pexels-eberhardgross-1612351.jpg"),
      caption: "",
    },
    {
      src: require("../assets/css/img/images/pexels-eberhardgross-1612353.jpg"),
      caption: "Another Cool compound close to the shore",
    },
  ]);

  return (
    <div>
      <div className="header">
        <h1>Pictures</h1>
      </div>

      <main>
        {photos.map((photo, index) => (
          <div className="pic" key={index}>
            <img src={photo.src} alt={photo.caption || `Photo ${index + 1}`} />
            <div style={{ textAlign: "center", marginTop: "5px" }}>
              {photo.caption}
            </div>
          </div>
        ))}
      </main>

      <div className="buttonBox">
        <button onClick={() => navigate("/dashboard")}>Back</button>
        <button onClick={() => alert("Add photo functionality coming soon")}>
          Add
        </button>
      </div>
    </div>
  );
}
