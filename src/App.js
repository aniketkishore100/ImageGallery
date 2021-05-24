import React, { useState, UseEffect, useEffect } from 'react';
import './App.css';
import { Banner } from './Components/Banner'
import { Header } from './Components/Header'
import { Loading } from './Components/Loader'
import { Gallery } from './Components/Gallery'
import { Search } from './Components/Search'
import InfiniteScroll from 'react-infinite-scroll-component'

import axios from 'axios'

function App() {
  const [search, setValue] = useState("");
  const [pageCount, setCount] = useState(1);
  const [images, setImage] = useState([]);
  // const [apiUrl, setUrl] = useState(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e52a287d86469bf01ea901dfd92cf8a5&text=:${search}&media=photos&per_page=15&page=1&format=json&nojsoncallback=1`)
  useEffect(() => {
    fetchContent();
  },[])

  const handleChange = (newValue) =>{
    setImage([])
    setValue(newValue);
    setCount(1);
    fetchContent();
    console.log(search)
  }

  const fetchContent = ()=>{
    console.log(search)
    setCount(pageCount+1);
    var apiRoot = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e52a287d86469bf01ea901dfd92cf8a5&text=:${search}&media=photos&per_page=15&page=${pageCount}&format=json&nojsoncallback=1`
    // console.log(pageCount);
    axios.get(apiRoot)
      .then(res => setImage([...images, ...res.data.photos.photo]));

    
  }
  return (
    <div className="App">
      <div>
        <Header value={search} handleChange={handleChange}/>
        <Banner value={search} handleChange={handleChange}/>
        <InfiniteScroll dataLength={images.length} next={fetchContent} hasMore={true} loader={ <Loading />}>
        <Gallery images = {images}/>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
