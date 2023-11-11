import axios from "axios";
import "./../css/song.css";
import React from "react";
import { useEffect, useRef } from "react";

const Audio = (props) => {
  const audioRef = useRef(null);

  useEffect(() => {
    try {
      const audioElement = audioRef.current;
      if (audioElement) {
        audioElement.src = props.song.Url;
        audioElement.load();
      }
    } catch (e) {
      props.handleAudioEnd();
    }
  }, [props.song.Url]);

  const handleAudioError = (handleAudioEnd) => {
    handleAudioEnd();
  };

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
            onError={() => {
              handleAudioError(props.handleAudioEnd);
            }}
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
