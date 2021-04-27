import React, { useEffect } from 'react';
import './pokemon-ability.css';
import * as Helper from './../../Services/helper.service.js';

const PokemonAbility = ({name}) => {

	useEffect(() => {
	}, []);

	return (
		<div className="PokemonAbility">
			<div className={"AbilityImage " + (name === 'none' ? 'None ' : '')}>
				{name !== 'none' ? name.charAt(0).toUpperCase() : ''}
			</div>
			<div className="AbilityName">
				{name !== 'none' ? Helper.toTitleCase(name) : ''}
			</div>
		</div>
	);
}

export default PokemonAbility;