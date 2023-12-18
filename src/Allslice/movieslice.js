import {createSlice } from "@reduxjs/toolkit";



const initialState = {
    movie: [],
    favourites: [],
    recommendation:"",
    id:[]
}
export const movieslice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        add_to_favourites(state, action) {
            state.favourites.push(action.payload);
            console.log(action.payload,"favrts");
        },
        add_to_recommendation(state,action){
            console.log(action.payload.id,"recom");
            state.recommendation = action.payload.id;
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

export const { add_to_favourites, remove_from_favourites,add_movies,add_id,add_to_recommendation } = movieslice.actions;

export default movieslice.reducer;