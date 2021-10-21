import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicModal from './PublicModal';
import { useHistory } from "react-router-dom";
import './EditorComponentsStyles/TopMenuStyle.css'
import firebase from 'firebase/app';
import "firebase/auth";
import { fireApp } from '../../Screens/SignInScreen';

export default function TopMenu(props: any){
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);
    const onRequestClose = () => {
        setOpenModal(false);
    }

    const handleClick = () => {
        props.saveTags()
        onRequestClose();
    }
    
    const onClickPlay = () => {
        history.push({
            pathname: '/play',
            state: {
                gameID: props.gameID,
                elements: JSON.stringify(props.elem)
            }
          })
    }

    return(
        <div className="top-menu-container">
            <div className="menu-options">
                <p>Estatísticas</p>
            </div>
            <div className="menu-options">
                <p>Atributos</p>
            </div>
            <div className="menu-options" onClick={() => {setOpenModal(true)}}>
                <p>Tags</p>
            </div>
            <div className="menu-options" onClick={() => onClickPlay()}>
                <p>Jogar</p>
            </div>
            <div className="back-container">
                <Link to="/dashboard" className="back-button">Voltar</Link>
                <label className="back-button" onClick={() => fireApp.auth().signOut()}>Sign out</label>
            </div>
            <div className="img-container">
                <img className="top-logo" alt="logo" src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png"/>
            </div>
            <PublicModal openModal={openModal} closeModal={onRequestClose}>
                <div className="form_row">
                    <div className="form_group field">
                        <input className="form_field" name="tag" placeholder="Tag" type="text" onChange={props.onChangeTagName} />
                        <label className="form_label">Tag</label>
                    </div>
                    <div className="form_group field">
                        <input className="color_front" type="color" onChange={props.onChangeColor} />
                    </div>
                </div>
                <div className="form_buttons">
                    <span className="cancel" onClick={onRequestClose}>Cancelar</span> 
                    <span className="button_style" onClick={handleClick}>Salvar</span> 
                </div>
            </PublicModal>
        </div>
    );
}