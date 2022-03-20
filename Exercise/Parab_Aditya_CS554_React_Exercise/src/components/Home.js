import React from 'react';
import '../App.css';

const Home = () => {
  return (
    <div>
      <p>
        This is a simple example of using React to Query the TV Maze API. Start
        by clicking the "Shows" button above
      </p>

      <p className='hometext'>
        The application queries two of TV Maze's end-points:{' '}
        <a
          rel='noopener noreferrer'
          target='_blank'
          href='http://api.tvmaze.com/shows?page=:num'
        >
          http://api.tvmaze.com/shows?page=:num</a> where num is the page number and each page displays 250 shows
        {' '}
        and{' '}
        <a
          rel='noopener noreferrer'
          target='_blank'
          href='http://api.tvmaze.com/search/shows?q=SEARCH_TERM'
        >
          http://api.tvmaze.com/search/shows?q=SEARCH_TERM
        </a>{' '}
        for searching the shows in the API (Where SEARCH_TERM is what the user
        types into the search input).
      </p>
      <p>Note! '/shows' route is changed to '/shows/page/:pagenumber'</p>
    </div>
  );
};

export default Home;
