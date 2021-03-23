import React from 'react';
import { Link } from 'react-router-dom';
import './EditorComponentsStyles/TopMenuStyle.css'

export default function TopMenu(){
    return(
        <div className="top-menu-container">
            <div className="menu-options">
                <p>Estatísticas</p>
            </div>
            <div className="menu-options">
                <p>Atributos</p>
            </div>
            <div className="menu-options">
                <p>Tags</p>
            </div>
            <div className="back-container">
                <Link to="/dashboard" className="back-button">Voltar</Link>
                <Link to="/dashboard" className="back-button">Sair</Link>
            </div>
            <div className="img-container">
                <img className="top-logo" alt="logo" src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png"/>
            </div>
        </div>
    );
}