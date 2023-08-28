import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchsingleitem = createAsyncThunk("singleitem/fetchsingleitem", async (item)=>{
    let singleitemresponse = await fetch(`https://api.themoviedb.org/3/movie/${item.item.id}?api_key=2d921565951a5d52a62408d8908bc5ab`);
    
    singleitemresponse = singleitemresponse.json();
    
    console.log(singleitemresponse);
    return singleitemresponse;
})

export const fetchcredits = createAsyncThunk("singleitem/fetchcredits",async(item)=>{
    let credits = await fetch(`https://api.themoviedb.org/3/movie/${item.item.id}/credits?api_key=2d921565951a5d52a62408d8908bc5ab`);
    credits = credits.json();
    console.log(credits);
    return credits;
})

export const fetchtrailer = createAsyncThunk("singleitem/fetchtrailer",async(item)=>{
    let trailer = await fetch(`https://api.themoviedb.org/3/movie/${item.item.id}/videos?api_key=2d921565951a5d52a62408d8908bc5ab`);
    trailer = trailer.json();
    console.log(trailer);
    return trailer;
})

const initialState={
    item:[],
    credits:[],
    trailer:[],
    reqfullfilled: false
}

export const singleItemSlice = createSlice({
    name:"singleitem",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchsingleitem.pending,(state,action)=>{
            console.log("pending");
        });
        builder.addCase(fetchsingleitem.fulfilled,(state,action)=>{
            state.item.length = 0;
            state.item.push(action.payload);
        });
        builder.addCase(fetchsingleitem.rejected,(state,action)=>{
            console.log("error")
        });
        builder.addCase(fetchcredits.pending,(state,action)=>{
        });
        builder.addCase(fetchcredits.fulfilled,(state,action)=>{
            state.credits.length = 0;
            
            state.credits.push(action.payload);
            console.log(state.reqfullfilled);
        });
        builder.addCase(fetchtrailer.fulfilled,(state,action)=>{
            state.trailer.length = 0;
            state.trailer.push(action.payload);
            state.reqfullfilled = true;
            
        });

    }
})

export const {add_singleitem} = singleItemSlice.actions;
export default singleItemSlice.reducer;