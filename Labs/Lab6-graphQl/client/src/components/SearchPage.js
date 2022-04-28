import React, { useState } from "react";
import '../App.css';
import SearchPokemon from "./SearchPokemon";
import CatchReleaseBtn from './CatchReleaseBtn';
import NotFound from './NotFound';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import {
    makeStyles,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader
} from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        maxWidth: 550,
        height: 'auto',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #ed1d24',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
    },
    titleHead: {
      borderBottom: '1px solid #ed1d24',
      fontWeight: 'bold'
    },
    grid: {
      flexGrow: 1,
      flexDirection: 'row'
    },
    media: {
      height: '100%',
      width: '100%'
    },
    button: {
      color: '#ed1d24',
      fontWeight: 'bold',
      fontSize: 12
    }
});

const SearchPage = () => {
    const classes = useStyles();
    const [ searchTerm, setSearchTerm ] = useState("");

    const { loading, error, data } = useQuery(queries.SEARCH_POKEMON, {
        variables: {name: searchTerm.toLowerCase()}
    });
    
    if(data){
        console.log(data);
    }
    const searchValue = async (value) => {
        setSearchTerm(value);
    };
    if(searchTerm === ''){
        return(
            <div>
                <h1>Search Page</h1>
                <SearchPokemon searchValue={searchValue}/>
                {data && data.searchPokemon &&
                    <Card className={classes.card} variant='outlined'>
                        <CardHeader className={classes.titleHead} title={data.searchPokemon.name} />
                        <CardMedia 
                            className={classes.media} 
                            component='img'
                            image={data.searchPokemon.image}
                            title='Character image'
                        />
                        <CardContent>
                        <ul key={data.searchPokemon.id}>
                            <li className='title'>Height: {data.searchPokemon.height}</li>
                            <li className='title'>Weight: {data.searchPokemon.weight}</li>
                            <li className='title'>Experience: {data.searchPokemon.experience}</li>
                        </ul>
                        </CardContent>
                        <CatchReleaseBtn pokemon={data.searchPokemon} />
                    </Card>
                }
            </div>  
        )
    }else{
        return(
            <div>
                <h1>Search Page</h1>
                <SearchPokemon searchValue={searchValue}/>
                {data && data.searchPokemon ?
                    (<Card className={classes.card} variant='outlined'>
                        <CardHeader className={classes.titleHead} title={data.searchPokemon.name} />
                        <CardMedia 
                            className={classes.media} 
                            component='img'
                            image={data.searchPokemon.image}
                            title='Character image'
                        />
                        <CardContent>
                        <ul key={data.searchPokemon.id}>
                            <li className='title'>Height: {data.searchPokemon.height}</li>
                            <li className='title'>Weight: {data.searchPokemon.weight}</li>
                            <li className='title'>Experience: {data.searchPokemon.experience}</li>
                        </ul>
                        </CardContent>
                        <CatchReleaseBtn pokemon={data.searchPokemon} />
                    </Card>) : <h2>Enter Correct Pokemon Name!</h2>
                }
            </div>  
        )
    }
}

export default SearchPage;