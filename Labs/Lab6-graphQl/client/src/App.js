import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import logo from './img/pokemon-logo.png';
import Home from './components/Home';
import PokemonList from './components/PokemonList';
import Pokemon from './components/Pokemon';
import Trainers from './components/Trainers';
import SearchPage from './components/SearchPage';
import NotFound from './components/NotFound';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <header className="App-header">
            <Link to='/'>          
              <img src={logo} alt='pokemon logo' className='App-logo'/>
            </Link>
            <nav>
              <Link to='/' className='navLink'>Home</Link>
              <Link to='/pokemon/page/0' className='navLink'>Pokemons</Link>
              <Link to='/trainers' className='navLink'>Trainers</Link>
              <Link to='/pokemon/search' className='navLink'>Search Pokemon</Link>
            </nav>
          </header>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pokemon/page/:pagenum' element={<PokemonList/>}/>
            <Route path='/pokemon/:id' element={<Pokemon/>} />
            <Route path='/trainers' element={<Trainers/>} />
            <Route path='/pokemon/search' element={<SearchPage/>} />
            <Route path='/*' element={<NotFound/>} />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
