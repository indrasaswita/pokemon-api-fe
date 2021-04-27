import React from 'react';
import { useHistory } from 'react-router-dom';
import './monster.css';


const Monster = ({name, url}) => {
	const history = useHistory();

	const goToPokemonDetail = (e, url, name) => {
		console.log(url);
		url = url.replace(process.env.REACT_APP_ENDPOINT + "/", '');
		const id = url.replace('pokemon/', '').replace('/', '');
		history.push('/poke/detail?name=' + name + '&id=' + id);
	}

	return (
		<div className="Monster" onClick={(e) => {goToPokemonDetail(e, url, name)}}>
			<div className="name">{name}</div>
		</div>
	);
}

export default Monster;