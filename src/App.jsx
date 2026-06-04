import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import title from './assets/pokemonTitle.png';
// import Button from "./components/button/Button.jsx";

function App() {
    const linkPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20';
    const [pokemon, setPokemon] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);


    async function fetchPokemon() {
        toggleLoading(true);
        toggleError(false);
        try {
            const response = await axios.get(linkPokemon, {});
            const pokemonDetails = await Promise.all(
                response.data.results.map(async (pokemon) => {
                    const detailResponse = await axios.get(pokemon.url);
                    return detailResponse.data;
                })
            );
            setPokemon(pokemonDetails);
            console.log(pokemonDetails);
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
                    {pokemon?.map((alien) => {
                        return (
                        <article className="pokemon" key={alien.abilities.id}>
                            <h2>{alien.name}</h2>
                            {/* Het ? zorgt ervoor dat, als de data nog niet bekent is, ze de rendering van de pagina stopt totdat de data wel binnen is*/}
                            <img src={alien?.sprites?.front_shiny} alt='drawing of a scifi animal'
                                 className='statue'/>
                            <p><strong>Moves: </strong>{alien?.moves?.length}</p>
                            <p><strong>Weight: </strong>{alien?.weight}</p>
                            <ul><strong>Abilities: </strong>
                                {alien?.abilities?.map((ability) => {
                                    return (<li key={ability.ability.name}>{ability.ability.name}</li>)
                                })}
                            </ul>
                        </article>
                    )})};
                    {loading && <h2> .... de data wordt opgehaald .... </h2>}
                    {error && <h2> Er is iets misgegaan</h2>}
                </div>
            </main>
        </>
    )
}

export default App
