import React from 'react';
import "../Css/Singleitem.css";
import { useSelector} from 'react-redux';
import ReactPlayer from 'react-player/youtube'
export default function Singleitem() {
    let reqfullfilled = useSelector((state) => state.Item.reqfullfilled);
    console.log(reqfullfilled, "request hu");
    let item = useSelector((state) => state.Item.item)
    console.log(item, "item aaunga");
    let credit = useSelector((state) => state.Item.credits);
    console.log(credit, "credits hun m idhrr");
    let trailer = useSelector((state) => state.Item.trailer);
    
    if(reqfullfilled){
        console.log(trailer, "trailer array");
        trailer = trailer[0].results.filter((element)=>
            element.type==="Trailer"
        )
        console.log(trailer[0].key,"specific hun");
    }
    function convert_time(time) {
        console.log(time);
        const hrs = Math.trunc(Number(time) / 60);
        const minutes = time % 60;
        const Time = `${hrs}h ${minutes}m`;
        return Time;
    }
    function getyear(year) {
        console.log(year);
        const Year = year.split("-");
        return Year[0];
    }
    function getoverview(overview) {
        console.log(overview);
        const Overview = overview.split(".");
        return Overview[0];
    }

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
                                    <span> Staring </span>: {credit[0].cast[0].name},{credit[0].cast[1].name},{credit[0].cast[2].name}
                                </div>
                            </div>
                            <div className='backimg'>
                                <img className='backdropimg' src={`https://image.tmdb.org/t/p/original/${element.backdrop_path}`} alt="#"></img>
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
                                    <span> Staring </span>: {credit[0].cast[0].name},{credit[0].cast[1].name},{credit[0].cast[2].name}
                                </div>
                            </div>

                        </div>
                       
                        <div className='videoplayer-container'>
                            <span className='videoplayer-text'>
                                Videos | <span className='video-name'>{element.original_title}</span>

                            </span>

                            <div className='videoplayer'>
                                <ReactPlayer className="video"  url={`https://www.youtube.com/watch?v=${trailer[0].key}`} width="100%" height="100%" />
                            </div>


                        </div>

                    </div>
                ))) : ""

            }
        </>
    )
}