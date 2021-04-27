import React from 'react';
import './pokemon-type.css';

const PokemonType = ({name}) => {
	return (
		<div className="PokemonType">
			<img 
				alt="type" 
				src={`/elements/${name.toLowerCase()}.png`} 
			/>
		</div>
	);
}


export default PokemonType;