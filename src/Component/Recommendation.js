import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { add_to_favourites, remove_from_favourites, add_movies, add_to_recommendation } from '../Allslice/movieslice';
import {
    Link

} from "react-router-dom";

export default function Recommendation({ title }) {
    const recommendation_id = useSelector((state) => state.Movie.recommendation);
    let cart = useSelector((state) => state.Movie.favourites);
    const [movies, setMovies] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(recommendation_id, "in recomm");

        const fetchmovies = async () => {
            try {
                if (recommendation_id == "") {
                    const response = await fetch("https://api.themoviedb.org/3/movie/872585/recommendations?api_key=2d921565951a5d52a62408d8908bc5ab");
                    const result = await response.json();


                    console.log(result, "recommended");
                    if (result?.results) {
                        setMovies(result.results);
                        console.log(movies, "recommended_result");
                    }
                }

                else {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${recommendation_id}/recommendations?api_key=2d921565951a5d52a62408d8908bc5ab`);
                    const result = await response.json();


                    console.log(result, "recommended");
                    if (result?.results) {
                        setMovies(result.results);
                        console.log(movies, "recommended_result");
                    }
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchmovies();
    }, [recommendation_id]);

    return (
        <div className='container'>
            <span style={{ color: "white" }}>{title}</span>
            <div className='movie-wrapper'>


                {
                    movies?.map((item, index) => (

                        <div className='card' key={index}>
                            {(cart.some((e) => e.item.id === item.id)) ?
                                (<div className='heart' ><i className="ri-heart-fill" onClick={() => dispatch(remove_from_favourites({ item }))}></i></div>) :
                                (<div className='heart' ><i className="ri-heart-line" onClick={() => dispatch(add_to_favourites({ item }))}></i></div>)

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
