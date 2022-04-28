import React from "react";
import { useSelector } from 'react-redux';
import AddTrainer from "./AddTrainer";
import Trainer from "./Trainer";
import '../App.css';

const Trainers = () => {
    const allTrainers = useSelector((state) => state.trainers);
    return(
        <div>
            <h1>Trainers</h1>
            <AddTrainer/>
            {allTrainers.map((trainer) => {
                // console.log(trainer);
                return <Trainer key={trainer.id} trainer={trainer} />;
            })}
        </div>
    )
}

export default Trainers;