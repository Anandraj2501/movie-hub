import {configureStore} from "@reduxjs/toolkit";
import movieslice from "./Allslice/movieslice";
import singleitemslice from "./Allslice/singleitemslice";
export const store = configureStore({
    reducer:{
        Movie: movieslice,
        Item: singleitemslice
    }
})