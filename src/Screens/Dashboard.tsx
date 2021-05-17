import '../App.css';
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
      console.log('entrou')
      const gamesResult = await fetch(api_url+'game/userGames/'+firebase.auth().currentUser?.uid, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await gamesResult.json();
      setGameList(result.game);
    }  
    getGames()
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
          return <CardGame onCardClick={() => onCardClick(item._id)} key={index} src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" title={item.title} description={item.description}/>
        })}
        </div>
        }
      </div>
      <RightMenu />
    </div>
  );
}
/**
 * {gameList.map((item: any, index: any) => {
          <CardGame key={index} src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" title={item.title} description={item.description}/>
        })}
 */
export default App;
