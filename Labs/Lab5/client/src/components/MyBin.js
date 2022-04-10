import React from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import BinButton from './BinButton';
import '../App.css';

const MyBin = () => {
    const {loading, error, data} = useQuery(queries.GET_BINNED_IMAGES);
    if(typeof(data)=='object'){
        return (
            <div>
                <h2>My Binned Images</h2>
                <ul>
                    {data.binnedImages.map(element =>{
                    return(  
                    <div className = "post" key = {element.id}>
                        <li>
                            <img src = {element.url} alt = "image" className = "image"/>
                            <p>Description: {element.description}</p>
                            <p>Author: {element.posterName}</p>
                        </li>
                        <BinButton element={element}/>
                    </div>
                    )}
                    )}  
                </ul>
            </div>
        )
    }else if(loading){
        return(
            <div><h2>Loading...</h2></div>
        )
    }else if(error){
        return(
            <div><h2>{error.message}</h2></div>
        )
    }else{
        return(
            <div><h2>No binned images</h2></div>
        )
    }
}

export default MyBin;