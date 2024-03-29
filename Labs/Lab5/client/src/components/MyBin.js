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
                    {data.binnedImages.map(element =>{
                    return(  
                        <dl key={element.id} className="post">
                            <img src = {element.url} alt = {element.posterName} className = "image"/> 
                            <di ng-if="true">
                            <dt>Description:</dt>
                            <dd>{element.description}</dd>
                            </di>
                            <dt>Author:</dt>
                            <dd>{element.posterName}</dd>
                            <dt>Likes:</dt>
                            <dd>{element.numBinned}</dd>
                            <BinButton element={element}/>
                        </dl>
                    )}
                    )}  
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