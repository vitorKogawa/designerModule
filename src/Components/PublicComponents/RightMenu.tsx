import './ComponentsStyle/RightMenuStyle.css';
import { fireApp } from '../../Screens/SignInScreen';
import React, { useState } from 'react';
import CreateGame from './CreateGame';

export const RightMenu = () => {
    const [openModal, setOpenModal] = useState(false);

    const OnNewGameClick = () => {
        setOpenModal(true)
    }

    const onRequestClose = () => {
        setOpenModal(false)
    }

    return(
        <div className="container">
            <img className="logo" alt="logo" src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png"/>
            <label className="buttonNewGame" onClick={() => OnNewGameClick()}><span className="plusIcon">+</span> New Game</label>
            <CreateGame 
                openModal={openModal} 
                closeModal={onRequestClose}
            />
            <label className="signOut" onClick={() => fireApp.auth().signOut()}>Sign out</label>
        </div>
    );
}