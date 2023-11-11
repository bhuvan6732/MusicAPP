const axios = require("axios");
const ytdl = require("ytdl-core");

module.exports = class MoviesController {
  static async apiGetSongs(req, res) {
    try {
      const playlistId = encodeURIComponent(req.body.playlistlink);
      const songsObj = [];
      await getVedioURLS(playlistId, "", songsObj);
      res.json(songsObj);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      res.status(500).json("Internal Error");
    }
  }

  static async getSongsByUrl(req, res, next) {
    try {
      let videoUrl = req.body.search || "";
      const songObj = await getSongAPI(videoUrl);
      res.send(songObj);
    } catch (e) {
      if (e.message.trim().startsWith("No video id found:")) {
        res
          .status(404)
          .json({ status: "Failed", message: "No video id found" });
      } else {
        console.error(e.message);
        res.status(500).json({
          status: "Failed",
          message: "Internal Error we are working on it",
        });
      }
    }
  }
};

const getSongAPI = async (link) => {
  try {
    const videoInfo = await ytdl.getInfo(link);
    const audioFormats = ytdl.filterFormats(videoInfo.formats, "audioonly");
    const songObj = [];
    audioFormats.map((el) => {
      const song = {
        Title: videoInfo.player_response.videoDetails.title,
        Author: videoInfo.player_response.videoDetails.author,
        Thumbnail:
          videoInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
        Audio_Bitrate: Math.floor(parseInt(el.bitrate) / 1000) + " kbps",
        Url: el.url,
      };
      songObj.push(song);
    });
    return songObj;
  } catch (e) {
    return [];
  }
};

const getVedioURLS = async (playlistId, pageToken, Songs) => {
  const apiKey = process.env.YOUR_API_KEY || "";
  const PAGETOKEN = pageToken || "";
  const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=${50}&pageToken=${PAGETOKEN}`;
  const response = await axios.get(apiUrl);
  if (response) {
    const videoItems = response.data.items;
    const songs = [];
    if (videoItems.length > 0) {
      const songsObj = await bulkAdd(videoItems);
      Songs.push(songsObj);
    } else {
      console.log("No videos found in the playlist.");
    }
    if (response.data.nextPageToken) {
      await getVedioURLS(playlistId, response.data.nextPageToken, Songs);
    }
  }
};

const bulkAdd = async (videoItems) => {
  try {
    const songs = [];
    const songsObj = [];
    for (const item of videoItems) {
      const videoId = item.contentDetails.videoId;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const songAPI = await getSongAPI(videoUrl);
      songsObj.push(songAPI[0]);
      songs.push(videoUrl);
    }
    return songsObj;
  } catch (e) {
    return [];
  }
};
