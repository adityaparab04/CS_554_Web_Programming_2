import React from "react";
import '../App.css';

const Home = () => {
    return(
        <div className='home-container'>
            <h1>Pokemon Catcher</h1>
            <p>Welcome to Pokemon Catcher. 
            Here You can select any pokemon trainer and add them to your team. 
            At most you can have only 6 pokemons. 
            Once you catch 6 pokemons the lobby is full. 
            You have to release the caught pokemon to catch new ones.
            </p>
            <p>
            This application has 2 endpoints: <a target="_blank" href="https://pokeapi.co/api/v2/pokemon">https://pokeapi.co/api/v2/pokemon</a>
            </p>
            <p>
            and <a target="_blank" href="https://pokeapi.co/api/v2/pokemon/1"> https://pokeapi.co/api/v2/pokemon/ID</a>
            </p>
            <p>The trainers are stored in the redux for state management and thus once refreshed the data is lost.</p>
            <p>Search Functionality is implemented on the different route. If a selected trainer searchs for the pokemon, the pokemon can be caught by clicking the button.</p>
        </div>
    )
}

export default Home;