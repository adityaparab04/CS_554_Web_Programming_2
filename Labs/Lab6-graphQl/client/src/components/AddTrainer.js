import React, { useState } from "react";
import { useDispatch } from "react-redux";
import actions from '../actions';

import '../App.css';

const AddTrainer = () => {
    const dispatch = useDispatch();
    const [ formData, setFormData ] = useState({name: ''});
    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
    
    const addTrainer = () => {
        if(formData.name === '') alert("enter a name");
        else{
            dispatch(actions.addTrainer(formData.name));
            document.getElementById('name').value = '';
            setFormData({name: '' });
        }
    }
    // console.log(formData);
    return(
        <div className='add'>
            <div className='input-selection'>
            <label>
            Trainer:
                <input
                    required
                    onChange={(e) => handleChange(e)}
                    id='name'
                    name='name'
                    placeholder='Enter Trainer Name...'
                    autoFocus
                />
            </label>
            </div>
            <br/>
            <button className='addTrainerBtn' onClick={addTrainer}>Add Trainer</button>
        </div>
    )
}

export default AddTrainer;