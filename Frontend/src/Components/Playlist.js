import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Song from "./Song";

const Playlist = () => {
  const AvaliableFromats = useSelector((state) => {
    return state.NewSongs.AvaliableFromats;
  });
  const songs = useSelector((state) => {
    return state.playlist.songs;
  });

  const elementStyles = {
    maxHeight: AvaliableFromats.length < 1 ? "60vh" : "30vh",
  };

  return (
    <>
      <div className="playlist-list" style={elementStyles}>
        {songs.map((songDetails, index) => (
          <Song key={index} songIndex={index} song={songDetails}></Song>
        ))}
      </div>
    </>
  );
};
export default Playlist;
