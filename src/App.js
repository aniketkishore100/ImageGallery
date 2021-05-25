import React, { useState, useEffect } from 'react';
import './App.css';

import { Banner } from './Components/Banner'
import { Header } from './Components/Header'
import { Loading } from './Components/Loader'
import { Gallery } from './Components/Gallery'
import InfiniteScroll from 'react-infinite-scroll-component'

import axios from 'axios'

function App() {
  const [search, setValue] = useState("searchText"); //search value 
  const [pageCount, setCount] = useState(1); 
  const [images, setImage] = useState([]); //image array

  useEffect(() => {//Updating Component on mount
    fetchContent(); 
  },[]) 

  useEffect(()=>{  //Updating Component whenever Search state changes
    fetchContent()
  },[search])


  const handleChange = (newValue) =>{
    setImage([]) //clears image array
    setValue(newValue); //stores new value to seach
    setCount(1); //resets pageCount
  }

  const fetchContent = ()=>{
    setCount(pageCount+1); //increments pageCount on scroll
    const accessKey = process.env.REACT_APP_ACCESSKEY;
    var apiRoot = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${accessKey}&text=:${search}&media=photos&per_page=15&page=${pageCount}&format=json&nojsoncallback=1`
    axios.get(apiRoot)
      .then(res => setImage([...images, ...res.data.photos.photo])); //pushes new set of 15 images into image array
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
