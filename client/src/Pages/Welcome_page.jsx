import React, { useState } from 'react'
import "../Pages/Welcome_page.css";
import {Link,Outlet} from "react-router-dom"
import logo from "../assets/Logo.png";
function Welcome_page({onLogout}) {
    const username = localStorage.getItem("username");

    const handleLogout = ()=>{
        localStorage.removeItem('username');
        onLogout();
        navigate('/login');
      }
  return (
    <>
        <div className="row-12 ">
    <nav className='navbar navbar-expand-lg bg-dark fixed-top custom-nav-bg' >
        <div className="container-fluid">
            <div className="d-flex align-items-center">
                <img className="navbar-brand logo text-white ms-5" src={logo} alt="Logo" />
                <div className="ms-auto"></div>
            </div>
            <div className="d-flex justify-content-center w-100 ms-5  ">
                <ul class="navbar-nav d-flex flex-row justify-content-evenly w-50  ">
                    <li class="nav-item">
                    <Link className="nav-link active text-white" to="/create">Create Employee</Link>
                    </li>
                    <li class="nav-item">
                       <Link class="nav-link active text-white" to="list" >Employee List</Link>
                    </li>
                    <li class="nav-item Admin-name">
                        <a class="nav-link active text-white" href="#">{username}</a>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                    <Link class="nav-link active text-white" onClick={handleLogout}>Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
        <div className="container-fluid  mt-5 p-4 py-2 text-white custom-color">         
                 {<Outlet/>}
        </div>
</div>



    </>
  )
}

export default Welcome_page