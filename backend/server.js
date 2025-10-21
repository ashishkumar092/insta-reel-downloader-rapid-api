import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// 03adce9639mshabd0c097e5cac69p1fd2abjsn20309d522bfa
console.log("RAPID_API_KEY:", process.env.RAPID_API_KEY);

app.post("/api/reels", async (req, res) => {
  const { url } = req.body;
  console.log("Requested URL:", url);

 const options = {
  method: 'GET',
  url: 'https://instagram-api-reels-post-stories-downloader-api.p.rapidapi.com/instagram/',
  params: {url},
  headers: {
    'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
    'x-rapidapi-host': 'instagram-api-reels-post-stories-downloader-api.p.rapidapi.com'
  }
};

  try {
    const response = await axios.request(options);
    console.log("Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching reels:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch reels" });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
