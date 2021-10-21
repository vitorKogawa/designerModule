import { useState } from 'react';
import { api_url } from '../../public/variables';
import PublicModal from '../EditorComponents/PublicModal';
import './ComponentsStyle/CardGameStyle.css';
import { RightMenu } from './RightMenu';

export const CardGame = (props: any) => {

    const [openModal, setOpenModal] = useState(false);

    const onRequestClose = () => {
        setOpenModal(false);
    }

    const open = () => {
        setOpenModal(true);
    }

    const deleteGame = async () => {
        const nodeResult = await fetch(api_url+'game/delete/'+props.idGame, {
            method: 'DELETE',
            headers: {
              "Access-Control-Allow-Origin" : "*", 
              'Content-Type': 'application/json'
            }
          });
          window.location.reload();
          return nodeResult;
    }

    return(
        <div>
            <div className="CardContainer">
                <div className="ImgContainer" onClick={props.onCardClick}>
                    <img className="ImgStyle" alt="imagem" src={props.src} />
                </div>
                <div className="CardDescription" onClick={props.onCardClick}>
                    <h2>{props.title}</h2>
                    <p>{props.description}</p>
                </div>
                <p onClick={open} className="gameDel">Excluir</p>
            </div>
            <PublicModal openModal={openModal} closeModal={onRequestClose}>
                <p>Deseja excluir este jogo?</p>
                <div className="optionsDelete">
                    <label onClick={deleteGame}>Sim</label> <label onClick={onRequestClose}>Não</label>
                </div>
            </PublicModal>
        </div>
    );
}