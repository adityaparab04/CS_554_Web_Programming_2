import React, { useState, useEffect} from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SearchCharacters from "./SearchCharacters";
import NotFound from './NotFound';

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

const useStyles = makeStyles({
    card: {
        maxWidth: 250,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30)',
        '&:hover': {
            transform: "scale3d(1.04, 1.04, 1)",
            boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
        }
    },
    titleHead: {
        borderBottom: '1px solid #ed1d24',
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

const CharacterList = (props) => {

    //marvel api authentication
    const md5 = require('blueimp-md5');
    const publickey = '340601f11a380a1d721cd0cb50cae0d0';
    const privatekey = 'd8b916769806f64f3722b5b6f86eb79d6e5506db';
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    //hooks
    const [ loading, setLoading ] = useState(true);
    const [ searchData, setSearchData ] = useState(undefined);
    const [ charactersData, setCharactersData ] = useState(undefined);
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ limit ] = useState(20);
    const [ totalResults, setTotalResults ] = useState(0);
    const { page } = useParams();
    const offset = limit * page;
    const classes = useStyles();
    
    let card = null;

    useEffect(() => {
        const fetchData = async function fetchData(){
            try{
                const { data } = await axios.get(`${url}&limit=${limit}&offset=${offset}`);
                console.log(data.data);
                setLoading(false);
                setCharactersData(data.data.results);
                setTotalResults(data.data.total);
                window.scrollTo(0, 0);
            }catch(e){
                console.log(e);
            }
        }; fetchData();
    },[page]);

    useEffect(() => {
        const fetchData = async function fetchData(){
            try{
                const { data } = await axios.get(`${baseUrl}?nameStartsWith=${searchTerm}&ts=${ts}&apikey=${publickey}&hash=${hash}`);
                console.log(data.data);
                setLoading(false);
                setSearchData(data.data.results);
            }catch(e){
                console.log(e);
            }
        }
        if (searchTerm) {
            console.log('searchTerm is set');
            fetchData();
        }
    },[searchTerm]);

    const searchValue = async (value) => {
        setSearchTerm(value);
    };

    const buildCard = (character) => {
        return(
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={character.id}>
                <Card className={classes.card} variant='outlined'>
                <CardActionArea>
                    <Link to={`/characters/${character.id}`}>
                        <CardMedia
                            className={classes.media}
                            component='img'
                            image={
                            `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`
                            }
                            title='character image'
                        />
    
                        <CardContent>
                            <Typography
                            className={classes.titleHead}
                            gutterBottom
                            variant='h6'
                            component='h3'
                            >
                            {character.name}
                            </Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
                
                </Card>
            </Grid>
        )
    }
    if (searchTerm) {
        card =
          searchData && searchData.map((character) => {
            return buildCard(character);
          });
    }else {
        card = charactersData && charactersData.map((character) => {
            return buildCard(character);
        });
    }
    
    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    }else if (offset>totalResults){
        return(
            <NotFound/>
        )
    }else{
        return(
            <div>
                <h1>MARVEL CHARACTERS LIST</h1>
                <SearchCharacters searchValue={searchValue} />
                <br/>
                <br/>
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
                <div className="paginationDiv">
                    <br/>
                    <br/>
                    {page>0 && searchTerm === '' &&
                    <Link className='paginatedLink' to={`/characters/page/${parseInt(page) - 1}`}>PREV</Link>
                    }
                    {' '}{page}{' '}
                    {offset<totalResults-limit && searchTerm === '' &&
                    <Link className='paginatedLink' to={`/characters/page/${parseInt(page) + 1}`}>NEXT</Link>
                    }
                </div>
            </div>
        );
    }
}

export default CharacterList;