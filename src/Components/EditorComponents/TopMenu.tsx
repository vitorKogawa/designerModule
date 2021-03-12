import React from 'react';
import { Link } from 'react-router-dom';
import './EditorComponentsStyles/TopMenuStyle.css'

export default function TopMenu(){
    return(
        <div className="top-menu-container">
            <div className="img-container">
                <img className="top-logo" alt="logo" src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png"/>
            </div>
            <Link to="/dashboard" className="back-button">Sair</Link>
        </div>
    );
}