import './RightMenuStyle.css';
import { fireApp } from '../Screens/SignInScreen';
import React from 'react';
import { Link } from 'react-router-dom';

export const RightMenu = () => {
    return(
        <div className="container">
            <img className="logo" alt="logo" src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png"/>
            <Link to="/editor" className="buttonNewGame"><span className="plusIcon">+</span> New Game</Link>
            <label className="signOut" onClick={() => fireApp.auth().signOut()}>Sign out</label>
        </div>
    );
}