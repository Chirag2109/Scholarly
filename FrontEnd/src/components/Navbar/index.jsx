import React from 'react';
import './style.css';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <div className="topnav">
            <Link
                to="/"
                className={path === '/' ? 'active' : ''}
            >
                <i className="fa fa-fw fa-home"></i> Home
            </Link>
            <Link
                to="/news"
                className={path === '/news' ? 'active' : ''}
            >
                <i className="fa fa-fw fa-newspaper-o"></i> News
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
            <Link
                to="/articles"
                className={path === '/articles' ? 'active' : ''}
            >
                <i className="fa fa-fw fa-paragraph"></i> Articles
            </Link>
            <Link to="/Sign_Up" id="enter">Sign Up</Link>
            <Link to="/Sign_In" id="in">Sign in</Link>
        </div>
    );
}

export default Navbar;