import React from 'react';
import './pokemon-statlist.css';

const PokemonStatlist = ({prop}) => {
	return (
		<div className="PokemonStatlist">
			<div className="PokemonStatlistLabel">
				{prop.name}
			</div>
			<div className="PokemonStatlistProgress">
				<div 
					className="PokemonStatlistProgressbar" 
					style={{
						width: `${(prop.value*95/100) + 5}%`,
					}}
				/>
			</div>
		</div>
	);
}

export default PokemonStatlist;