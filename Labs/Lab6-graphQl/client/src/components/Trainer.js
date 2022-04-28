import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import actions from '../actions';
import '../App.css';
import {
    Card,
    CardActionArea,
    CardMedia,
    Grid,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
    card: {
      maxWidth: 250,
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 5,
      border: '1px solid #1e8678',
      boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
    },
    titleHead: {
      borderBottom: '1px solid #1e8678',
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
      color: '#1e8678',
      fontWeight: 'bold',
      fontSize: 12
    }
  });

const Trainer = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const deleteTrainer = () => {
        dispatch(actions.deleteTrainer(props.trainer.id));
    }
    const selectTrainerToggle = (selectFlag) => {
        if (selectFlag) dispatch(actions.unselectTrainer(props.trainer.id));
        if(!selectFlag) dispatch(actions.selectTrainer(props.trainer.id));
    }
    let card = null;
    const buildCard = (id) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
            <Card className={classes.card} variant='outlined'>
              <CardActionArea>
                <Link to={`/pokemon/${id}`}>
                  <CardMedia
                    className={classes.media}
                    component='img'
                    image={
                        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                    }
                    title='show image'
                  />
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        );
    }
    let pokemonList = props.trainer.pokemons;
    card =
      pokemonList &&
      pokemonList.map((id) => {
        return buildCard(id);
      });
    return(
        <div>
            <div className="trainer-wrapper">
                <p>Trainer: {props.trainer.name}</p>
                <p>
                {!props.trainer.selected && (
                    <button className="DeleteBtn" onClick={deleteTrainer}>Delete Trainer</button>
                )}
                </p>
                <p>
                {!props.trainer.selected && (
                    <button className="selectTrainerBtn" onClick={() => selectTrainerToggle(false)}>Select</button>
                )}
                {props.trainer.selected && (
                    <button className="selectTrainerBtn" onClick={() => selectTrainerToggle(true)}>Selected</button>
                )}
                </p>
            </div>
            <div>
                <Grid container spacing={5}>
                    {card}
                </Grid>
            </div>
        </div>
    )
}

export default Trainer;