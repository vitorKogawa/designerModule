import React from 'react'
import { RightMenu } from '../../Components/PublicComponents/RightMenu';
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { api } from '../../services/api'
import { IGame } from './interfaces/IGame';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { AddNewGameModal } from './components/AddNewGameModal/AddNewGameModal';
import { NewReleaseBar } from '../components/NewReleaseBar/NewReleaseBar';
import { GameCard } from '../components/GameCard/GameCard';
import "firebase/auth";

const HomeScreen: React.FC = () => {
  const [getGameList, setGameList] = useState<IGame[]>([]);

  //pegar todos os jogos do usuário
  useEffect(() => {
    api.get(`/game/userGames/${firebase.auth().currentUser?.uid}`)
      .then(result => setGameList(result.data.game))
      .catch(error => console.error(error))
  }, [])

  return (
    <div className="container-fluid bg-surface min-vh-100">
      <div className="row">
        <div className="col bg-surface min-vh-100">
          <Sidebar />
        </div>

        <div className="col-7 d-flex flex-column my-1">
          <div className="row flex-row justify-align-content-between w-100">
            <div className="col d-flex flex-row justify-content-start p-0">
              <h3 className="text-white">Your Games</h3>
            </div>
            <div className="col d-flex flex-row justify-content-end p-0">
              <AddNewGameModal />
            </div>
          </div>
          <div className="row flex-row flex-wrap w-100">

            {
              getGameList.length === 0 ?
                <p className="description">Não há jogos criados. Para começar, você pode criar um novo jogo no menu ao lado.</p>
                :
                <div className="GamesContainer">
                  {
                    getGameList.map((game: IGame) =>
                      <GameCard
                        gameID={game._id}
                        title={game.title}
                        content={game.description}
                        imgUrl={'https://images.unsplash.com/photo-1637779692999-26cdadc69c1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' || `http://localhost:8080/games/${game.image}`}
                        key={game._id}
                      />
                    )
                  }
                </div>
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
