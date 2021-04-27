import React, { useEffect, useState } from 'react';
import Monster from './monster.jsx';
import * as Http from './../../Services/http.service.jsx';
import './pokemon.css';
import { useHistory } from 'react-router-dom';

const LIMIT = 14;
let currPage;

const getPokemons = (page, whendone: Function = null) => {
	Http.Get('pokemon', {
		limit: LIMIT,
		offset: (page-1) * LIMIT,
	}, (response: any) => {
		if(whendone != null)
			whendone(response);

		console.log("loading false");
	});
};

const Pokemon = () => {
	const history = useHistory();
	const [pokemons, setPokemons] = useState([]);
	const [showLoading, setShowLoading] = useState(false);

	useEffect(() => {
		currPage = 1;
		setShowLoading(true);
		getPokemons(currPage, (response) => {
			setPokemons(response.results);
			console.log(response.results);
			setShowLoading(false);
		});
	}, []);

	const onClickLoadMore = (e) => {
		currPage += 1;
		setShowLoading(true);
		getPokemons(currPage, (response) => {
			let temp = pokemons;
			temp = temp.concat(response.results);
			setPokemons(temp);
			setShowLoading(false);
		});
	};

	const gotoMyPoke = () => {
		history.push('/poke/mypokemon');
	}

	return (
		<div className="Pokemon">
			<div className="PokeLogo">
				<img 
					alt="" 
					src={'pokemon.png'} 
				/>
			</div>
			<div className="MyPoke">
				<button className="btn" onClick={gotoMyPoke}>
					Go to My Pokemon
				</button>
			</div>
			{pokemons.map((pokemon, index) => {
				return (
					<Monster key={index} name={pokemon.name} url={pokemon.url} />
				)
			})}
			<div className="LoadMore">
				{
					!showLoading && 
					<div className="btn" onClick={onClickLoadMore}>
						Load More....
					</div>
				}
			</div>
		</div>
	);
}

export default Pokemon;