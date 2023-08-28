import React, { useEffect } from 'react';
import "../Css/Main.css";
import Singlecard from './Singlecard';
import {useDispatch} from "react-redux";
import { fetchmovies } from '../Allslice/movieslice';
export default function Main() {

    const dispatch = useDispatch();
     useEffect(()=>{
        dispatch(fetchmovies())
     },[dispatch])

    return (
        <div className='main'>
            <Singlecard/>
            <Singlecard/>
            
        </div>
    )
}
