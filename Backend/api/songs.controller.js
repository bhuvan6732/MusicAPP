const ytdl = require("ytdl-core");

module.exports = class MoviesController {
  static async apiGetSongs(req, res) {
    res.json("Yet to implement thanks for the support");
  }
  
  static async getSongsByUrl(req, res, next) {
    try {
      let videoUrl = req.body.search || "";
      console.log(videoUrl);

      const videoInfo = await ytdl.getInfo(videoUrl);
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
      res.send(songObj);
    } catch (e) {
      if (e.message.trim().startsWith("No video id found:")) {
        res
          .status(404)
          .json({ status: "Failed", message: "No video id found" });
      } else {
        console.error(e.message);
        res.status(404).json({
          status: "Failed",
          message: "Internal Error we are working on it",
        });
      }
    }
  }
};
