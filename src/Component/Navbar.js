import React from 'react'
import "../Css/Navbar.css";
import{Link} from "react-router-dom";

export default function Navbar() {
    return (
        
        <div className='navbar'>
            <span className='logo'>
                Movieshub
            </span>
            <div className='nav-link'>
                <span> <Link className='links' to="/favourites"> Favourites </Link></span>
                <span><Link className='links'>Watch later</Link></span>
                <span className='hamburger'><i className="fa-solid fa-bars" style={{color: '#ffffff'}}></i></span>
            </div>
        </div>
        
    )
}
