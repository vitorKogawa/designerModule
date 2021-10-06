import '../App.scss';
import { RightMenu } from '../Components/PublicComponents/RightMenu';
import { CardGame } from '../Components/PublicComponents/CardGame';
import { useEffect, useState } from 'react';
import { api_url } from '../public/variables';
import { useHistory } from "react-router-dom";
import firebase from 'firebase/app';
import "firebase/auth";

function App() {
  // eslint-disable-next-line
  const [gameList, setGameList] = useState(Array());
  const history = useHistory();

  useEffect(() => {
    async function getGames() {
      const gamesResult = await fetch(api_url+'game/userGames/'+firebase.auth().currentUser?.uid, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin" : "*", 
          'Content-Type': 'application/json'
        }
      });
      const result = await gamesResult.json();
      setGameList(result.game);
    }  
    getGames();
  }, [])

  const onCardClick = (gameId: any) => {
    history.push({
      pathname: '/editor',
      search: '?game='+gameId,
      state: {
        gameId: gameId
      }
    })
  }

  return (
    <div className="App">
      <div className="App-container">
        <header className="App-header">
          <label>{gameList.length} Jogos</label>
        </header>
        {gameList.length === 0 ? 
          <p className="description">Não há jogos criados. Para começar, você pode criar um novo jogo no menu ao lado.</p>
        :       
        <div className="GamesContainer">
        {gameList.map((item: any, index: any) => {
          console.log(item)
          return <CardGame idGame={item._id} onCardClick={() => onCardClick(item._id)} key={index} src={`http://localhost:8080/games/${item.image}`} title={item.title} description={item.description}/>
        })}
        </div>
        }
      </div>
      <RightMenu />
    </div>
  );
}
export default App;
