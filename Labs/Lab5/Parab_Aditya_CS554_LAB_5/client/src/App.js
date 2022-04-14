import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import logo from './img/Bin-Icon.webp';
import './App.css';
import Home from './components/Home';
import MyBin from './components/MyBin';
import MyPosts from './components/MyPosts';
import NotFound from './components/NotFound';
import NewPost from './components/NewPost';
import PopularImages from './components/PopularPosts';
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
            <img src={logo} alt='bin logo' className='App-logo'></img>
          </Link>
          <h1>Welcome to Binterest!</h1>
          <nav>
            <Link to='/' className='navLink'>Home</Link>
            <Link to='/my-bin' className='navLink'>My Bin</Link>
            <Link to='/my-posts' className='navLink'>My Posts</Link>
            <Link to='/popularity' className='navLink'>Most Popular</Link>
          </nav>
          </header>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/my-bin' element={<MyBin />} />
            <Route path='/my-posts' element={<MyPosts />} />
            <Route path='/new-post' element={<NewPost/>} />
            <Route path='/popularity' element={<PopularImages/>} />
            <Route path='/*' element={<NotFound/>} />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
