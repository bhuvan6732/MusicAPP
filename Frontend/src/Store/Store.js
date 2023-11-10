import {configureStore} from '@reduxjs/toolkit';

import playlistReducer from './Playlist.Slice';
import NewSongs from './Songs.Adder';

const store= configureStore({
    reducer:{
        NewSongs:NewSongs,
        playlist:playlistReducer
    }
});

export default store;