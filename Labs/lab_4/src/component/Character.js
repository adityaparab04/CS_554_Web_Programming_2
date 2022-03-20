import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import NotFound from '../component/NotFound';
import {
    makeStyles,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader
} from '@material-ui/core';
import '../App.css';
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

const Character = () => {
    
    const md5 = require('blueimp-md5');
    const publickey = '340601f11a380a1d721cd0cb50cae0d0';
    const privatekey = 'd8b916769806f64f3722b5b6f86eb79d6e5506db';
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    const [ characterData, setCharacterData ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        const fetchData =  async function fetchData(){
            try{
                const { data } = await axios.get(`${baseUrl}/${id}?ts=${ts}&apikey=${publickey}&hash=${hash}`);
                console.log(data.data.results[0]);
                setCharacterData(data.data.results[0]);
                setLoading(false);
                setError(false);
            }catch(e){
                console.log(e);
                setError(true);
            }
        }; fetchData();
    }, [id]);

    let description = null;
    const regex = /(<([^>]+)>)/gi;

    if(characterData && characterData.description){
        description = characterData && characterData.description.replace(regex, '');
    }else{
        description = 'No description';
    }

    if(error){
        return(
            <NotFound/>
        )
    }else if(loading){
        return(
            <h2>
            Loading...
            </h2> 
        )
    }else{
        return(
            <Card className={classes.card} variant='outlined'>
                <CardHeader className={classes.titleHead} title={characterData.name} />
                <CardMedia 
                    className={classes.media} 
                    component='img' 
                    image={
                        `${characterData.thumbnail.path}/portrait_uncanny.${characterData.thumbnail.extension}` } 
                    title='Character image'
                />
                <CardContent>
                <Typography variant='body2' color='textSecondary' component='span'></Typography>
                <dl>
                    <p>
                        <dt className='title'>Description:</dt>
                        <dd>{description}</dd>
                    </p>
                    <p>
                        <dt className='title'>Comics Featured:</dt>
                        {characterData.comics.items.length > 0 ?
                             characterData.comics.items.map((comics) => {
                            return (<dd><Link className="cardLink" to={`/comics/${comics.resourceURI.substring(43)}`}>{comics.name}</Link></dd>)
                        }) : <dd> Not featured in any Comics</dd>  
                    }
                    </p>
                    <p>
                        <dt className='title'>Series Featured</dt>
                        {characterData.series.items.length > 0 ?
                            characterData.series.items.map((series) => {
                                return(<dd><Link className="cardLink" to={`/series/${series.resourceURI.substring(43)}`}>{series.name}</Link></dd>)
                        }) : <dd>Not featured in any Series</dd>
                        }
                    </p>
                </dl>
                </CardContent>
            </Card>
        )
    }
}

export default Character;