import React from 'react'
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="nav-extended indigo darken-1">
            <div className="nav-wrapper">
                <div className="brand-logo center">Drag and Drop Games</div>
            </div>
            <div className="nav-content">
                <ul className="tabs tabs-transparent">
                    <li className="tab"><NavLink to="/">Home</NavLink></li>
                    {/*<li className="tab"><NavLink to="/hanoi">Towers Of Hanoi</NavLink></li>*/}
                    <li className="tab"><NavLink to="/farmer">Farmer Game</NavLink></li>
                    <li className="tab"><NavLink to="/picture">Sliding Picture Game</NavLink></li>
                </ul>
            </div>
        </nav>
    )
};

export default NavBar;
