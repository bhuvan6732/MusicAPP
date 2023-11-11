import React from "react";
import Audio from "./Audio";
import { playlistActions } from "../Store/Playlist.Slice";
import { useDispatch, useSelector } from "react-redux";
import Adder from "./SongsAdder";
import Playlist from "./Playlist";

const Homepage = () => {
  const dispatch = useDispatch();

  const currentSong = useSelector((state) => {
    return state.playlist.currentSong;
  });
  const playlist = useSelector((state) => {
    return state.playlist.songs;
  });

  const handleAudioEnd = () => {
    dispatch(playlistActions.playNext());
  };

  return (
    <>
      <Adder></Adder>
      <Playlist></Playlist>
      {playlist.length > 0 ? (
        <Audio
          current={currentSong}
          handleAudioEnd={handleAudioEnd}
          song={playlist[currentSong]}
        ></Audio>
      ) : (
        <p>Add songs to play</p>
      )}
    </>
  );
};
export default Homepage;
