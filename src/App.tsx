import './App.css';
import { RightMenu } from './Components/RightMenu';
import { CardGame } from './Components/CardGame';

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <header className="App-header">
          <label>0 Jogos</label>
        </header>
        <p className="description">Não há jogos criados. Para começar, você pode criar um novo jogo no menu ao lado.</p>
        <div className="GamesContainer">
          <CardGame src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" title="Titulooo" description="descricaodescricao"/>
          <CardGame src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" title="Titulooo" description="descricaodescricao"/>
          <CardGame src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" title="Titulooo" description="descricaodescricao"/>
          <CardGame src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" title="Titulooo" description="descricaodescricao"/>
          <CardGame src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" title="Titulooo" description="descricaodescricao"/>
          <CardGame src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" title="Titulooo" description="descricaodescricao"/>
          <CardGame src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" title="Titulooo" description="descricaodescricao"/>
          <CardGame src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" title="Titulooo" description="descricaodescricao"/>
          <CardGame src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" title="Titulooo" description="descricaodescricao"/>
        </div>
      </div>
      <RightMenu />
    </div>
  );
}

export default App;
