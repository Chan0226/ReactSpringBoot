import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu(props) {
    return (
        <div>
            <ul className='menu'>
                <li><NavLink to={"/"}>Home</NavLink></li>
                <li><NavLink to={"/photo/list/1"}>Photo</NavLink></li>
                <li><NavLink to={"/photo/list/2"}>Photo2</NavLink></li>
                <li><NavLink to={"/food/list/1"}>Food1</NavLink></li>
                <li><NavLink to={"/food/list/2"}>Food2</NavLink></li>
                {/* <li><NavLink to={"/food/1/11"}>Food2</NavLink></li> */}
                <li><NavLink to={"/about"}>About</NavLink></li>
                <li><NavLink to={"/about/CGV"}>About#2</NavLink></li>
                <li><NavLink to={"/about/삼성전자"}>About#3</NavLink></li>
            </ul>
        </div>
    );
}

export default Menu;