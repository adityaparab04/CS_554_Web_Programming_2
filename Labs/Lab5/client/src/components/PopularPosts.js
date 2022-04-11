import React from 'react';
import '../App.css';
import queries from '../queries';
import { useQuery } from '@apollo/client';

const PopularImages = () => {
    const {loading, error, data} = useQuery(queries.GET_TOP_TEN_BINNED_IMAGES);
    // console.log(data);
    if(data){
        return (
            <div>
            <h2>My TOP 10 Binned Images</h2>
            <ul>
                {
                    data.getTopTenBinnedPosts.map(element =>{
                        return(  
                            <li className = "post" key = {element.id}>
                                <img src = {element.url} alt = {element.posterName} className = "image"/>
                                <p>Description: {element.description}</p>
                                <p>Author: {element.posterName}</p>
                                <p>Likes: {element.numBinned}</p>
                            </li>
                        )
                    }
                )}  
            </ul>
        </div>
    
        )
    }else if(loading){
        return(
            <div><h2>Loading..</h2></div>
        )
    }else if(error){
        return(
            <div><h2>{error.message}</h2></div>
        )
    }
}

export default PopularImages;