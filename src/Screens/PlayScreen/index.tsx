import React from 'react'
import './style.css'
import { FaChurch } from 'react-icons/fa'
import { GiBroadsword, GiVitruvianMan } from 'react-icons/gi'
import { AiFillHourglass } from 'react-icons/ai'
import { Sidebar } from '../components/Sidebar/Sidebar'


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
        <div className="container-fluid bg-primary min-vh-100">
            <div className="row">
                <div className="col bg-surface min-vh-100">
                    <Sidebar />
                </div>

                <div className="col-8 d-flex flex-row flex-wrap justify-content-center align-items-center p-0">
                    <h1>Em desenvolvimento...</h1>
                </div>

                <div className="col bg-primary sticky-top min-vh-100 p-1">

                </div>
            </div>
        </div>
    )
}

export { PlayScreen }