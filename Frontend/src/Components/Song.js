import React from "react";
import { useDispatch } from "react-redux";
import { playlistActions } from "../Store/Playlist.Slice";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import "./../css/song.css";

const Song = (props) => {
  const dispatch = useDispatch();

  const songClickHandler = (key) => {
    dispatch(playlistActions.playSong(key));
  };

  const deleteHandler = (songIndex) => {
    dispatch(playlistActions.removeSong(songIndex));
  };
  return (
    <>
      <div className="song">
        <div className="song-name-container">
          <div
            className="song-name"
            onClick={() => {
              songClickHandler(props.songIndex);
            }}
          >
            {props.song.Title}
          </div>
        </div>

        <div className="delete-button">
          <IconButton aria-label="delete">
            <DeleteIcon
              onClick={() => {
                deleteHandler(props.songIndex);
              }}
            />
          </IconButton>
        </div>
      </div>
    </>
  );
};
export default Song;
