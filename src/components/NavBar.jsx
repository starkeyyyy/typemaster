import React from 'react'
import { ReactComponent as Gear } from './svg/gear-solid.svg';
import { ReactComponent as Keyboard } from './svg/keyboard-solid.svg';
import { ReactComponent as I } from './svg/info-solid.svg'
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1 className='navbar'>TypeMaster   <button className='nav-buttons' onClick={() => navigate('/')}><Keyboard/></button>  <button className='nav-buttons' onClick={() => navigate('/settings')}><Gear/></button>     <button className='nav-buttons' ><I/></button>
            </h1>
        </div>
    )
}

export default NavBar
