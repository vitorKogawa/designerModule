import React from 'react'
import { IGameCard } from './interfaces/IGameCard'
import { BsPen, BsPlay } from 'react-icons/bs'
import './styles/styles.scss'
import { Link } from 'react-router-dom'

const GameCard: React.FC<IGameCard> = (props) => {
    return (
        <div className="col-3 card m-2 p-0">
            <img src={props.imgUrl} className="card-img-top" alt={props.imgUrl} />
            <div className="card-body p-0">
                <h5 className="card-title m-0">{props.title}</h5>
                <p className="card-text">{props.content ? props.content : ""}</p>
                <div className="row">
                    <div className="col">
                        <Link to="#" className ="btn btn-primary w-100 rounded-0">
                            <BsPen/>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="#" className ="btn btn-primary w-100 rounded-0">
                            <BsPlay/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { GameCard }