import React from 'react';
import { useMutation } from '@apollo/client';
import queries from '../queries';
import '../App.css';

const NewPost = () => {
    let url;
    let description;
    let posterName;
    const [createPost] = useMutation(queries.POST_IMAGE);
    // const [createPost] = useMutation(queries.POST_IMAGE, {
    //     update(cache, {data:{createPost}}){
    //         const {userPostedImages} = cache.readQuery({query: queries.GET_USERPOSTED_IMAGES});
    //         cache.writeQuery({
    //             query: queries.GET_USERPOSTED_IMAGES,
    //             data: {
    //                 userPostedImages: userPostedImages.concat([createPost])
    //             }
    //         });
    //     }
    // });
    let body = (
        <form className='form' id='addPost' onSubmit={(e) => {
            e.preventDefault();
            createPost({
                variables:{
                    url: url.value,
                    description: description.value,
                    posterName: posterName.value
                }
            });
            url.value ='';
            description.value='';
            posterName.value='';
        }}>
        <h2>Create a new post..!</h2>
        <div className='form-group'>
        <label>
        Enter Url:
        <br/>
        <input ref={(node)=>{
            url=node;
        }}
        required
        autoFocus={true}
        className='form-control'
        />
        </label>
        </div>
        <div className='form-group'>
            <label>
                Enter Description:
                <br/>
                <input ref={(node)=>{
                    description=node;
                }}
                required
                className='form-control'
                />
            </label>
        </div>
        <div className='form-group'>
            <label>
                Enter Poster Name:
                <br/>
                <input ref={(node)=>{
                    posterName=node;
                }}
                required
                className='form-control'
                />
            </label>
        </div>
        <div className='postButton'>
            <button className='addPost' type='submit'> Post </button>
        </div>
        </form>

    )
    return (
        <div>
            <div className='formContainer'>{body}</div>
        </div>
    )
}

export default NewPost;