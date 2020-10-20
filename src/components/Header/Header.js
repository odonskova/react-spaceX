import React from 'react';
import {Link, NavLink} from "react-router-dom";

import './Header.css'
import logo from "../../logo.svg";

const Header = props => (
    <>
        <header className="header">
            <Link to="/">
                <img
                    src={logo}
                    alt="Logo Space X"
                    className="logo"
                />
            </Link>
            <nav className="main-nav nav">
                <ul className="list">
                    {props.rockets.map((rocket, index) => (
                        <li className="item" key={index}>
                            <Link to={`/rocket/${rocket.replace(' ', '_')}`}
                                  onClick={() => props.changeRocket(rocket)}
                                  className="item-link">{rocket}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <nav className="secondary-nav">
                <ul className="list">
                    <li className="item">
                        <NavLink exact to="/"
                                 className="item-link"
                                 activeClassName="active"
                        >Home</NavLink>
                    </li>
                    <li className="item">
                        <NavLink to="/calendar"
                                 activeClassName="active" className="item-link">Calendar</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    </>
)

export default Header;
