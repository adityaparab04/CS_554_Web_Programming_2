import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import '../App.css';
import queries from '../queries';
import BinButton from './BinButton';

const Home = () => {
    const [pageNum, setPageNum] = useState(1);
    const {loading, error, data} = useQuery(queries.GET_UNSPLASH_IMAGES, {
        variables: {pageNum: pageNum}
    });
    const handleMore = () => setPageNum(pageNum + 1);
    if(data){
        return (
            <div>
                <h2>Unsplash Images</h2>
                <ul>
                    {data.unsplashImages.map(element =>{
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
                <button className = "getMore" onClick = {handleMore}>Get More</button>
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

export default Home;