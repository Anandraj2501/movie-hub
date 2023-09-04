import React from 'react';
import "../Css/Main.css";
import Singlecard from './Singlecard';
import api from "../apis/api";
export default function Main() {


    return (
        <div className='main'>
            <Singlecard title={"Movie"} fetchurl={api.movie}/>
            <Singlecard title={"Top rated Movie"} fetchurl={api.toprated}/>
            <Singlecard title={"Movies Now Playing"} fetchurl={api.nowplaying}/>
        </div>
    )
}
