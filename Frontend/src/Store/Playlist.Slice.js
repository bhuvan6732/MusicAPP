import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: localStorage.getItem("currentSong") || 0,
  songs: JSON.parse(localStorage.getItem("songs")) || [],
};

const playlist = createSlice({
  name: "playListSlice",
  initialState,
  reducers: {
    playNext: (state) => {
      if (state.currentSong + 1 < state.songs.length) {
        state.currentSong++;
      } else {
        state.currentSong = 0;
      }
    },
    appendSong: (state, action) => {
      state.songs.push(action.payload);
      localStorage.setItem("songs", JSON.stringify(state.songs));
    },
    playSong: (state, action) => {
      state.currentSong = action.payload;
      localStorage.setItem("currentSong", JSON.stringify(state.currentSong));
    },
    removeSong: (state, action) => {
      state.currentSong--;
      state.songs.splice(action.payload, 1);

      localStorage.setItem("currentSong", JSON.stringify(state.currentSong));
      localStorage.setItem("songs", JSON.stringify(state.songs));
    },
  },
});

export const playlistActions = playlist.actions;
export default playlist.reducer;
