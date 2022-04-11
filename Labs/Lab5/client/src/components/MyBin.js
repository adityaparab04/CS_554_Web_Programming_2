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
                        <li className = "post" key = {element.id}>
                            <img src = {element.url} alt = "image" className = "image"/>
                            <p>Description: {element.description}</p>
                            <p>Author: {element.posterName}</p>
                            <p>Likes: {element.numBinned}</p>
                            <BinButton element={element}/>
                        </li>
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
    }
}

export default MyBin;