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
        <div className='form-group'>
        <label>
        Enter Url:
        <input ref={(node)=>{
            url=node;
        }}
        required
        autoFocus={true}
        />
        </label>
        </div>
        <div className='form-group'>
        <label>
        Enter Description:
        <input ref={(node)=>{
            description=node;
        }}
        required
        autoFocus={true}
        />
        </label>
        </div>
        <div className='form-group'>
        <label>
        Enter Poster Name:
        <input ref={(node)=>{
            posterName=node;
        }}
        required
        autoFocus={true}
        />
        </label>
        </div>
        <button className='addPost' type='submit'> Post? </button>
        </form>

    )
    return (
        <div>
            <h2>Create a new post..!</h2>
            {body}
        </div>
    )
}

export default NewPost;