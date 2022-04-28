const {ApolloServer, gql} = require('apollo-server');
const axios = require('axios');
const redis = require('redis');

//redis client connect
const client = redis.createClient();
async function connect(){
    return await client.connect();
}
connect();

const baseUrl = "https://pokeapi.co/api/v2/pokemon"

const typeDefs = gql `
    type Query {
        getAllPokemons(pageNum: Int): [PokemonList]
        getPokemon(id: Int): PokemonCard
        searchPokemon(name: String): PokemonCard
    }
    type PokemonCard {
        id: ID!
        name: String!
        height: Int
        weight: Int
        image: String!
        experience: Int
    }
    type PokemonList {
        id: ID!
        name: String
        url: String
        count: Int
    }
    
`;


const resolvers = {
    Query: {
        async getAllPokemons(parent, args, context, info){
            if(await client.HEXISTS("pokemonList", args.pageNum)){
                const pokemons = await client.HGET("pokemonList", args.pageNum);
                return JSON.parse(pokemons);
            }else{
                let pokemonList = [];
                const { data } = await axios.get(`${baseUrl}?offset=${args.pageNum * 20}&limit=20`);
                // console.log(data);
                if(data.results.length === 0) throw `Error 404: Not found`;
                const pokemons = data.results;
                for(const pokemon of pokemons){
                    const urls = pokemon.url.split('/');
                    const id = urls[urls.length - 2];
                    let pokemonData = {
                        id: id,
                        name: pokemon.name,
                        url: pokemon.url,
                        count: data.count
                    }
                    pokemonList.push(pokemonData);
                }
                // console.log(pokemonList);
                await client.HSET("pokemonList", args.pageNum, JSON.stringify(pokemonList));
                return pokemonList;
            }
        },
        async getPokemon(parent, args, context, info){
                if(await client.HEXISTS("pokemon", args.id)){
                    const pokemonData = await client.HGET("pokemon", args.id);
                    return JSON.parse(pokemonData);
                }else{
                    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${args.id}`);
                    // console.log(data.sprites["official-artwork"].front_default);
                    let pokemonData = {
                        "id" : data.id,
                        "name": data.name,
                        "height": data.height,
                        "weight": data.weight,
                        "image": `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
                        "experience": data.base_experience
                    }
                    // console.log(pokemonData);
                    await client.HSET("pokemon", args.id, JSON.stringify(pokemonData));
                    return pokemonData;
                }
        },
        async searchPokemon(parent, args, context, info){
            if(await client.HEXISTS("searchPokemon", args.name)){
                const pokemonData = await client.HGET("searchPokemon", args.name);
                return JSON.parse(pokemonData);
            }else{
                const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${args.name}`);
                // console.log(data);
                let pokemonData = {
                    "id" : data.id,
                    "name": data.name,
                    "height": data.height,
                    "weight": data.weight,
                    "image": `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
                    "experience": data.base_experience
                }
                await client.HSET("searchPokemon", args.name, JSON.stringify(pokemonData));
                return pokemonData;
            }
        }
    }
}

//apollo server config
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url} 🚀`);
});