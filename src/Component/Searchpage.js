import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    Link

} from "react-router-dom";
import { remove_from_favourites } from '../Allslice/movieslice';

import { add_to_favourites } from '../Allslice/movieslice';
import { useDispatch, useSelector } from 'react-redux';
import api from '../apis/api';

export default function Searchpage() {
    const [searchitems, setSearchItems] = useState([]);

    const dispatch = useDispatch()

    const name = useSelector((state)=>state.Movie.id);
    console.log(name,"aaya");

    const searchurl = api.search;


    useEffect(() => {
        document.body.style.overflow = "auto";
        async function searchdata(name) {
            let searchresponse = await fetch(`https://api.themoviedb.org/3/search/multi?query=${name}&include_adult=false&language=en-US&page=1&api_key=2d921565951a5d52a62408d8908bc5ab`)
                .then(searchresponse => searchresponse.json())
                .then(searchresponse => searchresponse.results);
            setSearchItems(searchresponse);
            return searchresponse;
        }

        searchdata(name);
    }, [name, searchurl])
    
    console.log(searchitems);
    let cart = useSelector((state) => state.Movie.favourites);

    return (
        <div className='fvrt-container'>
            <span style={{ color: "white", fontSize: "24px" }}>Search Results</span>
            <div className='fvrts-movie-wrapper'>
                {(searchitems.length > 0) ? (
                    searchitems.map((item, index) => (
                        <div className='fvrts-card' key={index}>
                            <div className='card-info'>
                                {(cart.some((e) => e.item.id === item.id)) ?
                                    (<div className='heart' ><i className="ri-heart-fill" onClick={() => dispatch(remove_from_favourites({ item }))}></i></div>) :
                                    (<div className='heart' ><i className="ri-heart-line" onClick={() => dispatch(add_to_favourites({ item }))}></i></div>)

                                }
                                <Link to={`/singleitem/${item.id}`}>
                                    {(item.poster_path!==null)?(<img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt='not found...:('></img>):(<div>Image Not Found</div>)}
                                        
                                </Link>
                                <div className='fvrts-name'>{item.original_title}</div>

                            </div>
                        </div>
                    ))) : (<div style={{ color: "white" }}>{name} not found....</div>)
                }
            </div>
        </div>
    )
}
