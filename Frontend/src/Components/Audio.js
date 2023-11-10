import "./../css/song.css";
import React from "react";
import { useEffect, useRef } from "react";

const Audio = (props) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.src = props.song.Url;
      audioElement.load();
    }
  }, [props.song.Url]);

  return (
    <div className="song-container-parent">
      <div
        className="song-container"
        style={{ backgroundImage: `url(${props.song.Thumbnail})` }}
      >
        <div className="song-name-player">{props.song.Title}</div>
        <div className="song-author">Author:{props.song.Author}</div>
        <div className="player-container">
          <audio
            autoPlay
            onEnded={props.handleAudioEnd}
            preload="auto"
            controls
            ref={audioRef}
          >
            <source src={props.song.src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
};
export default Audio;
