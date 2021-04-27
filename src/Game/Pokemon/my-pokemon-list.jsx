import React from 'react';
import './my-pokemon-list.css';
import { useHistory } from 'react-router-dom';


const MyPokemonList = ({props}) => {
	const history = useHistory();

	const gotoHome = () => {
		history.push('/');
	}


	return (
		<div className="MyPokemonList">
			<div 
				className="ListImage"
				style={{
					backgroundImage: `url(/background/grass.png)`
				}}
			>
				<img 
					alt="type" 
					src={`/sprites/animated/${props.id}.gif`} 
				/>
			</div>
			<div className="ListName">
				<div className="category">
					{props.pokemon}
				</div>
				<div className="name">
					{props.name}
				</div>
			</div>

			<div className="float-top-right">
				<button className="btn" onClick={gotoHome}>
					Catch<br />Again!
				</button>
			</div>
		</div>
	);
};

export default MyPokemonList;