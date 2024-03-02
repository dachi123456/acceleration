import { configureStore } from "@reduxjs/toolkit";
import tagsReducer from './slices/tags.slice';

const store = configureStore({
    reducer: {
        tag: tagsReducer 
    }
});

export default store;
