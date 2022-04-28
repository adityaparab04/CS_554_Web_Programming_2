import React, { useEffect, useState } from "react";
import actions from '../actions';
import { useDispatch, useSelector } from 'react-redux';

const CatchReleaseBtn = (props) => {
    const allTrainers = useSelector((state) => state.trainers);
    const dispatch = useDispatch();
    const [ caught, setCaught ] = useState(0);
    let selectedTrainer = null;
    allTrainers.forEach((trainer) => {
        if(trainer.selected === true){
            selectedTrainer = trainer;
        }
    });
    
    useEffect(() => {
            if(selectedTrainer && selectedTrainer.pokemons.includes(props.pokemon.id.toString())){
                setCaught(1);
            }
    }, [])
    
    
    const catchPokemon = () => {
        setCaught(1);
        dispatch(actions.catchPokemon(selectedTrainer.id, props.pokemon.id, props.pokemon.name));
    }
    const releasePokemon = () => {
        setCaught(0);
        dispatch(actions.releasePokemon(selectedTrainer.id, props.pokemon.id, props.pokemon.name));
    }
    if(selectedTrainer !== null){
        if(selectedTrainer.pokemons.length < 6){
            return(
                <div>
                    { selectedTrainer && caught === 0 ?
                        (<button className="catchBtn" onClick={() => catchPokemon(parseInt(props.pokemon.id))}>Catch</button>) : 
                        (<button className="releaseBtn" onClick={() => releasePokemon(parseInt(props.pokemon.id))}>Release</button>)
                    }
                </div>
            )
        }else{
            return(
                <div>
                    {
                        selectedTrainer && caught === 1 ? (<button className="releaseBtn" onClick={() => releasePokemon(parseInt(props.pokemon.id))}>Release</button>) :
                        (<button className="partyFullBtn" >Party Full</button>)
                    }
                </div>
            )
        }
    }
}

export default CatchReleaseBtn;