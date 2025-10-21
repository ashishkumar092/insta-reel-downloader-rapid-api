import express from "express";
import pkg from "instagram-url-direct";
import axios from "axios";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import ffmpegPath from "ffmpeg-static";

const getVideo = pkg.default; // ✅ Correct for ES Modules
const router = express.Router();

ffmpeg.setFfmpegPath(ffmpegPath);

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ message: "URL required" });

  try {
    // 1️⃣ Get direct MP4 URL from Instagram
    const videoInfo = await getVideo(url);
    const videoUrl = videoInfo.url;
    if (!videoUrl) return res.status(400).json({ message: "Invalid Instagram URL" });

    const tempVideoPath = path.join("./", "temp.mp4");
    const tempAudioPath = path.join("./", "audio.mp3");

    // 2️⃣ Download video as stream
    const videoResponse = await axios.get(videoUrl, { responseType: "stream" });
    const writer = fs.createWriteStream(tempVideoPath);
    videoResponse.data.pipe(writer);

    writer.on("finish", () => {
      // 3️⃣ Convert video to audio
      ffmpeg(tempVideoPath)
        .noVideo()
        .save(tempAudioPath)
        .on("end", () => {
          res.download(tempAudioPath, "audio.mp3", () => {
            // Clean up temp files
            fs.unlinkSync(tempVideoPath);
            fs.unlinkSync(tempAudioPath);
          });
        })
        .on("error", (err) => {
          console.error(err);
          res.status(500).json({ message: "Error converting video to audio" });
        });
    });

    writer.on("error", (err) => {
      console.error(err);
      res.status(500).json({ message: "Error saving video" });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to process Instagram video" });
  }
});

export default router;
