import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchsingleitem = createAsyncThunk("singleitem/fetchsingleitem", async (id)=>{
    let singleitemresponse = await fetch(`https://api.themoviedb.org/3/movie/${id.id}?api_key=2d921565951a5d52a62408d8908bc5ab`);
    singleitemresponse = singleitemresponse.json();
    console.log(singleitemresponse);
    return singleitemresponse;
    
})

export const fetchcredits = createAsyncThunk("singleitem/fetchcredits",async(id)=>{
    let credits = await fetch(`https://api.themoviedb.org/3/movie/${id.id}/credits?api_key=2d921565951a5d52a62408d8908bc5ab`);
    credits = credits.json();
    return credits;
})

export const fetchtrailer = createAsyncThunk("singleitem/fetchtrailer",async(id)=>{
    let trailer = await fetch(`https://api.themoviedb.org/3/movie/${id.id}/videos?api_key=2d921565951a5d52a62408d8908bc5ab`);
    trailer = trailer.json();
    return trailer;
})

export const fetchsimilar = createAsyncThunk("singleitem/fetchsimilar",async(id)=>{
    let similar = await fetch(`https://api.themoviedb.org/3/movie/${id.id}/recommendations?api_key=2d921565951a5d52a62408d8908bc5ab`);
    similar = similar.json();
    return similar;
})



const initialState={
    item:[],
    credits:[],
    trailer:[],
    similaritems:[],
    similarreq:false,
    reqfullfilled: false
}

export const singleItemSlice = createSlice({
    name:"singleitem",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        
        builder.addCase(fetchsingleitem.fulfilled,(state,action)=>{
            state.item.length = 0;
            state.item.push(action.payload);
        });
        builder.addCase(fetchcredits.fulfilled,(state,action)=>{
            state.credits.length = 0;
            state.credits.push(action.payload);
        });
        builder.addCase(fetchtrailer.fulfilled,(state,action)=>{
            state.trailer.length = 0;
            state.trailer.push(action.payload);
            state.reqfullfilled = true;
            
        });
        builder.addCase(fetchsimilar.fulfilled,(state,action)=>{
            state.similaritems.length=0;
            state.similaritems.push(action.payload);
            state.similarreq = true;
        }); 

    }
})

export const {add_singleitem} = singleItemSlice.actions;
export default singleItemSlice.reducer;