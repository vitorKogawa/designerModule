import React from 'react'
import './style.css'
import { FaChurch } from 'react-icons/fa'
import { GiBroadsword, GiVitruvianMan } from 'react-icons/gi'
import { AiFillHourglass } from 'react-icons/ai'


const CardGame: React.FC = () => {
    return(
        <div className="card-game-wrapper">
            <div className="card-game-header">
                <div className="card-game-header-attribute">
                    <FaChurch/>
                </div>
                <div className="card-game-header-attribute">
                    <GiBroadsword/>
                </div>
                <div className="card-game-header-attribute">
                    <GiVitruvianMan/>
                </div>
                <div className="card-game-header-attribute">
                    <AiFillHourglass/>
                </div>
            </div>
            <div className="card-game-body">
                <div className="card-game-body-description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et provident assumenda at ea facere commodi earum, corporis placeat consectetur laborum tempora aliquam impedit dolores, officiis quod vitae cumque temporibus asperiores.</p>
                </div>

                <div className="card-game-body-img"></div>
            </div>
            <div className="card-game-footer">

            </div>
        </div>
    )
}

const PlayScreen: React.FC = () => {
    return (
        <div className="container-page">
            <CardGame/>
        </div>
    )
}

export { PlayScreen }