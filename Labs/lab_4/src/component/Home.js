import React from "react";
import '../App.css'

const Home = () => {
    return(
        <div className="homePage">
            <p>This is the Home page for Marvel APi react Lab. You can click on Characters button for getting the marvel character list. Comics button for marvel comic list. Series button for marvel series list.
            </p>
            <p>The application queries 3 of TV Maze's end-points:{' '}
            <a
            rel='noopener noreferrer'
            target='_blank'
            href='https://gateway.marvel.com:443/v1/public/characters'>
            https://gateway.marvel.com:443/v1/public/characters</a> where each page shows 20 characters at a time.
          {' '}            
            </p>
            <p>The application queries six of TV Maze's end-points:{' '}
            <a
            rel='noopener noreferrer'
            target='_blank'
            href='https://gateway.marvel.com:443/v1/public/comics'>
            https://gateway.marvel.com:443/v1/public/comics</a> where each page shows 20 comics at a time.
          {' '}            
            </p>
            <p>The application queries six of TV Maze's end-points:{' '}
            <a
            rel='noopener noreferrer'
            target='_blank'
            href='https://gateway.marvel.com:443/v1/public/series'>
            https://gateway.marvel.com:443/v1/public/series</a> where each page shows 20 series at a time.
          {' '}            
            </p>
        </div>
    )
}

export default Home;