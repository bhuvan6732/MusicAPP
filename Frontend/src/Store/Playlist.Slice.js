import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: parseInt(localStorage.getItem("currentSong")) || 0,
  songs: JSON.parse(localStorage.getItem("songs")) || [],
};

const playlist = createSlice({
  name: "playListSlice",
  initialState,
  reducers: {
    playNext: (state) => {
      if (state.currentSong + 1 < state.songs.length) {
        state.currentSong++;
        localStorage.setItem("songs", JSON.stringify(state.songs));
      } else {
        state.currentSong = 0;
        localStorage.setItem("songs", JSON.stringify(state.songs));
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
    addAll:(state,action)=>{
      state.songs= state.songs.concat(action.payload);
      localStorage.setItem('songs',JSON.stringify(state.songs));
    },
    removeSong: (state, action) => {
      if (state.currentSong >= action.payload) {
        state.currentSong - 1 > 0
          ? state.currentSong--
          : state.songs.length > 0
          ? (state.currentSong = 0)
          : (state.currentSong = -1);
        localStorage.setItem("currentSong", JSON.stringify(state.currentSong));
        state.songs.splice(action.payload, 1);

        localStorage.setItem("songs", JSON.stringify(state.songs));
      } else {
        localStorage.setItem("currentSong", JSON.stringify(state.currentSong));
        state.songs.splice(action.payload, 1);
        localStorage.setItem("songs", JSON.stringify(state.songs));
      }
    },
  },
});

export const playlistActions = playlist.actions;
export default playlist.reducer;
