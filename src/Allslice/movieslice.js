import {createSlice } from "@reduxjs/toolkit";



const initialState = {
    movie: [],
    favourites: [],
    id:[]
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
            
        },
        add_movies(state,action){
            state.movie.push(action.payload.response);
        },
        add_id(state,action){
            state.id.length=0;
            console.log(action);
            state.id.push(action.payload.name);
        }
    },
    
})

export const { add_to_favourites, remove_from_favourites,add_movies,add_id } = movieslice.actions;

export default movieslice.reducer;