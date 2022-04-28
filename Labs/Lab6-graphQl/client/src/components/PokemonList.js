import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import NotFound from "./NotFound";
import queries from '../queries';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    makeStyles
  } from '@material-ui/core';

import '../App.css';
import CatchReleaseBtn from "./CatchReleaseBtn";
let card = null;

const useStyles = makeStyles({
    card: {
        maxWidth: 250,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30)'
    },
    titleHead: {
        borderTop: '1px solid #ed1d24',
        borderBottom: '1px solid #ed1d24'
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row'
    },
    media: {
        height: '100%',
        width: '100%'
    }
});

const PokemonList = () => {
    const [ count, setCount ] = useState(0);
    const [ limit ] = useState(20);
    const { pagenum } = useParams();
    const {loading, error, data} = useQuery(queries.GET_ALL_POKEMONS, {
        variables: {pageNum: parseInt(pagenum)}
    });
    const classes = useStyles();

    useEffect(() => {
        if(data !== undefined){
            // console.log(data.getAllPokemons[0].count)
            setCount(data.getAllPokemons[0].count);
        }
    }, []);

    const buildCard = (pokemon) => {
        return(
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={pokemon.id}>
                <Card className={classes.card} variant='outlined'>
                <CardActionArea>
                <Link to={`/pokemon/${pokemon.id}`}>
                    <CardMedia
                        className={classes.media}
                        component='img'
                        image={(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`)}
                        title={pokemon.name}
                    />
                    <CardContent>
                        <Typography
                            className={classes.titleHead}
                            gutterBottom
                            variant='h6'
                            component='h2'
                            >
                            {pokemon.name}
                        </Typography>
                    </CardContent>
                </Link>
                </CardActionArea>
                <CatchReleaseBtn pokemon={pokemon}/>
                </Card>
            </Grid>
        )
    }

    card = data && data.getAllPokemons.map(pokemon => {
        // console.log(pokemon);
        return buildCard(pokemon);
    });
    if(data){
        return(
            <div>
                <h1>Pokemons</h1>
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
                <br/>
                <br/>
                {pagenum>0 &&
                    <Link className='paginatedLink' to={`/pokemon/page/${parseInt(pagenum) - 1}`}>PREV</Link>
                }
                {' '}{pagenum}{' '}
                {data.getAllPokemons.length === 20 && parseInt(pagenum) !== (count / limit)  &&
                    <Link className='paginatedLink' to={`/pokemon/page/${parseInt(pagenum) + 1}`}>NEXT</Link>
                }
            </div>
        )
    }else if(loading){
        return(
            <div>
                <h2>Loading...</h2>
            </div>
        )
    }else if(data === undefined){
        return(
            <div>
                <NotFound />
            </div>
        )
    }else if(error){
        return(
            <div>
                <h2>{error.message}</h2>
            </div>
        )
    }
}

export default PokemonList;