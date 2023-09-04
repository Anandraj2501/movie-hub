import React from 'react'
import "../Css/Favourites.css";
import { remove_from_favourites } from '../Allslice/movieslice';
import {
    Link

} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
export default function Favourites() {
    const handleclick = (item) => {

        dispatch(remove_from_favourites({ item }));
    }
    const dispatch = useDispatch();
    let cart = useSelector((state) => state.Movie.favourites);
    if (cart.length > 0) {
        console.log(cart[0].item.title, "cart hun");
    }
   
    return (
        <div className='fvrt-container'>
            <span style={{ color: "white", fontSize: "24px" }}>Favourites</span>
            <div className='fvrts-movie-wrapper'>
                {(cart.length > 0) ? (
                    cart.map((item, index) => (
                        <div className='fvrts-card' key={index}>
                            <div className='card-info'>
                                <div className='fvrts-heart' ><i class="ri-heart-fill" onClick={() => handleclick(item.item)}></i></div>
                                <Link to={`/singleitem/${item.item.id}`}>

                                    <img src={`https://image.tmdb.org/t/p/w200${item.item.poster_path}`} alt='#'></img></Link>
                                    <div className='fvrts-name'>{item.item.title}</div>
                                
                            </div>
                        </div>
                    ))) : (<div style={{ color: "white" }}>Add your favourite movie,webseries....</div>)
                }
            </div>
        </div>
    )
}
