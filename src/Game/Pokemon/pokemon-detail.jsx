import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import * as Http from './../../Services/http.service.jsx';
import './pokemon-detail.css';
import PokemonAbility from './pokemon-ability.jsx';
import PokemonType from './pokemon-type.jsx';
import PokemonLabel from './pokemon-label.jsx';
import PokemonStatlist from './pokemon-statlist.jsx';
import { useHistory } from 'react-router-dom';

const getPokemonDetail = (pokemon_name, whendone: Function = null) => {
	Http.Get(
		`pokemon/${pokemon_name}`, 
		null, 
		(response) => {
			console.log(response);
			if(whendone != null)
				whendone(response);
		}
	);
}

const PokemonDetail = (props) => {
	const [name, setName] = useState('');
	const [id, setId] = useState(0);
	const [abilities, setAbilities] = useState([]);
	const [stats, setStats] = useState([]);
	const [types, setTypes] = useState([]);
	const [weight, setWeight] = useState(0);
	const [mypokemons, setMypokemons] = useState([]);
	const [pokeName, setPokeName] = useState('');
	const [loadingText, setLoadingText] = useState('');
	const [showPokemonCatchForm, setShowPokemonCatchForm] = useState(false);
	const [showPokemonCatchError, setShowPokemonCatchError] = useState('');
	const [showPokemonCatchFail, setShowPokemonCatchFail] = useState(false);
	const [showPokemonCatchLoading, setShowPokemonCatchLoading] = useState(false);
	const parsed = queryString.parse(props.location.search);
	const history = useHistory();

	useEffect(() => {
		if(localStorage.getItem("mypokemons") == null)
			setMypokemons(JSON.stringify([]));
		else
			setMypokemons(localStorage.getItem("mypokemons"));
		getPokemonDetail(parsed.name, (response) => {
			const tempAbility = [];

			for(var i = 0; i < 4; i++) {
				tempAbility[i] = {
					name: 'none',
					description: '',
					url: '',
				};
			}
			response.abilities.forEach((ii) => {
				tempAbility[ii.slot-1] = {
					name: ii.ability.name,
					description: '',
					url: '',
				}
			});

			setAbilities(tempAbility);

			let temp = [];
			response.stats.forEach((ii) => {
				temp.push({
					name: ii.stat.name,
					value: ii.base_stat > 130 ? 130 : ii.base_stat / 130 * 100,
				});
			});
			setStats(temp);

			temp = [];
			response.types.forEach((ii) => {
				temp.push(ii.type.name)
			});
			setTypes(temp);
			setWeight(response.weight / 10);
		});


		setName(parsed.name);
		setId(parsed.id.replace('/', ''));
	}, [parsed.name, parsed.id]);


	useEffect(() => {
		localStorage.setItem("mypokemons", mypokemons);
	}, [mypokemons])

	const catchEm = (newid, newpokemon) => {
		if(pokeName.length < 5){
			setShowPokemonCatchError("Name must be contain 5 characters or more.");
		} else {
			setShowPokemonCatchError("");
			let temp = JSON.parse(mypokemons);
			temp.push({
				pokemon: newpokemon,
				id: newid,
				name: pokeName,
			});
			setMypokemons(JSON.stringify(temp));

			setPokeName("");
			setShowPokemonCatchForm(false);

			setTimeout(() => {
				history.push('/poke/mypokemon');
			}, 100);
		}
	}

	const showForm = () => {
		let loadingTx = "Loading";
		setShowPokemonCatchForm(false);
		setShowPokemonCatchFail(false);
		setLoadingText(loadingTx);

		setShowPokemonCatchLoading(true);
		const intv = setInterval(() => {
			loadingTx = "." + loadingTx + ".";
			setLoadingText(loadingTx);
		}, 300);
		setTimeout(() => {
			setShowPokemonCatchLoading(false);
			clearInterval(intv);
		}, Math.floor(Math.random() * 100) * 30);

		var x = Math.floor((Math.random() * 10) + 1);
		if(x <= 5) { // 50%
			setShowPokemonCatchForm(true);
			setShowPokemonCatchFail(false);
		} else {
			setShowPokemonCatchForm(false);
			setShowPokemonCatchFail(true);
		}
	}

	const formKeyPress = (e) => {
		if(e.key === "Enter") {
			catchEm(id, name);
		}
	}

	return (
		<div className="PokemonDetailWrapper">
			<div className="PokemonDetail">
				<div 
					className="PokemonSprite"
					style={{
						backgroundImage: `url(/background/grass.png)`
					}}
				>
					<img 
						alt="" 
						src={`/sprites/animated/${id}.gif`} 
					/>
				</div>
				<div className="PokemonStat">
					<div className="PokemonLabelWrapper">
						<PokemonLabel 
							weight={weight}
						/>
					</div>
					<div className="PokemonTypeWrapper">
						{types && types.map((type, index) => {
							return (
								<PokemonType
									key={`type-${index}`}
									name={type}
								/>
							);
						})}
					</div>
				</div>
				<div className="PokemonName">
					{name}
				</div>
				<div className="PokemonStatisticWrapper">
					{stats && stats.map((stat, index) => {
						return (
							<PokemonStatlist 
								key={`stat-${index}`}
								prop={stat}
							/>
						);
					})}
				</div>
				<div className="PokemonAbilityWrapper">
					{abilities && abilities.map((ability, index) => {
						return (
							<PokemonAbility
								key={`ability-${index}`}
								name={ability.name}
							/>
						);
					})}
				</div>
			</div>
			<div className="PokemonCatchWrapper">
				{!showPokemonCatchLoading && !showPokemonCatchForm && !showPokemonCatchFail && 
					<div className="PokemonDetailAction btn" onClick={() => showForm()}>
						Catch This Pokemon
					</div>
				}
				{!showPokemonCatchLoading && showPokemonCatchForm && 
					<div className="PokemonDetailForm">
						<div className="InfoText">
							Congratulation!!!<br/>You have got this pokemon.
						</div>

						<input 
							className="DetailFormInput" 
							type="text" 
							placeholder="Input Pokemon Nickname!" 
							value={pokeName} 
							onChange={e => setPokeName(e.target.value)} 
							onKeyPress={formKeyPress}
						/>

						<div className="PokemonDetailAction btn" onClick={() => catchEm(id, name)}>
							GOO!!!!
						</div>

						<div className="InfoError">
							{showPokemonCatchError.length > 0 && showPokemonCatchError}
						</div>
					</div>
				}
				{!showPokemonCatchLoading && showPokemonCatchFail && 
					<div className="PokemonDetailFail">
						<div className="InfoText">
							Arrghhh!! You fail to catch {name}!
						</div>

						<div className="PokemonDetailAction btn" onClick={() => showForm(name)}>
							Catch Again!
						</div>
					</div>
				}
				{showPokemonCatchLoading &&
					<div className="PokemonCatchLoading">
						<img 
							alt="type" 
							className="rotating" 
							src={"/sprites/loading.png"} 
						/>
						{loadingText}
					</div>
				}
			</div>
		</div>
	);
}

export default PokemonDetail;