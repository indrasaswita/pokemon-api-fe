import React from 'react';
import './pokemon-label.css';

const PokemonLabel = ({weight}) => {
	return (
		<div className="PokemonLabel">
			{weight} Kg
		</div>
	);
}

export default PokemonLabel;