import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import queries from '../queries';

const BinButton = (props) => {
    const [editImage] = useMutation(queries.EDIT_IMAGE);
    const handleButton = (img) => {
        if(img.binned === false){
            {editImage({variables:{
                "id": img.id,
                "url": img.url,
                "posterName": img.posterName,
                "description": img.description,
                "userPosted": img.userPosted,
                "binned": true
            }})}
        }else if((img.binned === true)){
            {editImage({variables:{
              "id": img.id,
              "url": img.url,
              "posterName": img.posterName,
              "description": img.description,
              "userPosted": img.userPosted,
              "binned": false
        }})}
    }
}
if(props.element.binned===false){
    return (
        <div>    
            <button className = "binnedButton" onClick={() => {handleButton(props.element)}}>Bin!</button>  
        </div>
    )
          
}else{
    return(
        <div>    
            <button className = "binnedButton" onClick={() => {handleButton(props.element)}}>Unbin!</button>  
        </div>
    )
}
}
export default BinButton;