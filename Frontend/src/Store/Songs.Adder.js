import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AvaliableFromats: [],
};

const NewSongs = createSlice({
  name: "SongsSlice",
  initialState,
  reducers: {
    setFormats: (state, action) => {
      state.AvaliableFromats = action.payload;
    },
    clearList: (state) => {
      state.AvaliableFromats = [];
    },
  },
});

export const NewSongsActions = NewSongs.actions;
export default NewSongs.reducer;
