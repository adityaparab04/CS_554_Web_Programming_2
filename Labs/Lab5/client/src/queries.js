import {gql} from '@apollo/client';

const GET_UNSPLASH_IMAGES = gql`
query getUnsplash($pageNum: Int!){
    unsplashImages(pageNum: $pageNum){
        id
        url
        posterName
        description
        userPosted
        binned
   }
}
`;

const GET_BINNED_IMAGES = gql`
    query{
        binnedImages{
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

const GET_USERPOSTED_IMAGES = gql`
    query{
        userPostedImages{
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

const POST_IMAGE = gql`
    mutation createPost($url: String!, $description: String, $posterName: String){
        uploadImage(url: $url, description: $description, posterName: $posterName){
            url
            description
            posterName
        }
    }
`;

const EDIT_IMAGE = gql`
    mutation editImage($id: ID!, $url: String, $posterName: String, $description: String, $userPosted: Boolean, $binned: Boolean){
        updateImage(id: $id, url: $url, posterName: $posterName, description: $description, userPosted: $userPosted, binned: $binned){
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`

const DELETE_IMAGE = gql`
    mutation removeImage($id: ID!){
        deleteImage(id: $id){
            id
        }
    }
`

let exported =  {
    GET_UNSPLASH_IMAGES,
    GET_BINNED_IMAGES,
    GET_USERPOSTED_IMAGES,
    POST_IMAGE,
    EDIT_IMAGE,
    DELETE_IMAGE
}
export default exported;