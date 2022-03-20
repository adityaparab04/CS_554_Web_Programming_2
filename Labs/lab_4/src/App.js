import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import logo from './img/logo.png';
import './App.css';
import Home from './component/Home';
import NotFound from './component/NotFound'
import CharacterList from './component/CharacterList';
import Character from './component/Character';
import ComicList from './component/ComicList';
import Comic from './component/Comic';
import SeriesList from './component/SeriesList';
import Series from './component/Series';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to='/'>
            <img src={logo} alt='Marvel Logo' className="App-logo"/>
          </Link>
          <h2 className='App-title'>
            Welcome to the React.js Marvel API Lab
          </h2>
          <nav>
          <Link className='navLink' to='/'>Home</Link>
          <Link className='navLink' to='/characters/page/0'>Characters</Link>
          <Link className='navLink' to='/comics/page/0'>Comics</Link>
          <Link className='navLink' to='/series/page/0'>Series</Link>
        </nav>
        </header>
        <div className='App-body'>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/characters/page/:page' element={<CharacterList/>}/>
            <Route path='/characters/:id' element={<Character />}/>
            <Route path='/comics/page/:page' element={<ComicList/>}/>
            <Route path='/comics/:id' element={<Comic />}/>
            <Route path='/series/page/:page' element={<SeriesList/>}/>
            <Route path='/series/:id' element={<Series/>}/>
            <Route path='/*' element={<NotFound/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
