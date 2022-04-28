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
    console.log(data.unsplashImages);
    if(data){
        return (
            <div>
                <h2>Unsplash Images</h2>
                <ul>
                    {data.unsplashImages.map(element =>{
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