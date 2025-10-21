import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReel = async () => {
    if (!url) return alert("Enter Instagram Reel URL");
    setLoading(true);
    setDownloadLink("");
    setUrl("")


    try {
      const res = await axios.post("http://localhost:5000/api/reels", { url });
      console.log("Server Response:", res.data);

      const reelUrl =
        res.data.result?.[0]?.url ||
        res.data.video_url ||
        res.data.data?.[0]?.url;

      if (reelUrl) {
        setDownloadLink(reelUrl);
      } else {
        alert("No reel found. Try another URL.");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching reel");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">🎵 Instagram Reel Downloader</h1>
        <p className="subtitle">
          Paste any public Instagram Reel URL below to get a direct download link.
        </p>

        <div className="input-section">
          <input
            type="text"
            placeholder="Paste Instagram Reel URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={fetchReel} disabled={loading}>
            {loading ? "Fetching..." : "Get Link"}
          </button>
        </div>

        {downloadLink && (
          <div className="result">
            <div className="video-container">
              <video src={downloadLink} controls />
            </div>

            <a
              href={downloadLink}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn"
            >
              ⬇ Download Reel
            </a>
          </div>
        )}
      </div>

      <footer>Made with ❤️ for Educational Purpose Only</footer>
    </div>
  );
}

export default App;


