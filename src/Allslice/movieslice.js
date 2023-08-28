import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchmovies = createAsyncThunk("movie/fetchmovies", async () => {
    let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2d921565951a5d52a62408d8908bc5ab`);
    response = response.json();
    console.log("response hunnn", response);
    return response;
})

const initialState = {
    movie: {},
    moviefullfilled: false,
    favourites: []
}
export const movieslice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        add_to_favourites(state, action) {
            state.favourites.push(action.payload);
        },
        remove_from_favourites(state, action) {
            state.favourites.splice(state.favourites.findIndex((elem) => elem.item.id === action.payload.item.id),1);
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchmovies.pending, () => {
        });
        builder.addCase(fetchmovies.fulfilled, (state, action) => {
            return { ...state, movie: action.payload.results, fullfilled: true };
        });
        builder.addCase(fetchmovies.rejected, () => {
            console.log("error");
        })
    }
})

export const { add_to_favourites, remove_from_favourites } = movieslice.actions;

export default movieslice.reducer;