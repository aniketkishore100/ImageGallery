import React, { useState, UseEffect, useEffect } from 'react';
import './App.css';
import { Header } from './Components/Header'
import { Loading } from './Components/Loader'
import { Gallery } from './Components/Gallery'

import axios from 'axios'

function App() {
  const [images, setImage] = useState([]);
  useEffect(() => {
    const apiRoot = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e52a287d86469bf01ea901dfd92cf8a5&text=:searchText&media=photos&per_page=15&page=1&format=json&nojsoncallback=1"

    axios.get(apiRoot)
      .then(res => setImage([...images, ...res.data.photos.photo]));
  },[])
  return (


    <div className="App">
      <div>
        <Header />
        <Loading />
        <Gallery images = {images}/>
      </div>
    </div>
  );
}

export default App;
