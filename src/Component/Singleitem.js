import React, { useEffect, useState } from 'react';
import "../Css/Singleitem.css";
import { useSelector, useDispatch } from 'react-redux';
import { FaStar } from "react-icons/fa6";
import ReactPlayer from 'react-player/youtube';
import { fetchsimilar } from '../Allslice/singleitemslice';
import { fetchsingleitem } from '../Allslice/singleitemslice';
import { fetchcredits, fetchtrailer } from "../Allslice/singleitemslice";
import {
    Link, useParams
} from "react-router-dom";

export default function Singleitem() {
    const dispatch = useDispatch();

    const { id } = useParams();
    const [review, setReview] = useState();
    const [watchprovider, setWatchProvider] = useState();
    
    // console.log(id); 

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });



    useEffect(() => {
        dispatch(fetchsingleitem({ id }));
        dispatch(fetchcredits({ id }));
        dispatch(fetchtrailer({ id }));
        dispatch(fetchsimilar({ id }));



    }, [dispatch, id])

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=2d921565951a5d52a62408d8908bc5ab`);
                const result = await response.json();


                //   console.log(result,"review");
                if(result?.results){
                    setReview(result);
                console.log(review, "result");
                }
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        

        // Invoke the asynchronous function
        fetchData();
        
    }, [id])

    useEffect(()=>{
        const fetchwatchprovider = async ()=>{
            try{

                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=2d921565951a5d52a62408d8908bc5ab`);
                const result = await response.json();


                  console.log(result,"watchprovider");
                if(result?.results){
                    setWatchProvider(result.results);
                console.log(watchprovider, "watchproviders");
                }
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        }

        fetchwatchprovider();
    },[id])

    let reqfullfilled = useSelector((state) => state.Item.reqfullfilled);
    let item = useSelector((state) => state.Item.item)
    console.log(item, "items");

    let trailer = useSelector((state) => state.Item.trailer);
    console.log(trailer, "trailer");
    let trailer_length = false;


    if (reqfullfilled) {
        if (trailer[0].results.length > 0) {
            trailer = trailer[0].results.filter((element) =>
                element.type === "Trailer"
            )
            trailer_length = true;
        }
    }

    // useEffect(() => {
    //     dispatch(fetchsimilar({ item }))
    // }, [dispatch, item])


    const similarreq = useSelector((state) => state.Item.similarreq);
    let similar = useSelector((state) => state.Item.similaritems);
    console.log(similar, "similar");
    if (similarreq) {
        similar = similar[0].results;
        similar = similar.slice(0, 12);
    }

    function convert_time(time) {
        const hrs = Math.trunc(Number(time) / 60);
        const minutes = time % 60;
        const Time = `${hrs}h ${minutes}m`;
        return Time;
    }
    function getyear(year) {
        const Year = year.split("-");
        return Year[0];
    }
    function getoverview(overview) {
        let Overview = overview.split(".");
        Overview = Overview[0] + Overview[1];
        return Overview;
    }


    // const scrollup = () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth',
    //     });

    // }
    let credit = useSelector((state) => state.Item.credits);
    console.log(credit, "credits");
    return (
        <>
            {(reqfullfilled) ?
                (item.map((element) => (

                    <div className='item-main'>

                        <div className='backdrop-and-info'>
                            <div className='info'>
                                <div className='movie-name'>{element.original_title}</div>
                                <div className='movie-info'>
                                    <span>{getyear(element.release_date)}</span>
                                    <span>|</span>
                                    <span>{convert_time(element.runtime)}</span>
                                    <span>|</span>
                                    <span>{element.genres[0].name}</span>
                                </div>
                                <div className='overview'>
                                    {getoverview(element.overview)}.
                                </div>
                                <div className='stars'>
                                    <span> Staring </span>: {credit[0]?.cast[0]?.name}{" , " + credit[0]?.cast[1]?.name}{" , " + credit[0]?.cast[2]?.name}
                                </div>
                                {/* <div className='watch-providers'>
                                    <span>Watch Providers</span> : {watchprovider?.AG?.flatrate[0]?.provider_name}{" , " + watchprovider?.BH?.flatrate[0]?.provider_name}{" , " + watchprovider?.AU?.flatrate[0]?.provider_name}
                                </div> */}
                            </div>
                            <div className='backimg'>
                                {(element.backdrop_path !== null) ? (<img className='backdropimg' src={`https://image.tmdb.org/t/p/original/${element.backdrop_path}`} alt="#"></img>) : (<img className='backdropimg' src="https://res.cloudinary.com/dxdboxbyb/image/upload/v1620052094/ayi6tvyiedrlmjiim6yn.png" alt="#"></img>)}

                            </div>
                            <div className='info-phone'>
                                <div className='movie-name'>{element.original_title}</div>
                                <div className='movie-info'>
                                    <span>{getyear(element.release_date)}</span>
                                    <span>|</span>
                                    <span>{convert_time(element.runtime)}</span>
                                    <span>|</span>
                                    <span>{element.genres[0].name}</span>
                                </div>
                                <div className='overview'>
                                    {getoverview(element.overview)}.
                                </div>
                                <div className='stars'>
                                    <span> Staring </span>: {credit[0]?.cast[0]?.name} , {credit[0]?.cast[1]?.name} , {credit[0]?.cast[2]?.name}
                                </div>
                                {/* <div className='watch-providers'>
                                    <span>Watch Providers</span> : {watchprovider?.AR?.buy[0]?.provider_name}{" , " + watchprovider?.AR?.buy[1]?.provider_name}
                                </div> */}
                            </div>

                        </div>

                        <div className='videoplayer-container'>
                            <span className='videoplayer-text'>
                                Videos | <span className='video-name'>{element.original_title}</span>

                            </span>

                            {(trailer_length) ? (
                                <div className='videoplayer'>
                                    <ReactPlayer className="video" url={`https://www.youtube.com/watch?v=${trailer[0]?.key}`} width="100%" height="100%" />
                                </div>) : (<div style={{ color: "white" }}>sorry unable to fetch trailer......</div>)
                            }


                        </div>


                        {
                            (similarreq) ? (
                                <div className='moresuggestion-container' key={element.id}>
                                    <div style={{ color: "white", fontSize: "24px" }}>More Like This</div>
                                    <div className='more-movies'>

                                        {similar.map((element) => (
                                            <Link to={`/singleitem/${element.id}`} >
                                                <div className='more-items'>
                                                    <img src={`https://image.tmdb.org/t/p/original/${element.poster_path}`} alt="not available"></img>
                                                </div>
                                            </Link>
                                        ))
                                        }

                                    </div>
                                </div>) : (<div>loading</div>)
                        }

                        {(review && review.results && review.results.length > 0)?(
                            <div className='review-container'>
                            
                            {
                                review?.results.slice(0,5).map((item) => (
                                    <div className='review-box'>
                                        <div className='user-container'>
                                            <h3 className='user-name'>A review by <b>{item.author}</b></h3>
                                            <div className='review-info'>
                                                {
                                                    (item.author_details.rating) ? (<span className='rating-count'><FaStar/> {item.author_details.rating}</span>):(<span>Ratings not given</span>)
                                                }
                                                
                                                <h5 >Written by {item.author_details.username}</h5>
                                            </div>
                                        </div>
                                        <div className='review'>
                                            <p>{item.content}</p>
                                        </div>
                                        
                                    </div>
                                    
                                ))

                            }
                        </div>):(<div className='review-container'><h2>No review available</h2></div>)}

                    </div>
                ))) : ""

            }
        </>
    )
}