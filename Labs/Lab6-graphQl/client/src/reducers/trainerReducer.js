import {v4 as uuid} from 'uuid';

let copyState = null;
let index = 0;

const trainerReducer = (state = [], action) => {
    const { type, payload } = action;

    switch(type){
        case 'CREATE_TRAINER':
            // console.log('payload', payload)
            return [...state, { id: uuid(), name: payload.name, selected: false, pokemons: [] } ];
        case 'DELETE_TRAINER':
            copyState = [...state];
            index = copyState.findIndex((trainer) => trainer.id === payload.id);
            if(copyState[index].selected === false){
                copyState.splice(index, 1);
            }
            return [...copyState];
        case 'SELECT_TRAINER':
            copyState = [...state];
            index = copyState.findIndex((trainer) => trainer.id === payload.id);
            copyState.forEach((x) => {
                x.selected = false;
            });
            copyState[index].selected = true;
            // console.log(copyState);
            return [...copyState];
        case 'UNSELECT_TRAINER':
            copyState = [...state];
            index = copyState.findIndex((trainer) => trainer.id === payload.id);
            copyState[index].selected = false;
            // console.log(copyState);
            return [...copyState];
        case 'CATCH_POKEMONS':
            copyState = [...state];
            index = copyState.findIndex((trainer) => trainer.id === payload.id);
            copyState[index].pokemons.push(payload.pokemonId);
            return [...copyState];
        case 'RELEASE_POKEMONS':
            copyState = [...state];
            index = copyState.findIndex((trainer) => trainer.id === payload.id);
            for(let i=0; i<copyState[index].pokemons.length; i++){
                if(copyState[index].pokemons[i] === payload.pokemonId){
                    copyState[index].pokemons.splice(i, 1);
                }
            }
            return [...copyState];
        default:
            // console.log(state);
            return state;
    }
}


export default trainerReducer