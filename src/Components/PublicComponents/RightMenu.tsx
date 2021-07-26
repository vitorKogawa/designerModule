import './ComponentsStyle/RightMenuStyle.css';
import { fireApp } from '../../Screens/SignInScreen';
import React, { useState, useEffect } from 'react';
import CreateGame from './CreateGame';
import { useHistory } from "react-router-dom";
import { api_url } from '../../public/variables';
import firebase from 'firebase/app';
import "firebase/auth";

export const RightMenu = () => {
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);
    const [isTemplate, setIsTemplate] = useState(false);
    const [gameTitle, setGameTitle] = useState('');
    const [gameDescription, setGameDescription] = useState('');
    const [nodeColor, setNodeColor] = useState('');
    const [textColor, setTextColor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [backgroundImage, setBackgroundImage] = useState(null as any | null);
    const [gameCreatedId, setGameCreatedId] = useState(null as any | null);

    const OnNewGameClick = () => {
        setOpenModal(true)
    }

    const onRequestClose = () => {
        setOpenModal(false)
    }

    const onChangeIsTemplate = () => {
        setIsTemplate(!isTemplate);
    }

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGameTitle(event.target.value);
    }

    const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGameDescription(event.target.value);
    }

    const onChangeNodeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNodeColor(event.target.value);
    }

    const onChangeTextColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextColor(event.target.value);
    }

    const onChangeBackgroundColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBackgroundColor(event.target.value);
    }   

    const onChangeBackgroundImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBackgroundImage(event.target.files ? event.target.files[0] : event.target.files)
    } 

    useEffect(() => {
        if(gameCreatedId !== null){
            history.push({
                pathname: '/editor',
                search: '?game='+gameCreatedId,
                state: {
                  gameId: gameCreatedId
                }
              })
        }
        // eslint-disable-next-line
      }, [gameCreatedId]);

    const saveGame = async () => {
        const uid = firebase.auth();
        const data = new FormData();
        data.append("title", gameTitle);
        data.append("description", gameDescription);
        data.append("default_node_color", nodeColor);
        data.append("default_text_color", textColor);
        data.append("template", isTemplate ? 'true' : 'false');
        data.append("background_color", backgroundColor);
        data.append("background_image", backgroundImage);
        if(uid.currentUser)
            data.append("userID", uid.currentUser.uid);
        await fetch(api_url+'game/create', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin" : "*", 
            },
            body: data
        }).then(result => result.json())
        .then(res => setGameCreatedId(res.game._id))
        .catch(error => {
            console.log(error)
        });
    }

    return(
        <div className="container">
            <img className="logo" alt="logo" src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png"/>
            <label className="buttonNewGame" onClick={() => OnNewGameClick()}><span className="plusIcon">+</span> New Game</label>
            <CreateGame 
                openModal={openModal} 
                closeModal={onRequestClose}
                onChangeIsTemplate={onChangeIsTemplate}
                isTemplate={isTemplate}
                onChangeTitle={onChangeTitle}
                onChangeDescription={onChangeDescription}
                onChangeNodeColor={onChangeNodeColor}
                onChangeTextColor={onChangeTextColor}
                onChangeBackgroundColor={onChangeBackgroundColor}
                onChangeBackgroundImage={onChangeBackgroundImage}
                saveGame={saveGame}
                gameId={gameCreatedId}
            />
            <label className="signOut" onClick={() => fireApp.auth().signOut()}>Sign out</label>
        </div>
    );
}