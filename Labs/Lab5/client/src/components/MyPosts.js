import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client' 
import queries from '../queries';
import BinButton from './BinButton';

import '../App.css';

const MyPosts = () => {
    const {loading, error, data} = useQuery(queries.GET_USERPOSTED_IMAGES);
    const [deletePost] = useMutation(queries.DELETE_IMAGE);
    // const [deletePost] = useMutation(queries.DELETE_IMAGE, {
    //     update(cache){
    //         const { userPostedImages } = cache.readQuery({
    //             query: queries.GET_USERPOSTED_IMAGES
    //         });
    //         cache.writeQuery({
    //             query: queries.GET_USERPOSTED_IMAGES,
    //             data: {
    //                 userPostedImages: userPostedImages.filter((img) => img.id === data.userPostedImages.id)
    //             }
    //         })
    //     }
    // });


    if(data){
        return (
            <div>
                <div className='newPostContainer'>
                    <Link to='/new-post' className='createPostLink'>Create a new post</Link>
                </div>
                <h2>User Posted Images</h2>
                <ul>
                    {data.userPostedImages.map(element =>{
                    return(  
                        <div className = "post" key = {element.id}>
                            <li>
                                <img src = {element.url} alt = "image" className = "image"/>
                                <p>Description: {element.description}</p>
                                <p>Author: {element.posterName}</p>
                            </li>
                            <BinButton element={element}/>
                            <button className='deleteBtn' onClick = {() =>{
                                deletePost({
                                    variables: {
                                        id: element.id
                                    }
                                })
                            }}
                            >Delete!</button>
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
    }
}

export default MyPosts;