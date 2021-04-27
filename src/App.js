import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Pokemon from './Game/Pokemon/pokemon.jsx';
import PokemonDetail from './Game/Pokemon/pokemon-detail.jsx';
import MyPokemon from './Game/Pokemon/my-pokemon.jsx';
import { Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Pokemon} />
          <Route path="/poke/detail" exact component={PokemonDetail} />
          <Route path="/poke/mypokemon" exact component={MyPokemon} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
