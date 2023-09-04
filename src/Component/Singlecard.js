import React, { useEffect, useState } from 'react'
import "../Css/Singlecard.css"
import 'remixicon/fonts/remixicon.css'
import { useDispatch, useSelector } from 'react-redux';
import { add_to_favourites, remove_from_favourites, add_movies } from '../Allslice/movieslice';
import {
    Link

} from "react-router-dom";
export default function Singlecard({ title, fetchurl }) {

    // const fullfilled = useSelector((state) => state.Movie.fullfilled);

    let cart = useSelector((state) => state.Movie.favourites);
    // const movies = movie.movie;
    const dispatch = useDispatch();
   

    const [movies, setMovie] = useState([]);
    useEffect(() => {
        async function fetchdata() {
            let response = await fetch(`https://api.themoviedb.org/3/${fetchurl}`)
                .then(response => response.json())
                .then(response => response.results);
            setMovie(response);
            dispatch(add_movies({ response }));
            return response;
        }
        fetchdata();
    }, [fetchurl,dispatch])

    return (
        <div className='container'>
            <span style={{ color: "white" }}>{title}</span>
            <div className='movie-wrapper'>


                {
                    movies.map((item, index) => (

                        <div className='card' key={index}>
                            {(cart.some((e) => e.item.id === item.id)) ?
                                (<div className='heart' ><i className="ri-heart-fill" onClick={()=>dispatch(remove_from_favourites({item}))}></i></div>) :
                                (<div className='heart' ><i className="ri-heart-line" onClick={()=>dispatch(add_to_favourites({item}))}></i></div>)

                            }
                            <Link to={`/singleitem/${item.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt='#'></img></Link>
                                <div className='name'>{item.title}</div>
                            
                        </div>)

                    )
                }

            </div >

        </div >
    )
}