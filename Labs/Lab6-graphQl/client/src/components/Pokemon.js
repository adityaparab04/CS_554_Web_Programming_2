import React from "react";
import '../App.css';
import queries from '../queries';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CatchReleaseBtn from "./CatchReleaseBtn";
import NotFound from './NotFound';
import {
    makeStyles,
    Card,
    CardContent,
    CardMedia,
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

const Pokemon = () => {
    const { id } = useParams();
    const {loading, error, data} = useQuery(queries.GET_POKEMON, {
        variables: {id: parseInt(id)}
    });
    const classes = useStyles();
    // console.log(data);
    if(data !== undefined && data.getPokemon !== null){
        return(
            <div>
                <h2>Pokemon</h2>
                <Card className={classes.card} variant='outlined'>
                    <CardHeader className={classes.titleHead} title={data.getPokemon.name} />
                    <CardMedia 
                        className={classes.media} 
                        component='img'
                        image={data.getPokemon.image}
                        title='Character image'
                    />
                    <CardContent>
                    <ul key={data.getPokemon.id}>
                        <li className='title'>Height: {data.getPokemon.height}</li>
                        <li className='title'>Weight: {data.getPokemon.weight}</li>
                        <li className='title'>Experience: {data.getPokemon.experience}</li>
                    </ul>
                    </CardContent>
                    <CatchReleaseBtn pokemon={data.getPokemon} />
                </Card>
            </div>
        )
    }else if(loading){
        return(
            <div>
                <h2>Loading...</h2>
            </div>
        )
    }else if(data === undefined || data.getPokemon === null){
        return(
            <div><NotFound /></div>
        )
    }else if(error){
        return(<div><h2>{error.message}</h2></div>)
    }
}

export default Pokemon;