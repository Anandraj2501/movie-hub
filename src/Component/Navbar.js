import React, { useState } from 'react'
import "../Css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { add_id } from '../Allslice/movieslice';
import { useDispatch } from 'react-redux';

export default function Navbar() {
    const [toggle, setToggle] = useState("search-container-none");
    let name;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handletoggle = () => {
        if (toggle === "search-container-none") {
            setToggle("search-container");
            document.body.style.overflow = "hidden";
            const element = document.getElementById("searchelement");
            console.log(element);
            element.addEventListener("keydown", function (e) {
                if (e.code === "Enter") {
                    let path = "/search"
                    navigate(path)
                    setToggle("search-container-none");
                }
            })
        }
        else {
            setToggle("search-container-none");
            document.body.style.overflow = "auto";
        }

    }

    const handlechange = (e) => {
        name = e.target.value;
        dispatch(add_id({ name }));
    }

    const handleclick = () => {
        setToggle("search-container-none");
        document.body.style.overflow = "auto";
        let path = "/search"
        navigate(path)
    }
    return (
        <>
            <div className='navbar'>
                <Link className='links' to="/">
                    <span className='logo'>
                        Movieshub
                    </span>
                </Link>
                <div className='nav-link'>
                    <span> <Link className='links' to="/favourites"> Favourites </Link></span>
                    <i className="ri-search-line search" onClick={handletoggle}></i>
                    <span className='hamburger'><i className="fa-solid fa-bars" style={{ color: '#ffffff' }}></i></span>
                </div>
            </div>
            <div className={toggle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input type="text" placeholder="" className='search-box' id="searchelement" onChange={handlechange} style={{ padding: "3px", color: "#a3a3a3", fontSize: "15px" }} />

                    <i className="ri-search-line search" style={{ color: "red" }} onClick={handleclick}></i>
                </div>
            </div>
        </>
    )
}
