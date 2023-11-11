import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import axios from "axios";
import { NewSongsActions } from "../Store/Songs.Adder";
import { playlistActions } from "../Store/Playlist.Slice";

import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

const Adder = () => {
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const AvaliableFromats = useSelector((state) => {
    return state.NewSongs.AvaliableFromats;
  });
  const clickHandler = async () => {
    try {
      setLoading(true);
      if (search.trim().length < 1) {
        setError("Invalid Link");
        setLoading(false);
        return;
      }

      const playlist = (function extractPlaylistId(link) {
        const playlistRegex = /(?:list=)([a-zA-Z0-9_-]+)/;
        const match = link.match(playlistRegex);
        if (match && match[1]) {
          return match[1];
        } else {
          return false;
        }
      })(search);

      if (!playlist) {
        const response = await axios.post(
          `https://spoti5.onrender.com/api/v1/songs/url`,
          {
            search,
          }
        );
        if (response) {
          setLoading(false);
          console.log(response.data);
          dispatch(NewSongsActions.setFormats(response.data));
        }
      }
      if (playlist) {
        const response = await axios.post(
          "https://spoti5.onrender.com/api/v1/songs/playlist",
          { playlistlink: playlist }
        );
        if (response) {
          setLoading(false);
          dispatch(NewSongsActions.setFormats(response.data[0]));
          console.log(response.data[0]);
        }
      }
    } catch (e) {
      setLoading(false);
      setError(e.message || "Not found");
    }
  };

  const changeHandler = (event) => {
    setError("");
    setSearch(event.target.value);
  };

  const addClickHandler = (song) => {
    dispatch(playlistActions.appendSong(song));
    dispatch(NewSongsActions.clearList());
    setSearch("");
  };

  return (
    <>
      <div className="url-input">
        <TextField
          id="outlined-multiline-flexible"
          label="Enter Url"
          multiline
          maxRows={4}
          placeholder="Youtube urls only"
          value={search}
          onChange={changeHandler}
          fullWidth
        />
      </div>
      <div className="search">
        <LoadingButton
          onClick={clickHandler}
          loading={loading}
          variant="contained"
          fullWidth
        >
          <span>search</span>
        </LoadingButton>
      </div>

      <p className="error">{`${error}`}</p>
      {AvaliableFromats.length > 0 ? (
        <button
          onClick={() => {
            dispatch(playlistActions.addAll(AvaliableFromats));
            dispatch(NewSongsActions.clearList());
          }}
        >
          Add All Songs
        </button>
      ) : (
        ""
      )}
      <div className="adder-formats">
        <ul>
          {AvaliableFromats.map((element, index) =>
            element ? (
              <li key={index}>
                <p> Title: {element.Title}</p>
                <button
                  onClick={() => {
                    addClickHandler(element);
                  }}
                >
                  {" "}
                  {element.Audio_Bitrate}
                </button>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </>
  );
};

export default Adder;
