import React from 'react'
import { IGameCard } from './interfaces/IGameCard'
import { BsPen, BsPlay } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Background } from 'react-flow-renderer';
import './styles/styles.scss'

const GameCard: React.FC<IGameCard> = (props) => {
    const history = useHistory();

    const handleClickCard = (gameID: string) => {
        history.push({
            pathname: '/editor',
            search: '?game=' + gameID,
            state: {
                gameID: gameID
            }
        })
    }

    return (
        <div className="card m-2 p-0">
            <div className="img-wrapper">
                <img src={props.imgUrl} className="img-card-top" />
            </div>
            <div className="card-body p-0">
                <div className="card-text-content">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.content}</p>
                </div>
                <div className="card-footer">
                    <a href="#" className="btn btn-edit" onClick={() => handleClickCard(props.gameID)}>
                        <BsPen />
                    </a>
                    <a href="#" className="btn btn-play">
                        <BsPlay />
                    </a>
                </div>
            </div>
        </div>
    )
}

export { GameCard }