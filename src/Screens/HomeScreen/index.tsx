import React from 'react'
import { Sidebar } from './../components/Sidebar/Sidebar'
import { GameCard } from './../components/GameCard/GameCard'
import { IGameCard } from '../components/GameCard/interfaces/IGameCard'
import { NewReleaseBar } from '../components/NewReleaseBar/NewReleaseBar'
import { AddNewGameModal } from './components/AddNewGameModal/AddNewGameModal'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './styles.scss'
import { IGame } from './interfaces/IGame'

const HomeScreen: React.FC = () => {
    const arrayGameCards = [
        {
            imgUrl: 'https://source.unsplash.com/random',
            title: 'Card title',
            content: 'Some quick example text to build on the card title and make up the bulk of the cards content.'
        },
        {
            imgUrl: 'https://source.unsplash.com/random',
            title: 'Card title',
            content: 'Some quick example text to build on the card title and make up the bulk of the cards content.'
        },
        {
            imgUrl: 'https://source.unsplash.com/random',
            title: 'Card title',
            content: 'Some quick example text to build on the card title and make up the bulk of the cards content.'
        },
        {
            imgUrl: 'https://source.unsplash.com/random',
            title: 'Card title',
            content: 'Some quick example text to build on the card title and make up the bulk of the cards content.'
        },
        {
            imgUrl: 'https://source.unsplash.com/random',
            title: 'Card title',
            content: 'Some quick example text to build on the card title and make up the bulk of the cards content.'
        },
        {
            imgUrl: 'https://source.unsplash.com/random',
            title: 'Card title',
            content: 'Some quick example text to build on the card title and make up the bulk of the cards content.'
        },
        {
            imgUrl: 'https://source.unsplash.com/random',
            title: 'Card title',
            content: 'Some quick example text to build on the card title and make up the bulk of the cards content.'
        },
        {
            imgUrl: 'https://source.unsplash.com/random',
            title: 'Card title',
            content: 'Some quick example text to build on the card title and make up the bulk of the cards content.'
        },
        {
            imgUrl: 'https://source.unsplash.com/random',
            title: 'Card title',
            content: 'Some quick example text to build on the card title and make up the bulk of the cards content.'
        },
        {
            imgUrl: 'https://source.unsplash.com/random',
            title: 'Card title',
            content: 'Some quick example text to build on the card title and make up the bulk of the cards content.'
        }
    ]

    return (
        <div className="container-fluid bg-surface min-vh-100">
            <div className="row">
                <div className="col bg-surface min-vh-100">
                    <Sidebar/>
                </div>

                <div className="col-7 d-flex flex-column">
                    <div className="row flex-row justify-align-content-between w-100">
                        <div className="col d-flex flex-row justify-content-start p-0">
                            <h3>Your Games</h3>
                        </div>
                        <div className="col d-flex flex-row justify-content-end p-0">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#gameCardModal">
                                Add Game
                            </button>
                            <AddNewGameModal />
                        </div>
                    </div>
                    <div className="row flex-row flex-wrap w-100">
                        {
                            // arrayGameCards.map((game: IGame, index: number) => {
                            //     return (
                            //         <GameCard
                            //             gameID={index}
                            //             title={game.title}

                            //         />
                            //     )
                            // })
                        }
                    </div>
                </div>

                <div className="col-3 bg-surface sticky-top min-vh-100 p-1">
                    <NewReleaseBar />
                </div>
            </div>
        </div>
    );
}

export { HomeScreen };