import React  from 'react';
import queries from '../queries';
import { useMutation } from '@apollo/client';
import '../App.css';

const DeleteButton = (props) => {
    // const [userPost] = useState(props.removeImage);
    // const { data } = useQuery(queries.GET_USERPOSTED_IMAGES);
    const [deletePost] = useMutation(queries.DELETE_IMAGE);
    // const [deletePost] = useMutation(queries.DELETE_IMAGE, {
    //         update(cache, { data: { deletePost } }){
    //             const { postedImages } = cache.readQuery({
    //                 query: queries.GET_USERPOSTED_IMAGES,
    //                 variables: {
    //                     id: props.element.id
    //                 }
    //             });
    //             cache.writeQuery({
    //                 query: queries.GET_USERPOSTED_IMAGES,
    //                 data: {
    //                     userPostedImages: postedImages.filter((img) => img.id !== data.userPostedImages.id)
    //                 }
    //             })
    //         }
    //     });

    return(
        <div>
        <button className='deleteBtn' onClick = {() =>{
            deletePost({
                variables: {
                    id: props.element.id
                }
            })
            alert("Deleted Successfully!")
        }}
        >Delete!</button>
        </div>
    )
}

export default DeleteButton;