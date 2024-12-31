import React from 'react';
import './style.css';
import Header from '../Header';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const path = location.pathname;

    const isAuthenticated = localStorage.getItem("authToken") !== null;

    return (
        <div className="topnav">
            <Link
                to="/"
                className={path === '/' ? 'active' : ''}
            >
                <i className="fa fa-fw fa-home"></i> Home
            </Link>
            <Link
                to="/scholars"
                className={path === '/scholars' ? 'active' : ''}
            >
                <i className="fa fa-fw fa-user"></i> Scholars
            </Link>
            <Link
                to="/lectures"
                className={path === '/lectures' ? 'active' : ''}
            >
                <i className="fa fa-fw fa-play"></i> Lectures
            </Link>

            {!isAuthenticated ? (
                <>
                    <Link to="/Sign_Up" id="enter">Sign Up</Link>
                    <Link to="/Sign_In" id="in">Sign In</Link>
                </>
            ) : (
                <Header />
            )}
        </div>
    );
}

export default Navbar;