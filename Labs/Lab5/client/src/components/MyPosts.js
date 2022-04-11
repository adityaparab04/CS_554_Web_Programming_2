import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client' 
import queries from '../queries';
import BinButton from './BinButton';
import DeleteButton from './DeleteButton';

import '../App.css';

const MyPosts = () => {
    const {loading, error, data} = useQuery(queries.GET_USERPOSTED_IMAGES);

    if(data){
        return (
            <div>
                <h2>User Posted Images</h2>
                <div className='newPostContainer'>
                    <Link to='/new-post' className='createPostLink'>Create a new post</Link>
                </div>
                <ul>
                    {data.userPostedImages.map(element =>{
                    return(  
                        <li className = "post" key = {element.id}>
                            <img src = {element.url} alt = "image" className = "image"/>
                            <p>Description: {element.description}</p>
                            <p>Author: {element.posterName}</p>
                            <p>Likes: {element.numBinned}</p>
                            <BinButton element={element}/>
                            <br/>
                            <DeleteButton element={element}/>
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

export default MyPosts;