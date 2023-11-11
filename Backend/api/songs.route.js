const express = require("express");
const router = express.Router();

const SongsController = require("./songs.controller");

router.route("/playlist").post(SongsController.apiGetSongs);
router.route("/url").post(SongsController.getSongsByUrl);


module.exports = router;
