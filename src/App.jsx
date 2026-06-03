import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import title from './assets/pokemonTitle.png';
// import Button from "./components/button/Button.jsx";

function App() {
//https://pokeapi.co/api/v2/pokemon/{name}
    const linkPokemon = 'https://pokeapi.co/api/v2/pokemon/9';
    const [pokemon, setPokemon] = useState("");
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);


    async function fetchPokemon() {
        toggleLoading(true);
        toggleError(false);
        try {
            const response = await axios.get(linkPokemon, {});
            setPokemon(response.data)
            console.log(response.data)
        } catch (e) {
            toggleError(true)
            console.error(e);
        } finally {
            toggleLoading(false);
        }
    }

    useEffect(() => {
        void fetchPokemon()
    }, []);

    return (
        <>
            <main>
                <img src={title} alt='pokemon as title' />
                <span><><button type='submit'>vorige</button><button type='submit'>volgende</button></></span>
                <div>
                    <article className="card">
                        <h2>{pokemon.name}</h2>
                        {/* Het ? zorgt ervoor dat, als de data nog niet bekent is, ze de rendering van de pagina stopt totdat de data wel binnen is*/}
                        <img src={pokemon?.sprites?.front_shiny} alt='drawing of a scifi animal'/>
                        <p><strong>Moves: </strong>{pokemon?.moves?.length}</p>
                        <p><strong>Weight: </strong>{pokemon?.weight}</p>
                        <ul><strong>Abilities: </strong>
                            {pokemon?.abilities?.map((ability) => {
                                return (<li key={ability.ability.name}>{ability.ability.name}</li>)
                            })}
                        </ul>
                    </article>
                    <article className="card">
                        <h2>{pokemon.name}</h2>
                        <img src={pokemon?.sprites?.front_shiny} alt='drawing of a scifi animal'/>
                        <p><strong>Moves: </strong>{pokemon?.moves?.length}</p>
                        <p><strong>Weight: </strong>{pokemon?.weight}</p>
                        <ul><strong>Abilities: </strong>
                            {pokemon?.abilities?.map((ability) => {
                                return (<li key={ability.ability.name}>{ability.ability.name}</li>)
                            })}
                        </ul>
                    </article>
                </div>
            </main>
        </>
    )
}

export default App
