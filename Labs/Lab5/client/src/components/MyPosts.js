import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client' 
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

                    {data.userPostedImages.map(element =>{
                    return( 
                        <dl key={element.id} className="post">
                            <img src = {element.url} alt = {element.posterName} className = "image"/> 
                            <di ng-if="true">
                            <dt>Description:</dt>
                            <dd>{element.description}</dd>
                            </di>
                            <dt>Author:</dt>
                            <dd>{element.posterName}</dd>
                            <BinButton element={element}/>
                            <DeleteButton element ={element}/>
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

export default MyPosts;