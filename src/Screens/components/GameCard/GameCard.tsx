import React from 'react'
import { IGameCard } from './interfaces/IGameCard'
import { BsPen, BsPlay } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
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
        <div className="col-3 card m-2 p-0">
            <img src={props.imgUrl} className="card-img-top" alt={props.imgUrl} />
            <div className="card-body p-0">
                <h5 className="card-title m-0">{props.title}</h5>
                <p className="card-text">{props.content ? props.content : ""}</p>
                <div className="row">
                    <div className="col">
                        <button onClick={() => handleClickCard(props.gameID)} className="btn btn-primary w-100 rounded-0">
                            <BsPen />
                        </button>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary w-100 rounded-0">
                            <BsPlay />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { GameCard }