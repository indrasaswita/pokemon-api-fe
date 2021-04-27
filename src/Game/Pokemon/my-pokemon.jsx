import React, { useState, useEffect } from 'react';
import * as Http from './../../Services/http.service.jsx';
import './my-pokemon.css';
import MyPokemonList from './my-pokemon-list.jsx';

const getMyPokemon = (whendone: Function = null) => {
	Http.Get2('get', {}, (response) => {
		console.log(response);
	});
}

const MyPokemon = () => {
	const [mypokemons, setMypokemons] = useState([]);
	
	useEffect(() => {
		getMyPokemon();

		if(localStorage.getItem("mypokemons") == null)
			setMypokemons([]);
		else
			setMypokemons(JSON.parse(localStorage.getItem("mypokemons")));
	}, []);

	return (
		<div className="MyPokemon">
			<div className="MyPokemonTitle">
				My Pokemon
			</div>

			<div className="MyPokemonListWrapper">
				{mypokemons && mypokemons.map((mypokemon, index) => {
					return (
						<MyPokemonList 
							key={`mypokemon-${index}`}
							props={mypokemon}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default MyPokemon;