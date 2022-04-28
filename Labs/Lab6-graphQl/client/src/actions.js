const addTrainer = (name) => ({
    type: 'CREATE_TRAINER',
    payload: {
        name: name
    }
});

const deleteTrainer = (id) => ({
    type: 'DELETE_TRAINER',
    payload: {
        id: id
    }
});

const selectTrainer = (id) => ({
    type: 'SELECT_TRAINER',
    payload: {
        id: id
    }
});

const unselectTrainer = (id) => ({
    type: 'UNSELECT_TRAINER',
    payload: {
        id: id
    }
});

const catchPokemon = (id, pokemonId) => ({
    type: 'CATCH_POKEMONS',
    payload:{
        id: id,
        pokemonId: pokemonId,
    }
});

const releasePokemon = (id, pokemonId) => ({
    type: 'RELEASE_POKEMONS',
    payload:{
        id: id,
        pokemonId: pokemonId,
    }
})

module.exports = {
    addTrainer,
    deleteTrainer,
    selectTrainer,
    unselectTrainer,
    catchPokemon,
    releasePokemon
}