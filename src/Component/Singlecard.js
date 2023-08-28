import React from 'react'
import "../Css/Singlecard.css"
import 'remixicon/fonts/remixicon.css'
import { useDispatch, useSelector } from 'react-redux';
import { add_to_favourites, remove_from_favourites } from '../Allslice/movieslice';
import {
    Link

} from "react-router-dom";
import { fetchsingleitem} from '../Allslice/singleitemslice';

import {fetchcredits,fetchtrailer} from "../Allslice/singleitemslice";
export default function Singlecard() {
    const movie = useSelector((state) => state.Movie);
    const fullfilled = useSelector((state) => state.Movie.fullfilled);
    const favrts = useSelector((state) => state.Movie.favourites);

    let cart = useSelector((state) => state.Movie.favourites);
    console.log(favrts, "favrts hu");
    const movies = movie.movie;
    const dispatch = useDispatch();
    const dispatchitems = (item)=>{
        dispatch(fetchsingleitem({item}));
        dispatch(fetchcredits({item}));
        dispatch(fetchtrailer({item}));
    }
    return (
        <div className='container'>
            <span style={{ color: "red" }}>Movies</span>
            <div className='movie-wrapper'>
                {fullfilled ? (
                    movies.map((item, index) => (
                        
                            <div className='card' key={index}>

                                {(cart.some((e) => e.item.id === item.id)) ?
                                    (<div className='heart' ><i className="ri-heart-fill" onClick={() => dispatch(remove_from_favourites({ item }))}></i></div>) :
                                    (<div className='heart' ><i className="ri-heart-line" onClick={() => dispatch(add_to_favourites({item}))}></i></div>)

                                }
                        <Link to="/singleitem" onClick={()=>dispatchitems(item)}>
                                <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt='#'></img>
                                <div className='name'>{item.title}</div></Link>
                            </div>
                            
                    ))) : (<div>loading data</div>)
                }
            </div >

        </div >
    )
}
