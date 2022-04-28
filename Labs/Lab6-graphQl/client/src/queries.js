import {gql} from '@apollo/client';

const GET_ALL_POKEMONS = gql`
    query($pageNum: Int){
        getAllPokemons(pageNum: $pageNum){
            id
            name
            url
            count
        }
    }
`;

const GET_POKEMON = gql`
    query($id: Int!){
        getPokemon(id: $id){
            id
            name
            height
            weight
            image
            experience
        }
    }
`;

const SEARCH_POKEMON = gql`
    query($name: String!){
        searchPokemon(name: $name){
            id
            name
            height
            weight
            image
            experience
        }
    }
`;

let exported = {
    GET_ALL_POKEMONS,
    GET_POKEMON,
    SEARCH_POKEMON
}

export default exported;